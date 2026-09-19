import { randomBytes, createHash, timingSafeEqual } from 'node:crypto';
import QRCode from 'qrcode';
const TABLE = 'bit:certificates:v3';
const hash = text => createHash('sha256').update(text).digest('hex');
const fail = (status, message) => Object.assign(new Error(message), { status });
async function redis(...command) {
  const response = await fetch((process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL), {
    method: 'POST', headers: { Authorization: `Bearer ${(process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN)}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(command), signal: AbortSignal.timeout(8000)
  });
  if (!response.ok) throw fail(503, 'Certificate service is temporarily unavailable. Please try again.');
  const data = await response.json();
  if (data.error) throw fail(503, 'Certificate service is temporarily unavailable. Please try again.');
  return data.result;
}
function normalizeId(value) {
  const id = String(value || '').trim().toUpperCase();
  if (!/^[A-Z0-9][A-Z0-9-]{3,63}$/.test(id)) throw fail(400, 'Enter a valid certificate number (letters, numbers and hyphens).');
  return id;
}
function clean(value, max, label) {
  if (typeof value !== 'string' || !value.trim() || value.trim().length > max || /[\x00-\x1f]/.test(value)) throw fail(400, `Check the ${label}.`);
  return value.trim();
}
export function createHandler(command = redis) {
  return async function handler(req, res) {
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    const send = (status, value) => res.status(status).json(value);
    try {
      // Accept the existing production secret name without exposing or rotating its value.
      const password = process.env.ADMIN_PASSWORD || process.env.Sunil;
      if (!password || !(process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL) || !(process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN) || !process.env.SITE_URL) throw fail(503, 'Online certificate verification is not configured yet. Please contact the institute.');
      const origin = new URL(process.env.SITE_URL).origin;
      const action = req.query?.action || 'session';
      const method = req.method;
      const write = ['login', 'logout', 'issue', 'status'].includes(action);
      if (method !== (write ? 'POST' : 'GET')) throw fail(405, 'Method not allowed.');
      if (write && req.headers.origin !== origin) throw fail(403, 'Please use the official institute website.');
      let body = req.body || {};
      if (typeof body === 'string') { try { body = JSON.parse(body); } catch { throw fail(400, 'Invalid request.'); } }
      if (!body || typeof body !== 'object' || JSON.stringify(body).length > 4096) throw fail(400, 'Invalid request.');
      const token = /(?:^|;\s*)bit_session=([a-f0-9]{64})(?:;|$)/.exec(req.headers.cookie || '')?.[1];
      const sessionKey = token ? `bit:session:${hash(token)}` : null;
      const cookie = value => res.setHeader('Set-Cookie', `bit_session=${value}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${value ? 7200 : 0}`);
      if (action === 'login') {
        const ip = String(req.headers['x-vercel-forwarded-for'] || req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown').split(',')[0];
        const rateKey = `bit:login:${hash(ip)}`;
        const count = await command('EVAL', "local n=redis.call('INCR',KEYS[1]); if n==1 then redis.call('EXPIRE',KEYS[1],900) end; return n", 1, rateKey);
        if (Number(count) > 10) throw fail(429, 'Too many login attempts. Try again in 15 minutes.');
        const supplied = hash(typeof body.password === 'string' ? body.password : '');
        if (!timingSafeEqual(Buffer.from(supplied), Buffer.from(hash(password)))) throw fail(401, 'Incorrect administrator password.');
        const freshToken = randomBytes(32).toString('hex');
        await command('SET', `bit:session:${hash(freshToken)}`, hash(password), 'EX', 7200);
        if (sessionKey) await command('DEL', sessionKey);
        cookie(freshToken); return send(200, { authenticated: true });
      }
      if (action === 'logout') { if (sessionKey) await command('DEL', sessionKey); cookie(''); return send(200, { authenticated: false }); }
      if (action === 'verify' || action === 'qr') {
        const id = normalizeId(req.query.id);
        const raw = await command('HGET', TABLE, id);
        if (!raw) throw fail(404, 'No certificate with this number is registered. Older demo certificates must be reissued by the institute.');
        const record = JSON.parse(raw);
        if (action === 'qr') {
          const svg = await QRCode.toString(`${origin}/#verify?id=${encodeURIComponent(id)}`, { type: 'svg', width: 300, margin: 4, errorCorrectionLevel: 'M' });
          res.setHeader('Content-Type', 'image/svg+xml'); return res.status(200).send(svg);
        }
        return send(200, { valid: !record.revoked, revoked: record.revoked, record });
      }
      const authenticated = Boolean(sessionKey && await command('GET', sessionKey) === hash(password));
      if (action === 'session') return send(200, { authenticated });
      if (!authenticated) throw fail(401, 'Please sign in as an administrator.');
      if (action === 'list') {
        const rows = await command('HGETALL', TABLE);
        const records = Array.isArray(rows) ? rows.filter((_, i) => i % 2).map(JSON.parse) : Object.values(rows || {}).map(JSON.parse);
        return send(200, { records: records.sort((a, b) => b.createdAt.localeCompare(a.createdAt)) });
      }
      if (action === 'issue') {
        const id = normalizeId(body.id);
        const date = clean(body.date, 10, 'completion date');
        if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(date)) || new Date(date).toISOString().slice(0,10) !== date || date > new Date().toISOString().slice(0,10)) throw fail(400, 'Choose a valid completion date that is not in the future.');
        if (!['navy','green'].includes(body.theme)) throw fail(400, 'Choose a certificate theme.');
        const record = { id, student: clean(body.student, 100, 'student name'), course: clean(body.course, 160, 'course'), date, signatory: clean(body.signatory, 100, 'signatory'), theme: body.theme, revoked: false, createdAt: new Date().toISOString() };
        if (!await command('HSETNX', TABLE, id, JSON.stringify(record))) throw fail(409, 'This certificate number already exists. Use another number.');
        return send(201, { record });
      }
      if (action === 'status') {
        const id = normalizeId(body.id);
        if (typeof body.revoked !== 'boolean') throw fail(400, 'Choose a valid certificate status.');
        const raw = await command('HGET', TABLE, id);
        if (!raw) throw fail(404, 'Certificate not found.');
        const record = { ...JSON.parse(raw), revoked: body.revoked, updatedAt: new Date().toISOString() };
        await command('HSET', TABLE, id, JSON.stringify(record));
        return send(200, { record });
      }
      throw fail(404, 'Unknown action.');
    } catch (error) { return send(error.status || 503, { error: error.status ? error.message : 'Certificate service is temporarily unavailable. Please try again.' }); }
  };
}
export default createHandler();
