import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {submitInquiry} from '../../src/lib/submitInquiry.js';

const code=fs.readFileSync(new URL('./Code.gs',import.meta.url),'utf8');
function harness() {
 const rows=[],notifications=[]; let unlocked=0;
 const sheet={
  getMaxRows:()=>1000,
  getLastRow:()=>Math.max(208,8+rows.length),
  getRange:(row,col,height,width)=>({
   getValue:()=> 'Lead ID',
   getValues:()=>Array.from({length:992},(_,i)=>[rows[i]?.[0]||'']),
   setValues:values=>{rows[row-9]=values[0];return {}} ,
   setNumberFormat:()=>{},setFormula:()=>{},
  }),
 };
 const context=vm.createContext({console,Date,Set,JSON,String,Object,Error,
  PropertiesService:{getScriptProperties:()=>({getProperty:()=> 'test-tracker'})},
  LockService:{getScriptLock:()=>({waitLock:()=>{},releaseLock:()=>unlocked++})},
  SpreadsheetApp:{openById:()=>({getSheetByName:()=>sheet}),flush:()=>{}},
  MailApp:{sendEmail:input=>notifications.push(input)},
  ContentService:{MimeType:{JSON:'json'},createTextOutput:body=>({setMimeType:()=>JSON.parse(body)})},
 });
 vm.runInContext(code,context);
 return {context,rows,notifications,get unlocked(){return unlocked}};
}
const fields={name:'Setup test',email:'owner@example.com',service:'Websites & E-commerce',privacyConsent:'on',requestId:'12345678-1234-1234-1234-123456789012',message:'Website requirements',budget:'Under $2,500'};
test('saves a valid enquiry into the first blank tracker row and notifies only the owner',()=>{
 const h=harness();const result=h.context.doPost({parameter:fields});
 assert.equal(result.ok,true);assert.equal(h.rows.length,1);assert.equal(h.rows[0][2],'Setup test');assert.equal(h.rows[0][9],'New enquiry');assert.match(h.rows[0][8],/Website requirements/);assert.equal(h.notifications[0].to,'tellamindwork@gmail.com');assert.equal(h.unlocked,1);
});
test('retries with the same request ID do not create duplicate rows or notifications',()=>{
 const h=harness();h.context.doPost({parameter:fields});h.context.doPost({parameter:fields});assert.equal(h.rows.length,1);assert.equal(h.notifications.length,1);
});
test('missing consent and invalid email never write records',()=>{
 for(const p of [{...fields,privacyConsent:''},{...fields,email:'bad\naddress'}]){const h=harness();assert.equal(h.context.doPost({parameter:p}).ok,false);assert.equal(h.rows.length,0);}
});
test('arbitrary service-specific fields are retained and formula-like input is escaped',()=>{
 const h=harness();h.context.doPost({parameter:{...fields,name:'=IMPORTXML("https://invalid.test")',websiteNeeds:'Booking form',currentWebsite:'https://example.com'}});assert.match(h.rows[0][2],/^'=/);assert.match(h.rows[0][8],/website Needs: Booking form/);assert.match(h.rows[0][8],/https:\/\/example.com/);
});
test('honeypot entries do not write or notify',()=>{const h=harness();assert.equal(h.context.doPost({parameter:{...fields,_gotcha:'bot'}}).ok,true);assert.equal(h.rows.length,0);assert.equal(h.notifications.length,0)});
test('notification failure preserves successful saved enquiry',()=>{
 const h=harness();h.context.MailApp.sendEmail=()=>{throw new Error('quota')};assert.equal(h.context.doPost({parameter:fields}).ok,true);assert.equal(h.rows.length,1);
});
test('webhook request uses URL-encoded data and reads application-level failure',async()=>{
 const data=new FormData();for(const [key,value] of Object.entries(fields))data.set(key,value);
 let request;await assert.rejects(submitInquiry(data,{webhookUrl:'https://script.google.com/test/exec',fetchImpl:async(url,options)=>{request=options;return {ok:true,json:async()=>({ok:false})}}}));
 assert.ok(request.body instanceof URLSearchParams);assert.equal(request.body.get('service'),fields.service);
});
test('Formspree fallback keeps multipart data without requiring response JSON',async()=>{
 const data=new FormData();data.set('name','Setup test');await submitInquiry(data,{webhookUrl:'',formspreeUrl:'https://formspree.io/f/test',fetchImpl:async(url,options)=>{assert.equal(options.body,data);return {ok:true}}});
});
test('transport errors never appear as a successful submission',async()=>{
 await assert.rejects(submitInquiry(new FormData(),{webhookUrl:'',formspreeUrl:'https://formspree.io/f/test',fetchImpl:async()=>({ok:false})}));
});
