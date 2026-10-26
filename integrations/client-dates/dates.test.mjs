import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync(new URL('./Code.gs', import.meta.url), 'utf8');
const manifest = JSON.parse(fs.readFileSync(new URL('./appsscript.json', import.meta.url), 'utf8'));
const now = Date.now() - 30000;
const hour = 3600000;
const header = ['Lead ID','Received at','Client name','Email','Company','Service','Budget','Timeframe','Project brief','Stage','Owner','Last contact','Next follow-up','Project due','Project folder','Notes','Follow-up status'];
const lead = (email='client@example.com', stage='New enquiry') => ['TM-test',new Date(now-2*24*hour),'Example client',email,'','','','','',stage,'','','','','','',''];
const message = (id,time,from,to,labels=[],extra=[]) => ({id,internalDate:String(time),labelIds:labels,payload:{headers:[{name:'From',value:from},{name:'To',value:to},...extra]}});

function harness({rows=[lead()], pages=[{messages:[]}], messages={}, account='tellamindwork@gmail.com', failGet=false, race=false}={}) {
  const state={rows, formulas:rows.map(()=>['','','','','']), reads:[], lists:[], writes:[], triggerCreates:[], triggers:[], properties:{TRACKER_ID:'private-test-tracker'}, unlocked:0};
  const sheet={
    getLastRow:()=>8+rows.length,
    getRange:(row,col,height=1,width=1)=>({
      getValues:()=>{
        if(row===8) return [header];
        if(race && height===1 && width===17 && state.reads.length) rows[row-9][0]='TM-replaced';
        return rows.slice(row-9,row-9+height).map(value=>value.slice(col-1,col-1+width));
      },
      getFormulas:()=>state.formulas.slice(row-9,row-9+height),
      setValue:value=>{rows[row-9][col-1]=value;state.writes.push({row,col,value});return {setNumberFormat:()=>{}}},
      setFormula:formula=>{state.formulas[row-9][col-13]=formula;state.writes.push({row,col,formula});return {setNumberFormat:()=>{}}},
    }),
  };
  const context=vm.createContext({Date,Map,Set,Number,String,Math,JSON,Error,console:{log:()=>{}},
    LockService:{getScriptLock:()=>({tryLock:()=>true,releaseLock:()=>state.unlocked++})},
    PropertiesService:{getScriptProperties:()=>({getProperty:key=>state.properties[key]??null,setProperty:(key,value)=>{state.properties[key]=value}})},
    SpreadsheetApp:{openById:()=>({getSheetByName:()=>sheet}),flush:()=>{}},
    Gmail:{Users:{getProfile:()=>({emailAddress:account}),Messages:{
      list:(_user,options)=>{state.lists.push(options);return pages[Number(options.pageToken||0)]},
      get:(_user,id,options)=>{state.reads.push({id,options});if(failGet)throw new Error('Gmail temporarily unavailable');return messages[id]},
    }}},
    ScriptApp:{getProjectTriggers:()=>state.triggers,newTrigger:name=>({timeBased:()=>({everyMinutes:minutes=>({create:()=>{state.triggerCreates.push({name,minutes});state.triggers.push({getHandlerFunction:()=>name})}})})})},
  });
  vm.runInContext(source,context);
  return {state,context};
}

test('uses actual incoming/outgoing timestamps, exact recipients and newest contact across pages',()=>{
  const rows=[lead()];
  const messages={
    outbound:message('outbound',now-hour,'Tellamind <tellamindwork@gmail.com>','Client <CLIENT@example.com>',['SENT']),
    inbound:message('inbound',now-2*hour,'Client <client@example.com>','tellamindwork@gmail.com'),
    unrelated:message('unrelated',now-3*hour,'other@example.com','someone@example.com'),
  };
  const h=harness({rows,messages,pages:[{messages:[{id:'outbound'}],nextPageToken:'1'},{messages:[{id:'inbound'},{id:'unrelated'}]}]});
  h.context.syncClientDates();
  assert.equal(rows[0][11].getTime(),now-hour);
  assert.equal(rows[0][9],'New enquiry');
  assert.equal(h.state.lists.length,2);
  assert.ok(h.state.reads.every(read=>read.options.format==='metadata'));
  assert.deepEqual(Array.from(h.state.reads[0].options.metadataHeaders),['From','To','Cc','Bcc']);
  assert.ok(h.state.lists.every(options=>!('q' in options)));
});

