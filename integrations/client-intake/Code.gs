// Deploy as the Tell a Mind account. The tracker stays private.
const TRACKER_ID = PropertiesService.getScriptProperties().getProperty('TRACKER_ID');
const INQUIRY_EMAIL = 'tellamindwork@gmail.com';
const SHEET_NAME = 'Clients';
const HEADER_ROW = 8;

function doGet() { return json_({ok: true, service: 'TellaMind enquiries'}); }

function doPost(event) {
  try {
    const p = event && event.parameter || {};
    if (p._gotcha) return json_({ok: true});
    const record = validateInquiry_(p);
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    let inserted = false;
    try {
      const sheet = SpreadsheetApp.openById(TRACKER_ID).getSheetByName(SHEET_NAME);
      if (!sheet || sheet.getRange(HEADER_ROW, 1).getValue() !== 'Lead ID') throw new Error('Tracker unavailable');
      const ids = sheet.getRange(HEADER_ROW + 1, 1, sheet.getMaxRows() - HEADER_ROW, 1).getValues().map(row => String(row[0]));
      const leadId = 'TM-' + record.requestId;
      if (ids.indexOf(leadId) >= 0) return json_({ok: true, id: leadId});
      let offset = ids.findIndex(value => value === '');
      if (offset === -1) { sheet.insertRowsAfter(sheet.getMaxRows(), 100); offset = ids.length; }
      const row = HEADER_ROW + 1 + offset;
      // Extend the original formatting and dropdowns when the starter rows fill.
      if (row > 208) sheet.getRange(HEADER_ROW + 1, 1, 1, 17).copyTo(sheet.getRange(row, 1, 1, 17), {formatOnly: true});
      sheet.getRange(row, 1, 1, 16).setValues([[
        leadId, new Date(), text_(record.name), text_(record.email), text_(record.company),
        text_(record.service), text_(record.budget), text_(record.timeframe), text_(record.details),
        'New enquiry', '', '', '', '', '', text_(record.source),
      ]]);
      sheet.getRange(row, 2).setNumberFormat('yyyy-mm-dd hh:mm');
      sheet.getRange(row, 17).setFormula('=IF(C' + row + '="","",IF(OR(J' + row + '="Completed",J' + row + '="Lost"),"Closed",IF(M' + row + '="","Set follow-up",IF(M' + row + '<TODAY(),"Overdue",IF(M' + row + '=TODAY(),"Due today","Scheduled")))))');
      const endRow = Math.max(208, row, sheet.getLastRow());
      const names = 'C9:C' + endRow;
      const stages = 'J9:J' + endRow;
      const actions = 'Q9:Q' + endRow;
      sheet.getRange('A5').setFormula('=COUNTIFS(' + stages + ',"New enquiry",' + names + ',"<>")');
      sheet.getRange('D5').setFormula('=COUNTIFS(' + names + ',"<>",' + stages + ',"<>Completed",' + stages + ',"<>Lost")');
      sheet.getRange('G5').setFormula('=COUNTIFS(' + actions + ',"Overdue")+COUNTIFS(' + actions + ',"Due today")');
      sheet.getRange('J5').setFormula('=COUNTIFS(' + stages + ',"Active",' + names + ',"<>")');
      sheet.getRange('M5').setFormula('=COUNTIFS(' + stages + ',"Completed",' + names + ',"<>")');
      SpreadsheetApp.flush();
      inserted = true;
    } finally { lock.releaseLock(); }
    // Notification failures must not make a saved enquiry appear unsuccessful.
    if (inserted) {
      try {
        MailApp.sendEmail({
          to: INQUIRY_EMAIL,
          replyTo: record.email,
          subject: 'New TellaMind enquiry: ' + record.service.replace(/[\r\n]/g, ' '),
          body: 'Name: ' + record.name + '\nEmail: ' + record.email + '\nCompany: ' + record.company + '\nService: ' + record.service + '\nBudget: ' + record.budget + '\nTimeframe: ' + record.timeframe + '\n\n' + record.details + '\n\nClient tracker: https://docs.google.com/spreadsheets/d/' + TRACKER_ID + '/edit',
        });
      } catch (_) { console.warn('Owner notification failed; enquiry remains saved in the tracker.'); }
    }
    return json_({ok: true, id: 'TM-' + record.requestId});
  } catch (_) { return json_({ok: false, error: 'Unable to save this enquiry. Please email TellaMind.'}); }
}

function validateInquiry_(p) {
  const name = String(p.name || '').trim();
  const email = String(p.email || '').trim();
  const service = String(p.service || '').trim();
  const requestId = String(p.requestId || '').trim();
  if (!name || name.length > 200 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || !service || service.length > 150) throw new Error('Invalid contact fields');
  if (!/^[a-z0-9-]{16,80}$/i.test(requestId) || !['on','Yes','true'].includes(String(p.privacyConsent))) throw new Error('Missing request identity or consent');
  const entries = Object.entries(p);
  if (entries.length > 50 || entries.some(([k,v]) => k.length > 100 || String(v).length > 10000)) throw new Error('Submission too large');
  const omitted = new Set(['name','email','company','service','budget','timeframe','subject','privacyConsent','requestId','_gotcha','source']);
  const details = entries.filter(([key]) => !omitted.has(key)).map(([key,value]) => key.replace(/([a-z])([A-Z])/g, '$1 $2') + ': ' + String(value)).join('\n');
  if (details.length > 25000) throw new Error('Details too large');
  return {name,email,service,requestId,company:String(p.company || ''),budget:String(p.budget || ''),timeframe:String(p.timeframe || ''),source:String(p.source || 'Website enquiry'),details};
}
function text_(value) { return /^[\s]*[=+\-@]/.test(String(value)) ? "'" + value : value; }
function json_(value) { return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON); }
