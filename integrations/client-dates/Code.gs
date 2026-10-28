// Private background project. Do not deploy this project as a public web app.
const DATES_ACCOUNT = 'tellamindwork@gmail.com';
const DATES_SHEET = 'Clients';
const DATES_HEADER_ROW = 8;
const DATES_INTERVAL_MINUTES = 5;
const DATES_FOLLOW_UP_DAYS = 3;
const DATES_SCAN_LIMIT = 600;

function installDateAutomation() {
  const result = syncClientDates();
  const exists = ScriptApp.getProjectTriggers().some(trigger => trigger.getHandlerFunction() === 'syncClientDates');
  if (!exists) ScriptApp.newTrigger('syncClientDates').timeBased().everyMinutes(DATES_INTERVAL_MINUTES).create();
  console.log(JSON.stringify({installed: true, intervalMinutes: DATES_INTERVAL_MINUTES, ...result}));
  return result;
}

function syncClientDates() {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(1000)) return {busy: true};
  try {
    const identity = Gmail.Users.getProfile('me');
    if (String(identity.emailAddress).toLowerCase() !== DATES_ACCOUNT) throw new Error('Use the TellaMind business account.');
    const properties = PropertiesService.getScriptProperties();
    const trackerId = properties.getProperty('TRACKER_ID');
    if (!trackerId) throw new Error('Set the private TRACKER_ID script property.');
    const sheet = SpreadsheetApp.openById(trackerId).getSheetByName(DATES_SHEET);
    if (!sheet) throw new Error('Client tracker not found.');
    const headers = sheet.getRange(DATES_HEADER_ROW, 1, 1, 17).getValues()[0];
    for (const [index, title] of [[0,'Lead ID'],[1,'Received at'],[2,'Client name'],[3,'Email'],[11,'Last contact'],[12,'Next follow-up']]) {
      if (headers[index] !== title) throw new Error('Unexpected tracker columns.');
    }
    const now = Date.now();
    const height = Math.max(0, sheet.getLastRow() - DATES_HEADER_ROW);
    const rows = height ? sheet.getRange(DATES_HEADER_ROW + 1, 1, height, 17).getValues() : [];
    const formulas = height ? sheet.getRange(DATES_HEADER_ROW + 1, 13, height, 5).getFormulas() : [];
    const active = rows.filter(row => row[0] && row[2] && validDateEmail_(row[3]) && !closedDateStage_(row[9]));
    const checkpoint = Number(properties.getProperty('DATES_LAST_SYNC_MS'));
    const baseline = checkpoint > 0 ? checkpoint : Math.min(now, ...active.map(row => dateMillis_(row[1]) || now));
    const emails = new Set(active.map(row => String(row[3]).trim().toLowerCase()).filter(email => email !== DATES_ACCOUNT));
    // Metadata scope cannot use Gmail search queries. Read recent headers in newest-first order.
    const activity = emails.size ? collectDateActivity_(emails, baseline - 120000, now) : new Map();
    let contactsUpdated = 0;
    let followUpsUpdated = 0;
    for (let index = 0; index < rows.length; index++) {
      const row = rows[index];
      if (!row[0] || !row[2] || !validDateEmail_(row[3])) continue;
      const number = DATES_HEADER_ROW + 1 + index;
      const email = String(row[3]).trim().toLowerCase();
      // Recheck identity before writing so sorting/deleting a lead cannot move a date to another client.
      const current = sheet.getRange(number, 1, 1, 17).getValues()[0];
      if (current[0] !== row[0] || String(current[3]).trim().toLowerCase() !== email) continue;
      const last = activity.get(email) || 0;
      if (!closedDateStage_(current[9]) && last >= (dateMillis_(current[1]) || now) && last > dateMillis_(current[11])) {
        sheet.getRange(number, 12).setValue(new Date(last)).setNumberFormat('yyyy-mm-dd hh:mm');
        contactsUpdated++;
      }
      const formula = followUpDateFormula_(number);
      if (formulas[index][0] !== formula) {
        sheet.getRange(number, 13).setFormula(formula).setNumberFormat('yyyy-mm-dd');
        followUpsUpdated++;
      }
      const statusFormula = followUpDateStatusFormula_(number);
      if (formulas[index][4] !== statusFormula) sheet.getRange(number, 17).setFormula(statusFormula);
    }
    SpreadsheetApp.flush();
    // Advance only after the complete scan and writes succeed. Replays are idempotent.
    properties.setProperty('DATES_LAST_SYNC_MS', String(now));
    const result = {contactsUpdated, followUpsUpdated};
    console.log(JSON.stringify(result));
    return result;
  } finally { lock.releaseLock(); }
}