test('ignores drafts, spam, trash and owner notifications with a client Reply-To',()=>{
  const messages={
    draft:message('draft',now-hour,'tellamindwork@gmail.com','client@example.com',['DRAFT']),
    spam:message('spam',now-hour,'client@example.com','tellamindwork@gmail.com',['SPAM']),
    trash:message('trash',now-hour,'client@example.com','tellamindwork@gmail.com',['TRASH']),
    notification:message('notification',now-hour,'tellamindwork@gmail.com','tellamindwork@gmail.com',['SENT'],[{name:'Reply-To',value:'client@example.com'}]),
  };
  const h=harness({messages,pages:[{messages:Object.keys(messages).map(id=>({id}))}]});
  h.context.syncClientDates();
  assert.equal(h.state.rows[0][11],'');
  assert.equal(h.state.writes.filter(write=>write.col===12).length,0);
});

test('Cc and Bcc count only on sent mail; received mail addressed to another client does not',()=>{
  const messages={
    received:message('received',now-hour,'unrelated@example.com','client@example.com',[]),
    sent:message('sent',now-2*hour,'tellamindwork@gmail.com','other@example.com',['SENT'],[{name:'Bcc',value:'client@example.com'}]),
  };
  const h=harness({messages,pages:[{messages:[{id:'received'},{id:'sent'}]}]});
  h.context.syncClientDates();
  assert.equal(h.state.rows[0][11].getTime(),now-2*hour);
});

test('old messages before enquiry receipt cannot invent a new contact',()=>{
  const item=message('old',now-4*24*hour,'client@example.com','tellamindwork@gmail.com');
  const h=harness({messages:{old:item},pages:[{messages:[{id:'old'}]}]});
  h.context.syncClientDates();assert.equal(h.state.rows[0][11],'');
});

test('replays preserve newer contact history and manual project deadline',()=>{
  const row=lead();row[11]=new Date(now-hour);row[13]=new Date(now+30*24*hour);
  const beforeDue=row[13].getTime();
  const old=message('old',now-2*hour,'client@example.com','tellamindwork@gmail.com');
  const h=harness({rows:[row],messages:{old},pages:[{messages:[{id:'old'}]}]});
  h.context.syncClientDates();h.context.syncClientDates();
  assert.equal(row[11].getTime(),now-hour);assert.equal(row[13].getTime(),beforeDue);
  assert.equal(h.state.writes.filter(write=>write.col===12).length,0);
  assert.equal(h.state.writes.filter(write=>write.col===13).length,1);
});

test('new enquiry gets a follow-up formula anchored to received/contact dates, without fake contact',()=>{
  const h=harness();h.context.syncClientDates();
  assert.equal(h.state.rows[0][11],'');
  const formula=h.state.formulas[0][0];
  assert.match(formula,/INT\(L9\)\+3/);assert.match(formula,/INT\(B9\)\+3/);
  assert.doesNotMatch(formula,/TODAY|NOW/);
  for(const stage of ['Completed','Lost','On hold'])assert.ok(formula.includes(stage));
});

test('closed leads keep their contact history and do not cause Gmail scans',()=>{
  const row=lead('client@example.com','Completed');row[11]=new Date(now-hour);
  const h=harness({rows:[row]});h.context.syncClientDates();
  assert.equal(row[11].getTime(),now-hour);assert.equal(h.state.lists.length,0);
});

test('Gmail errors do not advance checkpoint or overwrite dates; locks release',()=>{
  const h=harness({failGet:true,pages:[{messages:[{id:'failing'}]}]});
  h.state.properties.DATES_LAST_SYNC_MS=String(now-24*hour);
  assert.throws(()=>h.context.syncClientDates(),/temporarily unavailable/);
  assert.equal(h.state.properties.DATES_LAST_SYNC_MS,String(now-24*hour));
  assert.equal(h.state.writes.length,0);assert.equal(h.state.unlocked,1);
});

test('a concurrent row replacement never receives another client date',()=>{
  const email=message('email',now-hour,'client@example.com','tellamindwork@gmail.com');
  const h=harness({race:true,messages:{email},pages:[{messages:[{id:'email'}]}]});
  h.context.syncClientDates();assert.equal(h.state.writes.length,0);
});

test('installer creates exactly one five-minute background trigger and verifies business identity',()=>{
  const h=harness({rows:[]});h.context.installDateAutomation();h.context.installDateAutomation();
  assert.equal(h.state.triggerCreates.length,1);assert.equal(h.state.triggerCreates[0].minutes,5);
  assert.throws(()=>harness({account:'another@gmail.com'}).context.installDateAutomation(),/business account/);
});

test('manifest has metadata-only Gmail permission and no mail sending/modification permission',()=>{
  assert.ok(manifest.oauthScopes.includes('https://www.googleapis.com/auth/gmail.metadata'));
  assert.ok(manifest.oauthScopes.every(scope=>!/(gmail\.(readonly|modify|compose)|mail\.google\.com|script\.send_mail)/.test(scope)));
});
