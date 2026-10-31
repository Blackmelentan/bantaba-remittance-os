import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Core, normalizeRef } from '../src/engine/core.js';
import { toMinor } from '../src/engine/money.js';
import { nameScore } from '../src/engine/names.js';

const PIN = '482915';
let clockNow = Date.parse('2026-11-03T10:00:00Z'); // Tuesday, inside hours for every demo branch
const mk = () => Core.open({ pbkdf2Iter: 1000, clock: () => clockNow, seed: false });
const as = (c, id, br) => c.login(id, PIN, br);
const recip = (r, t) => ({ name: r.name, phone: t.recipient.phone, idType: 'NATIONAL_ID', idNumber: t.recipient.idNumber });
const send = (c, s, o = {}) => c.issueTransfer(s, {
  destCountry: 'GM', mode: 'send', amountMinor: toMinor(100, 2), collectCcy: 'GBP', payCcy: 'GMD',
  sender: { name: 'Ousman Bah', phone: '+447900000001', idType: 'PASSPORT', idNumber: 'P123456', country: 'GB' },
  recipient: { name: 'Fatou Jallow', phone: '+2203300001', idType: 'NATIONAL_ID', idNumber: 'GM1' }, purpose: 'FAMILY_SUPPORT', sourceOfFunds: 'SALARY', ...o
});
const rejects = async (p, code) => { try { await p; } catch (e) { assert.equal(e.code, code, e.message); return; } assert.fail('expected ' + code); };

