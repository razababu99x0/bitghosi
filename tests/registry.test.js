import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { createHandler } from '../api/registry.js';
let handler;
beforeEach(() => {
  Object.assign(process.env,{ADMIN_PASSWORD:'test-only-password',UPSTASH_REDIS_REST_URL:'https://example.invalid',UPSTASH_REDIS_REST_TOKEN:'test',SITE_URL:'https://bit.test'});
  const values=new Map(), records=new Map(); let attempts=0;
  handler=createHandler(async (op,key,...args)=>{
    if(op==='EVAL') return ++attempts;
    if(op==='GET') return values.get(key)||null;
    if(op==='SET') { values.set(key,args[0]);return 'OK'; }
    if(op==='DEL') return values.delete(key);
    if(op==='HGET') return records.get(args[0])||null;
    if(op==='HSETNX') {if(records.has(args[0])) return 0;records.set(args[0],args[1]);return 1;}
    if(op==='HSET') {records.set(args[0],args[1]);return 1;}
    if(op==='HGETALL') return [...records].flat();
    throw new Error(`Unmocked ${op}`);
  });
});
async function call(action,{body, cookie='',origin='https://bit.test',id,method}={}) {
  const result={headers:{}};
  const res={setHeader(k,v){result.headers[k]=v;},status(n){result.status=n;return this;},json(v){result.body=v;return this;},send(v){result.body=v;return this;}};
  await handler({method:method||(body?'POST':'GET'),query:{action,id},headers:{origin,cookie},body},res);return result;
}
async function login(){const r=await call('login',{body:{password:'test-only-password'}});assert.equal(r.status,200);return r.headers['Set-Cookie'].split(';')[0];}
const certificate={id:'BIT-2026-TEST1234',student:'Example Student',course:'Python Programming',date:'2026-01-12',signatory:'Test Signatory',theme:'navy'};
test('rejects unauthenticated writes, forged cookies and cross-origin writes',async()=>{
 assert.equal((await call('issue',{body:certificate})).status,401);
 assert.equal((await call('issue',{body:certificate,cookie:'bit_session='+'a'.repeat(64)})).status,401);
 assert.equal((await call('issue',{body:certificate,cookie:await login(),origin:'https://other.test'})).status,403);
 assert.equal((await call('login',{method:'GET'})).status,405);
});
test('issue, public verify, QR, duplicate, revoke, restore and logout lifecycle',async()=>{
 const cookie=await login();
 assert.match(cookie,/bit_session=[a-f0-9]{64}/);
 assert.equal((await call('issue',{body:certificate,cookie})).status,201);
 assert.equal((await call('issue',{body:certificate,cookie})).status,409);
 const publicResult=await call('verify',{id:certificate.id.toLowerCase()});
 assert.equal(publicResult.body.valid,true);assert.equal(publicResult.body.record.student,certificate.student);
 const qr=await call('qr',{id:certificate.id});assert.equal(qr.status,200);assert.match(qr.body,/<svg/);
 assert.equal((await call('list',{cookie})).body.records.length,1);
 await call('status',{body:{id:certificate.id,revoked:true},cookie});
 assert.equal((await call('verify',{id:certificate.id})).body.revoked,true);
 await call('status',{body:{id:certificate.id,revoked:false},cookie});
 assert.equal((await call('verify',{id:certificate.id})).body.valid,true);
 await call('logout',{body:{},cookie});
 assert.equal((await call('issue',{body:{...certificate,id:'BIT-OTHER'},cookie})).status,401);
});
test('unknown and malformed certificates never verify',async()=>{
 assert.equal((await call('verify',{id:'BIT-NOTREAL'})).status,404);
 assert.equal((await call('verify',{id:'<script>'})).status,400);
 const cookie=await login();
 for(const date of ['2026-02-30','2099-01-01','not-a-date']) assert.equal((await call('issue',{body:{...certificate,date},cookie})).status,400);
});
test('rate limits login and fails closed when configuration is missing',async()=>{
 for(let i=0;i<10;i++) assert.equal((await call('login',{body:{password:'wrong'}})).status,401);
 assert.equal((await call('login',{body:{password:'wrong'}})).status,429);
 delete process.env.ADMIN_PASSWORD;
 assert.equal((await call('verify',{id:certificate.id})).status,503);
});
test('password rotation invalidates existing server sessions',async()=>{
 const cookie=await login();process.env.ADMIN_PASSWORD='changed-password';
 assert.equal((await call('session',{cookie})).body.authenticated,false);
 assert.equal((await call('issue',{body:certificate,cookie})).status,401);
});