function collectDateActivity_(emails, since, now) {
  const latest = new Map();
  let pageToken;
  let checked = 0;
  const started = Date.now();
  do {
    const options = {maxResults: 100, includeSpamTrash: false};
    if (pageToken) options.pageToken = pageToken;
    const page = Gmail.Users.Messages.list('me', options);
    for (const item of page.messages || []) {
      if (++checked > DATES_SCAN_LIMIT || Date.now() - started > 210000) {
        throw new Error('Date sync scan limit reached; checkpoint was not advanced. Review the mailbox volume.');
      }
      let message;
      try {
        message = Gmail.Users.Messages.get('me', item.id, {
          format: 'metadata', metadataHeaders: ['From','To','Cc','Bcc'],
          fields: 'id,internalDate,labelIds,payload(headers)',
        });
      } catch (error) {
        // A message deleted between list/get is harmless. Other failures must stop the checkpoint.
        if (/\b404\b|Requested entity was not found|Message not found/i.test(String(error))) continue;
        throw error;
      }
      const time = Number(message.internalDate);
      if (!Number.isFinite(time) || time <= 0) throw new Error('Missing Gmail message timestamp.');
      if (time < since) return latest;
      if (time > now) continue;
      const labels = message.labelIds || [];
      if (labels.some(label => ['DRAFT','SPAM','TRASH'].includes(label))) continue;
      const headers = {};
      for (const header of message.payload && message.payload.headers || []) {
        const name = String(header.name).toLowerCase();
        headers[name] = (headers[name] || '') + ' ' + header.value;
      }
      const participants = new Set(dateAddresses_(headers.from || ''));
      if (labels.includes('SENT')) {
        for (const address of dateAddresses_([headers.to,headers.cc,headers.bcc].filter(Boolean).join(','))) participants.add(address);
      }
      for (const email of participants) {
        // Reply-To is deliberately ignored: owner notifications are not client conversations.
        if (email !== DATES_ACCOUNT && emails.has(email) && time > (latest.get(email) || 0)) latest.set(email, time);
      }
    }
    pageToken = page.nextPageToken;
  } while (pageToken);
  return latest;
}

function followUpDateFormula_(row) {
  return '=IF(C' + row + '="","",IF(OR(J' + row + '="Completed",J' + row + '="Lost",J' + row + '="On hold"),"",IF(ISNUMBER(L' + row + '),INT(L' + row + ')+' + DATES_FOLLOW_UP_DAYS + ',IF(ISNUMBER(B' + row + '),INT(B' + row + ')+' + DATES_FOLLOW_UP_DAYS + ',""))))';
}
function followUpDateStatusFormula_(row) {
  return '=IF(C' + row + '="","",IF(OR(J' + row + '="Completed",J' + row + '="Lost"),"Closed",IF(J' + row + '="On hold","On hold",IF(M' + row + '="","Set follow-up",IF(M' + row + '<TODAY(),"Overdue",IF(M' + row + '=TODAY(),"Due today","Scheduled"))))))';
}
function dateAddresses_(value) { return (String(value).toLowerCase().match(/[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9.-]+\.[a-z]{2,}/g) || []); }
function validDateEmail_(value) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim()); }
function closedDateStage_(stage) { return ['Completed','Lost','On hold'].includes(String(stage)); }
function dateMillis_(value) { return value instanceof Date && Number.isFinite(value.getTime()) ? value.getTime() : 0; }