test('ledger stays balanced after a full lifecycle', async () => {
  const c = await mk();
  const t = await as(c, 'GB-LDN-T1', 'GB-LDN'), p = await as(c, 'GM-SKD-T1', 'GM-SKD');
  const r = await send(c, t);
  await c.redeem(p, { ref: r.ref, pin: r.pin, recipient: recip({ name: 'Fatou Jallow' }, r.transfer) });
  for (const [k, v] of Object.entries(c.trial())) assert.ok(v.balanced && v.dr === v.cr, k);
  assert.equal(c.cash('GM-SKD', 'GMD'), 40000 * 71 * 100 - r.transfer.payoutMinor);
});
test('code is single-use: nullified after redemption', async () => {
  const c = await mk();
  const t = await as(c, 'GB-LDN-T1', 'GB-LDN'), p = await as(c, 'GM-SKD-T1', 'GM-SKD');
  const r = await send(c, t);
  await c.redeem(p, { ref: r.ref, pin: r.pin, recipient: recip({ name: 'Fatou Jallow' }, r.transfer) });
  assert.equal(c.transferByRefStatus?.(), undefined);
  await rejects(c.redeem(p, { ref: r.ref, pin: r.pin, recipient: recip({ name: 'Fatou Jallow' }, r.transfer) }), 'CANNOT_PAY');
  assert.equal(c.s.transfers[0].pinHash, null);
});
test('wrong PIN x3 locks the transfer, supervisor unlocks', async () => {
  const c = await mk();
  const t = await as(c, 'GB-LDN-T1', 'GB-LDN'), p = await as(c, 'GM-SKD-T1', 'GM-SKD'), s = await as(c, 'GM-SKD-S1', 'GM-SKD');
  const r = await send(c, t);
  for (let i = 0; i < 2; i++) await rejects(c.redeem(p, { ref: r.ref, pin: '000000', recipient: recip({ name: 'Fatou Jallow' }, r.transfer) }), 'PIN_WRONG');
  await rejects(c.redeem(p, { ref: r.ref, pin: '000000', recipient: {} }), 'LOCKED');
  await rejects(c.redeem(p, { ref: r.ref, pin: r.pin, recipient: recip({ name: 'Fatou Jallow' }, r.transfer) }), 'CANNOT_PAY');
  await c.unlock(s, r.transfer.id);
  await c.redeem(p, { ref: r.ref, pin: r.pin, recipient: recip({ name: 'Fatou Jallow' }, r.transfer) });
});
test('recipient mismatch blocks payout; near match needs approval', async () => {
  const c = await mk();
  const t = await as(c, 'GB-LDN-T1', 'GB-LDN'), p = await as(c, 'GM-SKD-T1', 'GM-SKD');
  const r = await send(c, t);
  await rejects(c.redeem(p, { ref: r.ref, pin: r.pin, recipient: { ...recip({ name: 'Somebody Else' }, r.transfer) } }), 'RECIPIENT_MISMATCH');
  await rejects(c.redeem(p, { ref: r.ref, pin: r.pin, recipient: { ...recip({ name: 'Fatou Jallow' }, r.transfer), phone: '+999000111' } }), 'RECIPIENT_MISMATCH');
  assert.equal(c.s.transfers[0].status, 'ISSUED');
  assert.ok(nameScore('Mohammed Jallow', 'Muhammad Jallow') > 0.9, 'alias variants match');
});
test('issuer cannot redeem own transfer', async () => {
  const c = await mk();
  const t = await as(c, 'GM-SKD-T1', 'GM-SKD');
  const r = await send(c, t, { destCountry: 'GM', collectCcy: 'GMD', payCcy: 'GMD', amountMinor: toMinor(5000, 2) });
  await rejects(c.redeem(t, { ref: r.ref, pin: r.pin, recipient: recip({ name: 'Fatou Jallow' }, r.transfer) }), 'SELF_REDEEM');
});
test('same-country transfers work and are cheaper', async () => {
  const c = await mk();
  const t = await as(c, 'GM-SKD-T1', 'GM-SKD'), a = await as(c, 'GB-LDN-T1', 'GB-LDN');
  const dom = c._quote(t.branchId, { destCountry: 'GM', collectCcy: 'USD', payCcy: 'USD', amountMinor: 20000 });
  const intl = c._quote(a.branchId, { destCountry: 'GM', collectCcy: 'USD', payCcy: 'USD', amountMinor: 20000 });
  assert.ok(dom.feeMinor < intl.feeMinor);
});
test('any currency to any country, including ZMW and both directions', async () => {
  const c = await mk();
  for (const [from, to, dest, a, b] of [['GM-SKD', 'ZM-LUN', 'ZM', 'GMD', 'ZMW'], ['ZM-LUN', 'GM-SKD', 'GM', 'ZMW', 'GMD'], ['CN-GZH', 'GM-SKD', 'GM', 'CNY', 'GMD'], ['GM-SKD', 'CN-GZH', 'CN', 'GMD', 'CNY'], ['AE-DXB', 'DE-BER', 'DE', 'AED', 'EUR']]) {
    const q = c._quote(from, { destCountry: dest, collectCcy: a, payCcy: b, amountMinor: toMinor(500, c.cur[a].decimals) });
    assert.ok(q.payoutMinor > 0, `${a}->${b}`);
  }
});
test('receive mode: recipient gets exactly the requested amount (±1 minor)', async () => {
  const c = await mk();
  const q = c._quote('GB-LDN', { destCountry: 'GM', collectCcy: 'GBP', payCcy: 'GMD', mode: 'receive', amountMinor: toMinor(10000, 2) });
  assert.ok(Math.abs(q.payoutMinor - toMinor(10000, 2)) <= 100);
});
test('KYC tiers, hard max and sanctions block', async () => {
  const c = await mk(), t = await as(c, 'GB-LDN-T1', 'GB-LDN');
  await rejects(send(c, t, { amountMinor: toMinor(600, 2), sender: { name: 'No Id Person', phone: '+447911111111' } }), 'KYC_REQUIRED');
  await rejects(send(c, t, { amountMinor: toMinor(20000, 2) }), 'LIMIT_EXCEEDED');
  await rejects(send(c, t, { recipient: { name: 'Test Sanctioned Person', phone: '+2203300009' } }), 'SANCTIONS_MATCH');
  assert.ok(c.s.alerts.some((a) => a.type === 'SANCTIONS_BLOCK'));
});
test('PEP holds a transfer; clear releases, reject refunds', async () => {
  const c = await mk(), t = await as(c, 'GB-LDN-T1', 'GB-LDN'), k = await as(c, 'CMP-01', 'GB-LDN'), p = await as(c, 'GM-SKD-T1', 'GM-SKD');
  const r = await send(c, t, { recipient: { name: 'Demo Politically Exposed', phone: '+2203300777' } });
  assert.equal(r.transfer.status, 'ON_HOLD');
  await rejects(c.redeem(p, { ref: r.ref, pin: r.pin, recipient: {} }), 'CANNOT_PAY');
  const al = c.s.alerts.find((a) => a.transferId === r.transfer.id);
  await c.resolveAlert(k, al.id, 'CLEAR', 'EDD done');
  assert.equal(c.s.transfers[0].status, 'ISSUED');
  const r2 = await send(c, t, { recipient: { name: 'Demo Politically Exposed', phone: '+2203300777' } });
  await c.resolveAlert(k, c.s.alerts.find((a) => a.transferId === r2.transfer.id).id, 'REJECT', 'Not acceptable');
  assert.equal(c.s.transfers[1].status, 'CANCELLED');
  for (const v of Object.values(c.trial())) assert.ok(v.balanced);
});
test('cancel refunds and reverses FX legs, ledger balanced, old code dead', async () => {
  const c = await mk(), t = await as(c, 'GB-LDN-T1', 'GB-LDN'), s = await as(c, 'GB-LDN-S1', 'GB-LDN'), p = await as(c, 'GM-SKD-T1', 'GM-SKD');
  const before = c.cash('GB-LDN', 'GBP');
  const r = await send(c, t);
  await c.cancel(s, r.transfer.id, { reason: 'Customer changed mind', refundFee: true });
  assert.equal(c.cash('GB-LDN', 'GBP'), before);
  await rejects(c.redeem(p, { ref: r.ref, pin: r.pin, recipient: recip({ name: 'Fatou Jallow' }, r.transfer) }), 'CANNOT_PAY');
  for (const v of Object.values(c.trial())) assert.ok(v.balanced);
});
test('reissue retires the old code', async () => {
  const c = await mk(), t = await as(c, 'GB-LDN-T1', 'GB-LDN'), s = await as(c, 'GB-LDN-S1', 'GB-LDN'), p = await as(c, 'GM-SKD-T1', 'GM-SKD');
  const r = await send(c, t), n = await c.reissue(s, r.transfer.id);
  await rejects(c.lookup(p, r.ref), 'CODE_RETIRED');
  await c.redeem(p, { ref: n.ref, pin: n.pin, recipient: recip({ name: 'Fatou Jallow' }, r.transfer) });
});
test('wrong country payout point is refused; any branch in country works', async () => {
  const c = await mk(), t = await as(c, 'GB-LDN-T1', 'GB-LDN');
  const r = await send(c, t);
  const sn = await as(c, 'SN-DKR-T1', 'SN-DKR'), bj = await as(c, 'GM-BJL-T1', 'GM-BJL');
  await rejects(c.redeem(sn, { ref: r.ref, pin: r.pin, recipient: recip({ name: 'Fatou Jallow' }, r.transfer) }), 'CANNOT_PAY');
  await c.redeem(bj, { ref: r.ref, pin: r.pin, recipient: recip({ name: 'Fatou Jallow' }, r.transfer) });
});
test('insufficient float blocks payout', async () => {
  const c = await mk(), t = await as(c, 'GB-LDN-T1', 'GB-LDN'), p = await as(c, 'GM-BRK-T1', 'GM-BRK');
  const r = await send(c, t, { amountMinor: toMinor(2000, 2), sender: { name: 'Ousman Bah', phone: '+447900000001', idType: 'PASSPORT', idNumber: 'P123456', country: 'GB', idPhotoRef: 'photo1' }, cosign: { staffId: 'GB-LDN-S1', pin: PIN } });
  c.s.journals.length; // drain branch
  const bal = c.cash('GM-BRK', 'GMD'); await c.moveCash(await as(c, 'TRS-01', 'GM-BRK'), 'GM-BRK', 'GM-BJL', 'GMD', bal);
  await rejects(c.redeem(p, { ref: r.ref, pin: r.pin, recipient: recip({ name: 'Fatou Jallow' }, r.transfer) }), 'INSUFFICIENT_FLOAT');
});
test('co-sign required above threshold, must be a different person', async () => {
  const c = await mk(), t = await as(c, 'GB-LDN-S1', 'GB-LDN');
  const S = { name: 'Ousman Bah', phone: '+447900000001', idType: 'PASSPORT', idNumber: 'P123456', country: 'GB', idPhotoRef: 'p1' };
  await rejects(send(c, t, { amountMinor: toMinor(2000, 2), sender: S }), 'COSIGN_REQUIRED');
  await rejects(send(c, t, { amountMinor: toMinor(2000, 2), sender: S, cosign: { staffId: 'GB-LDN-S1', pin: PIN } }), 'APPROVER_SAME');
  await send(c, t, { amountMinor: toMinor(2000, 2), sender: S, cosign: { staffId: 'ADM-01', pin: PIN } });
});
test('login lockout, wrong PIN, deactivated staff, role enforcement', async () => {
  const c = await mk();
  for (let i = 0; i < 5; i++) await rejects(c.login('GM-SKD-T1', '111111', 'GM-SKD'), 'BAD_CREDENTIALS');
  await rejects(c.login('GM-SKD-T1', PIN, 'GM-SKD'), 'LOCKED_OUT');
  const t = await as(c, 'GM-BJL-T1', 'GM-BJL');
  await rejects(c.updateSettings(t, { fxMarginBps: 1 }), 'FORBIDDEN');
  await rejects(c.login('GM-BJL-T1', PIN, 'GB-LDN'), 'BRANCH_NOT_ALLOWED');
});
test('operating hours enforced by branch timezone', async () => {
  const c = await mk();
  const saved = clockNow; clockNow = Date.parse('2026-11-03T22:00:00Z');
  await rejects(c.login('GM-SKD-T1', PIN, 'GM-SKD'), 'OUTSIDE_HOURS');
  clockNow = Date.parse('2026-11-08T10:00:00Z'); // Sunday
  await rejects(c.login('GM-SKD-T1', PIN, 'GM-SKD'), 'OUTSIDE_HOURS');
  clockNow = saved;
});
test('idle timeout closes session and clocks staff out', async () => {
  const c = await mk(), s = await as(c, 'GM-SKD-T1', 'GM-SKD');
  assert.equal(c.onShift().length, 1);
  clockNow += 16 * 60000;
  await rejects(c.lookup(s, 'BNT-AAAA-BBBB'), 'SESSION_EXPIRED');
  assert.equal(c.onShift().length, 0);
});
test('admin: staff, branches, currencies, countries, settings and rates', async () => {
  const c = await mk(), a = await as(c, 'ADM-01', 'GM-SKD');
  await c.upsertStaff(a, { id: 'NEW-01', name: 'New Teller', role: 'TELLER', branches: ['GM-SKD'], pin: '135790' });
  assert.ok((await c.login('NEW-01', '135790', 'GM-SKD')).staffId);
  await c.setStaffActive(a, 'NEW-01', false);
  await rejects(c.login('NEW-01', '135790', 'GM-SKD'), 'BAD_CREDENTIALS');
  await rejects(c.setStaffActive(a, 'ADM-01', false), 'SELF_DEACTIVATE');
  await c.upsertCountry(a, { code: 'GH', name: 'Ghana', currency: 'GHS', tz: 'Africa/Accra', dial: '+233' });
  await c.upsertBranch(a, { id: 'GH-ACC', country: 'GH', name: 'Accra Central', city: 'Accra' });
  await c.upsertBranch(a, { id: 'GM-WER', country: 'GM', name: 'Wellingara', city: 'Wellingara' });
  assert.equal(c.s.branches.filter((b) => b.country === 'GM').length, 4);
  await c.updateSettings(a, { fxMarginBps: 200, codeExpiryDays: 14 });
  await rejects(c.updateSettings(a, { bogus: 1 }), 'BAD_SETTING');
  await c.setRate(a, 'ZMW', 26);
  assert.equal(c.cur.ZMW.perUsd, 26);
  assert.ok((await c.verifyAuditChain()).ok);
});
test('audit chain detects tampering', async () => {
  const c = await mk(); await as(c, 'GM-SKD-T1', 'GM-SKD');
  c.s.audit[0].detail = 'edited'; assert.equal((await c.verifyAuditChain()).ok, false);
});
test('timesheet, lateness and attendance', async () => {
  const c = await mk();
  clockNow = Date.parse('2026-11-03T09:00:00Z'); // 30 min after 08:30, 10 min grace
  const t = await as(c, 'GM-SKD-T1', 'GM-SKD'); const sup = await as(c, 'GM-SKD-S1', 'GM-SKD');
  clockNow = Date.parse('2026-11-03T09:10:00Z');
  await c.logout(t);
  const ts = c.timesheet(sup);
  assert.equal(ts.find((x) => x.staffId === 'GM-SKD-T1').lateMin, 20);
  assert.equal(c.onShift().length, 1);
  clockNow = Date.parse('2026-11-03T10:00:00Z');
});
test('codes: normalisation and uniqueness', async () => {
  assert.equal(normalizeRef('bnt 0o1l-ab12'), 'BNT-0011-AB12');
  assert.equal(normalizeRef('abc'), null);
  const c = await mk(), s = new Set();
  const { newRef } = await import('../src/engine/core.js');
  for (let i = 0; i < 2000; i++) s.add(newRef());
  assert.equal(s.size, 2000);
});
test('backup export/import round trips', async () => {
  const c = await mk(); const j = c.exportState(); const d = await mk(); await d.importState(j); assert.equal(d.s.pepper, c.s.pepper);
  await rejects(d.importState('{"v":9}'), 'BAD_BACKUP');
});
