import { CURRENCIES, COUNTRIES, BRANCHES, DEFAULT_SETTINGS } from './defaults.js';
import { curMap, price, toUsd, midRate } from './fx.js';
import { toMinor, toMajor, fmtCur } from './money.js';
import { validateJournal, balances, trialBalance, cashAccount } from './ledger.js';
import { randomInt, randomBytes, toHex, sha256Hex, hmacHex, pbkdf2Hex, safeEqual } from './crypto.js';
import { nameScore, maskName, phoneMatch, digits, normalize } from './names.js';

export class BantabaError extends Error {
  constructor(code, message, extra = {}) { super(message); this.code = code; Object.assign(this, extra); }
}
const E = (code, msg, extra) => new BantabaError(code, msg, extra);

export const ROLES = ['TELLER', 'SUPERVISOR', 'COMPLIANCE', 'TREASURY', 'ADMIN'];
export const PERMS = {
  send: ['TELLER', 'SUPERVISOR', 'ADMIN'],
  payout: ['TELLER', 'SUPERVISOR', 'ADMIN'],
  'transfers.view': ['TELLER', 'SUPERVISOR', 'COMPLIANCE', 'TREASURY', 'ADMIN'],
  'transfers.manage': ['SUPERVISOR', 'ADMIN'],
  'vault.view': ['TELLER', 'SUPERVISOR', 'COMPLIANCE', 'TREASURY', 'ADMIN'],
  'vault.close': ['SUPERVISOR', 'ADMIN'],
  'vault.inject': ['TREASURY', 'ADMIN'],
  'vault.move': ['TREASURY', 'SUPERVISOR', 'ADMIN'],
  'compliance.view': ['COMPLIANCE', 'SUPERVISOR', 'ADMIN'],
  'compliance.resolve': ['COMPLIANCE', 'ADMIN'],
  'ledger.view': ['SUPERVISOR', 'COMPLIANCE', 'TREASURY', 'ADMIN'],
  'reports.view': ['SUPERVISOR', 'COMPLIANCE', 'TREASURY', 'ADMIN'],
  'rates.edit': ['TREASURY', 'ADMIN'],
  'staff.time.view': ['SUPERVISOR', 'ADMIN'],
  admin: ['ADMIN']
};
const FRONT_LINE = ['TELLER', 'SUPERVISOR'];
const ID_TYPES = ['PASSPORT', 'NATIONAL_ID', 'DRIVING_LICENCE', 'RESIDENCE_PERMIT', 'VOTER_CARD'];
const B32 = '0123456789ABCDEFGHJKMNPQRSTVWXYZ'; // Crockford: no I, L, O, U
const DAY = 86400000;

export function normalizeRef(input) {
  let s = String(input ?? '').toUpperCase().replace(/[^0-9A-Z]/g, '');
  if (s.startsWith('BNT')) s = s.slice(3);
  s = s.replace(/O/g, '0').replace(/[IL]/g, '1').replace(/U/g, 'V');
  return s.length === 8 ? `BNT-${s.slice(0, 4)}-${s.slice(4)}` : null;
}
export function newRef() {
  let s = '';
  for (let i = 0; i < 8; i++) s += B32[randomInt(32)];
  return `BNT-${s.slice(0, 4)}-${s.slice(4)}`;
}
export function newPin() { return String(randomInt(1000000)).padStart(6, '0'); }

export function localParts(ts, tz) {
  const f = new Intl.DateTimeFormat('en-GB', {
    timeZone: tz, weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit'
  });
  const p = Object.fromEntries(f.formatToParts(new Date(ts)).map((x) => [x.type, x.value]));
  const dow = { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 7 }[p.weekday];
  return { dow, minutes: +p.hour * 60 + +p.minute, date: `${p.year}-${p.month}-${p.day}` };
}
const hm = (s) => { const [h, m] = s.split(':').map(Number); return h * 60 + m; };

export class MemoryStorage {
  constructor() { this.m = new Map(); }
  get(k) { return this.m.get(k) ?? null; }
  set(k, v) { this.m.set(k, v); }
  remove(k) { this.m.delete(k); }
}
export class LocalStorageAdapter {
  constructor(prefix = 'bantaba.os.') { this.p = prefix; }
  get(k) { try { return localStorage.getItem(this.p + k); } catch { return null; } }
  set(k, v) { try { localStorage.setItem(this.p + k, v); } catch { /* quota */ } }
  remove(k) { try { localStorage.removeItem(this.p + k); } catch { /* */ } }
}

export class Core {
  constructor({ storage = new MemoryStorage(), clock = () => Date.now(), pbkdf2Iter = 120000 } = {}) {
    this.storage = storage; this.clock = clock; this.iter = pbkdf2Iter;
    this.sessions = new Map(); this._auditQ = Promise.resolve(); this.s = null;
  }
  now() { return this.clock(); }

  /* ---------- lifecycle ---------- */
  static async open(opts = {}) {
    const c = new Core(opts);
    const raw = c.storage.get('state');
    if (raw) { try { c.s = JSON.parse(raw); } catch { c.s = null; } }
    if (!c.s || c.s.v !== 1) await c.resetDemo({ seed: opts.seed !== false });
    c.releaseStaleLocks(); c.expireDue();
    return c;
  }
  save() { this.storage.set('state', JSON.stringify(this.s)); }
  async resetDemo({ seed = true } = {}) {
    this.sessions.clear();
    this.s = {
      v: 1, settings: structuredClone(DEFAULT_SETTINGS), currencies: structuredClone(CURRENCIES), countries: structuredClone(COUNTRIES),
      branches: structuredClone(BRANCHES), staff: [], customers: {}, transfers: [], journals: [], audit: [], alerts: [], attendance: [],
      notifications: [], quotes: {}, dayCloses: [], loginFails: {}, lookupFails: {}, counters: { j: 0, a: 0, att: 0, tx: 0, n: 0, q: 0, al: 0 },
      pepper: toHex(randomBytes(32)), demo: { pins: {}, codes: [] }
    };
    await this._seedStaff();
    this._seedFloat();
    if (seed) await this._seedTransfers();
    this.save();
  }
  exportState() { return JSON.stringify(this.s); }
  async importState(json) {
    const s = JSON.parse(json);
    if (s.v !== 1 || !s.settings || !Array.isArray(s.transfers)) throw E('BAD_BACKUP', 'Not a valid Bantaba backup file');
    this.s = s; this.sessions.clear(); this.save();
  }

  /* ---------- lookups ---------- */
  get cur() { return curMap(this.s.currencies); }
  country(code) { return this.s.countries.find((c) => c.code === code); }
  branch(id) { return this.s.branches.find((b) => b.id === id); }
  staffById(id) { return this.s.staff.find((x) => x.id === id); }
  branchCountry(id) { return this.country(this.branch(id)?.country); }
  async refHash(ref) { return hmacHex(this.s.pepper, `ref:${ref}`); }
  async findByRef(input) {
    const ref = normalizeRef(input);
    if (!ref) return { ref: null };
    const h = await this.refHash(ref);
    const t = this.s.transfers.find((x) => x.refHash === h);
    if (t) return { ref, hash: h, t, retired: false };
    const old = this.s.transfers.find((x) => x.refHistory.some((r) => r.hash === h));
    return old ? { ref, hash: h, t: old, retired: true } : { ref, hash: h, t: null };
  }
  async pinHashFor(ref, pin) { return hmacHex(this.s.pepper, `pin:${ref}:${pin}`); }
  fmt(minor, code) { return fmtCur(minor, this.cur[code]); }
  usd(minor, code) { return toUsd(minor, code, this.cur); }

  /* ---------- sessions & permissions ---------- */
  can(session, perm) { return !!session && PERMS[perm]?.includes(session.role); }
  need(session, perm) {
    if (!session || !this.sessions.has(session.id)) throw E('NO_SESSION', 'Please sign in');
    this.touch(session);
    if (!this.can(session, perm)) throw E('FORBIDDEN', `Your role (${session.role}) cannot do this`);
  }
  touch(session) {
    const live = this.sessions.get(session.id);
    if (!live) throw E('NO_SESSION', 'Please sign in');
    const idle = this.s.settings.idleTimeoutMin * 60000;
    if (this.now() - live.lastActive > idle) { this._closeSession(live, 'IDLE_TIMEOUT'); throw E('SESSION_EXPIRED', 'Session timed out — sign in again'); }
    live.lastActive = this.now();
  }
  branchOpen(branchId, at = this.now()) {
    const b = this.branch(branchId), c = this.branchCountry(branchId);
    if (!b?.active) return { open: false, reason: 'Branch is deactivated' };
    const p = localParts(at, c.tz);
    const open = b.hours.days.includes(p.dow) && p.minutes >= hm(b.hours.open) && p.minutes < hm(b.hours.close);
    return { open, reason: open ? '' : `Closed (hours ${b.hours.open}–${b.hours.close} local, days ${b.hours.days.join(',')})` };
  }

  async _hashPin(pin, saltHex) { return pbkdf2Hex(String(pin), saltHex, this.iter); }
  async login(staffId, pin, branchId) {
    const id = String(staffId ?? '').trim().toUpperCase();
    const fails = (this.s.loginFails[id] ??= { n: 0, until: 0 });
    if (fails.until > this.now()) throw E('LOCKED_OUT', `Too many attempts. Try again in ${Math.ceil((fails.until - this.now()) / 60000)} min.`);
    const st = this.staffById(id);
    const ok = st && st.active && safeEqual(await this._hashPin(pin, st.salt), st.pinHash);
    if (!ok) {
      fails.n++;
      if (fails.n >= this.s.settings.maxLoginAttempts) { fails.until = this.now() + this.s.settings.lockoutMinutes * 60000; fails.n = 0; }
      this.save();
      await this._audit({ staffId: id, branchId }, 'LOGIN_FAILED', `Failed sign-in for ${id}`);
      throw E('BAD_CREDENTIALS', st && !st.active ? 'This account is deactivated' : 'Invalid staff ID or PIN');
    }
    fails.n = 0;
    const branch = branchId || st.branches[0];
    if (!st.branches.includes(branch) && st.role !== 'ADMIN') throw E('BRANCH_NOT_ALLOWED', 'You are not assigned to this branch');
    if (!this.branch(branch)) throw E('BRANCH_UNKNOWN', 'Unknown branch');
    if (this.s.settings.enforceOperatingHours && FRONT_LINE.includes(st.role)) {
      const o = this.branchOpen(branch);
      if (!o.open) throw E('OUTSIDE_HOURS', o.reason);
    }
    const session = { id: toHex(randomBytes(12)), staffId: st.id, name: st.name, role: st.role, branchId: branch, startedAt: this.now(), lastActive: this.now(), mustChangePin: !!st.mustChangePin };
    this.sessions.set(session.id, session);
    if (this.s.settings.autoClockIn && FRONT_LINE.includes(st.role)) this._clockIn(session);
    this.save();
    await this._audit(session, 'LOGIN', `Signed in at ${branch}`);
    return { ...session };
  }
  async logout(session, reason = 'LOGOUT') {
    const live = this.sessions.get(session?.id);
    if (!live) return;
    this._closeSession(live, reason);
    await this._audit(live, reason, 'Session closed');
  }
  _closeSession(live, reason) {
    this._clockOut(live, reason);
    this.sessions.delete(live.id); this.save();
  }
  async verifyApprover(staffId, pin, { minRoles = ['SUPERVISOR', 'ADMIN'], notStaffId } = {}) {
    const st = this.staffById(String(staffId ?? '').toUpperCase());
    if (!st || !st.active || !minRoles.includes(st.role)) throw E('APPROVER_INVALID', 'Approver must be an active supervisor or administrator');
    if (notStaffId && st.id === notStaffId) throw E('APPROVER_SAME', 'Approver must be a different person');
    if (!safeEqual(await this._hashPin(pin, st.salt), st.pinHash)) throw E('APPROVER_INVALID', 'Approver PIN is incorrect');
    return st;
  }
  async changePin(session, oldPin, newPin) {
    this.need(session, 'transfers.view');
    const st = this.staffById(session.staffId);
    if (!safeEqual(await this._hashPin(oldPin, st.salt), st.pinHash)) throw E('BAD_CREDENTIALS', 'Current PIN is incorrect');
    if (!/^\d{6}$/.test(newPin) || /^(\d)\1+$/.test(newPin) || '0123456789012'.includes(newPin) || '9876543210987'.includes(newPin)) throw E('WEAK_PIN', 'Use 6 digits that are not repeated or sequential');
    st.salt = toHex(randomBytes(16)); st.pinHash = await this._hashPin(newPin, st.salt); st.mustChangePin = false;
    this.sessions.get(session.id).mustChangePin = false; this.save();
    await this._audit(session, 'PIN_CHANGED', 'Staff changed own PIN');
  }

  /* ---------- audit (hash-chained) ---------- */
  _audit(actor, action, detail) {
    this._auditQ = this._auditQ.then(async () => {
      const a = this.s.audit, prev = a.length ? a.at(-1).hash : 'GENESIS';
      const n = ++this.s.counters.a, ts = this.now();
      const entry = { n, ts, staffId: actor?.staffId ?? 'SYSTEM', branchId: actor?.branchId ?? null, action, detail, prev };
      entry.hash = await sha256Hex(`${prev}|${n}|${ts}|${entry.staffId}|${action}|${detail}`);
      a.push(entry); this.save();
    });
    return this._auditQ;
  }
  async verifyAuditChain() {
    await this._auditQ;
    let prev = 'GENESIS';
    for (const e of this.s.audit) {
      const h = await sha256Hex(`${prev}|${e.n}|${e.ts}|${e.staffId}|${e.action}|${e.detail}`);
      if (e.prev !== prev || e.hash !== h) return { ok: false, brokenAt: e.n };
      prev = e.hash;
    }
    return { ok: true, entries: this.s.audit.length };
  }

  /* ---------- ledger ---------- */
  _post({ type, ref, ccy, lines, memo = '', actor }) {
    const j = { id: `J${String(++this.s.counters.j).padStart(6, '0')}`, ts: this.now(), type, ref, ccy, lines, memo, staffId: actor?.staffId ?? 'SYSTEM', branchId: actor?.branchId ?? null };
    validateJournal(j);
    this.s.journals.push(j);
    return j;
  }
  get bal() { return balances(this.s.journals); }
  cash(branchId, ccy) { return this.bal[cashAccount(branchId, ccy)] ?? 0; }
  branchCash(branchId) {
    const out = {}, b = this.bal;
    for (const [a, v] of Object.entries(b)) { const p = a.split(':'); if (p[0] === 'CASH' && p[1] === branchId && v !== 0) out[p[2]] = v; }
    return out;
  }
  trial() { return trialBalance(this.s.journals); }
  lowFloatMinor(ccy) { const c = this.cur[ccy]; return Math.round(this.s.settings.lowFloatUsd * c.perUsd * 10 ** c.decimals); }
  _seedFloat() {
    for (const b of this.s.branches) {
      const home = this.country(b.country).currency;
      const targets = [[home, 40000]];
      if (['AE', 'CN', 'GB', 'DE', 'FR', 'US'].includes(b.country)) targets.push(['USD', 8000]);
      if (['GM', 'SN', 'ML', 'GW', 'GN', 'ZM'].includes(b.country)) targets.push(['USD', 3000]);
      for (const [ccy, usd] of targets) {
        const c = this.cur[ccy], minor = Math.round(usd * c.perUsd * 10 ** c.decimals);
        this._post({ type: 'FLOAT_IN', ref: b.id, ccy, memo: 'Opening float', lines: [{ account: cashAccount(b.id, ccy), dr: minor }, { account: `HQ_FUNDING:${ccy}`, cr: minor }] });
      }
    }
  }

  /* ---------- workforce & time ---------- */
  _schedule(st) { return st.schedule || { days: [1, 2, 3, 4, 5, 6], start: '08:30', end: '17:30' }; }
  _clockIn(session) {
    const open = this.s.attendance.find((a) => a.staffId === session.staffId && !a.out);
    if (open) return open;
    const st = this.staffById(session.staffId), sch = this._schedule(st), c = this.branchCountry(session.branchId);
    const p = localParts(this.now(), c.tz);
    const scheduled = sch.days.includes(p.dow);
    const lateMin = scheduled ? Math.max(0, p.minutes - hm(sch.start) - this.s.settings.graceMin) : 0;
    const rec = { id: ++this.s.counters.att, staffId: st.id, branchId: session.branchId, date: p.date, in: this.now(), out: null, outReason: null, lateMin, overtimeMin: 0, unscheduled: !scheduled, edited: false };
    this.s.attendance.push(rec);
    return rec;
  }
  _clockOut(live, reason) {
    const rec = this.s.attendance.find((a) => a.staffId === live.staffId && !a.out);
    if (!rec) return;
    rec.out = this.now(); rec.outReason = reason;
    const st = this.staffById(live.staffId);
    if (st) {
      const sch = this._schedule(st), c = this.country(this.branch(rec.branchId).country);
      const p = localParts(rec.out, c.tz);
      rec.overtimeMin = sch.days.includes(p.dow) ? Math.max(0, p.minutes - hm(sch.end)) : Math.round((rec.out - rec.in) / 60000);
    }
  }
  releaseStaleLocks() {
    for (const [k, v] of Object.entries(this.s.loginFails)) if (!v.n && v.until < this.now()) delete this.s.loginFails[k];
  }
  onShift() {
    return this.s.attendance.filter((a) => !a.out).map((a) => ({ ...a, name: this.staffById(a.staffId)?.name }));
  }
  /** Timesheet: per staff totals over [fromTs,toTs). */
  timesheet(session, { from = this.now() - 7 * DAY, to = this.now() + DAY, staffId } = {}) {
    this.need(session, 'staff.time.view');
    const out = {};
    for (const a of this.s.attendance) {
      if (a.in < from || a.in >= to || (staffId && a.staffId !== staffId)) continue;
      if (session.role === 'SUPERVISOR' && a.branchId !== session.branchId) continue;
      const end = a.out ?? this.now();
      const r = (out[a.staffId] ??= { staffId: a.staffId, name: this.staffById(a.staffId)?.name, shifts: 0, minutes: 0, lateCount: 0, lateMin: 0, overtimeMin: 0, open: false });
      r.shifts++; r.minutes += Math.round((end - a.in) / 60000);
      if (a.lateMin > 0) { r.lateCount++; r.lateMin += a.lateMin; }
      r.overtimeMin += a.overtimeMin; if (!a.out) r.open = true;
    }
    return Object.values(out).sort((x, y) => x.name.localeCompare(y.name));
  }
  attendanceLog(session, { staffId, limit = 200 } = {}) {
    this.need(session, 'staff.time.view');
    return this.s.attendance
      .filter((a) => (!staffId || a.staffId === staffId) && (session.role !== 'SUPERVISOR' || a.branchId === session.branchId))
      .slice().reverse().slice(0, limit).map((a) => ({ ...a, name: this.staffById(a.staffId)?.name }));
  }
  async adjustAttendance(session, id, { in: tin, out: tout, note }) {
    this.need(session, 'admin');
    const a = this.s.attendance.find((x) => x.id === id);
    if (!a) throw E('NOT_FOUND', 'Attendance record not found');
    if (!note) throw E('NOTE_REQUIRED', 'A reason is required to edit time records');
    const before = `${a.in}→${a.out}`;
    if (tin) a.in = tin; if (tout) a.out = tout; a.edited = true; this.save();
    await this._audit(session, 'ATTENDANCE_EDIT', `Record ${id} (${a.staffId}) ${before} → ${a.in}→${a.out}. ${note}`);
  }

  /* ---------- seeding ---------- */
  async _mkStaff(id, name, role, branches, pin, schedule) {
    const salt = toHex(randomBytes(16));
    return { id, name, role, branches, active: true, salt, pinHash: await this._hashPin(pin, salt), mustChangePin: false, schedule: schedule ?? null, createdAt: this.now() };
  }
  async _seedStaff() {
    const PIN = '482915';
    this.s.demo.pins = { all: PIN };
    const st = this.s.staff;
    st.push(await this._mkStaff('ADM-01', 'Amie Sanneh (Admin)', 'ADMIN', this.s.branches.map((b) => b.id), PIN));
    st.push(await this._mkStaff('TRS-01', 'Lamin Jallow (Treasury)', 'TREASURY', this.s.branches.map((b) => b.id), PIN));
    st.push(await this._mkStaff('CMP-01', 'Fatou Ceesay (Compliance)', 'COMPLIANCE', this.s.branches.map((b) => b.id), PIN));
    const first = ['Musa', 'Isatou', 'Ebrima', 'Mariama', 'Ousman', 'Binta', 'Modou', 'Awa', 'Sulayman', 'Kadi'];
    const last = ['Bah', 'Camara', 'Darboe', 'Jatta', 'Touray', 'Sowe', 'Njie', 'Drammeh', 'Colley', 'Sillah'];
    let i = 0;
    for (const b of this.s.branches) {
      st.push(await this._mkStaff(`${b.id}-S1`, `${first[i % 10]} ${last[(i + 3) % 10]}`, 'SUPERVISOR', [b.id], PIN));
      st.push(await this._mkStaff(`${b.id}-T1`, `${first[(i + 5) % 10]} ${last[i % 10]}`, 'TELLER', [b.id], PIN));
      i++;
    }
  }
  async _seedTransfers() {
    const A = (id) => ({ staffId: id, branchId: this.staffById(id).branches[0], role: this.staffById(id).role, id: 'seed' });
    const mk = async (from, to, amt, ccy, pay, sn, rn, extra = {}) => {
      const actor = A(`${from}-T1`);
      return this._issueCore(actor, {
        destCountry: this.branch(to).country, destBranchId: null, mode: 'send', amountMinor: toMinor(amt, this.cur[ccy].decimals), collectCcy: ccy, payCcy: pay,
        sender: { name: sn, phone: '+4479000' + String(1000 + this.s.counters.tx), idType: 'PASSPORT', idNumber: 'P' + (900000 + this.s.counters.tx), country: this.branch(from).country },
        recipient: { name: rn, phone: '+2203' + String(300000 + this.s.counters.tx), idType: 'NATIONAL_ID', idNumber: 'GM' + (100000 + this.s.counters.tx) },
        purpose: 'FAMILY_SUPPORT', sourceOfFunds: 'SALARY', ...extra
      });
    };
    const demo = this.s.demo.codes;
    const r1 = await mk('GB-LDN', 'GM-SKD', 300, 'GBP', 'GMD', 'Ousman Bah', 'Fatou Jallow');
    demo.push({ ref: r1.ref, pin: r1.pin, note: 'London → Serrekunda, GBP → GMD. Recipient: Fatou Jallow', recipient: 'Fatou Jallow', phone: r1.transfer.recipient.phone, idNumber: r1.transfer.recipient.idNumber });
    const r2 = await mk('CN-GZH', 'SN-DKR', 5000, 'CNY', 'XOF', 'Lamin Ceesay', 'Awa Ndiaye');
    demo.push({ ref: r2.ref, pin: r2.pin, note: 'Guangzhou → Dakar, CNY → XOF. Recipient: Awa Ndiaye', recipient: 'Awa Ndiaye', phone: r2.transfer.recipient.phone, idNumber: r2.transfer.recipient.idNumber });
    const r3 = await mk('GM-SKD', 'GM-BJL', 2000, 'GMD', 'GMD', 'Mariama Touray', 'Kadi Touray');
    demo.push({ ref: r3.ref, pin: r3.pin, note: 'Same-country: Serrekunda → Banjul, GMD → GMD. Recipient: Kadi Touray', recipient: 'Kadi Touray', phone: r3.transfer.recipient.phone, idNumber: r3.transfer.recipient.idNumber });
    const r4 = await mk('AE-DXB', 'ZM-LUN', 800, 'USD', 'ZMW', 'Mulenga Phiri', 'Chanda Phiri');
    demo.push({ ref: r4.ref, pin: r4.pin, note: 'Dubai → Lusaka, USD → ZMW. Recipient: Chanda Phiri', recipient: 'Chanda Phiri', phone: r4.transfer.recipient.phone, idNumber: r4.transfer.recipient.idNumber });
    const paid = await mk('US-NYC', 'GN-CKY', 400, 'USD', 'GNF', 'Aminata Diallo', 'Mamadou Diallo');
    await this._redeemCore(A('GN-CKY-T1'), { ref: paid.ref, pin: paid.pin, recipient: { name: 'Mamadou Diallo', phone: paid.transfer.recipient.phone, idType: 'NATIONAL_ID', idNumber: paid.transfer.recipient.idNumber } }, { skipHours: true });
    await mk('DE-BER', 'GW-BSS', 250, 'EUR', 'XOF', 'Jonas Weber', 'Maria Gomes');
    await mk('GB-MAN', 'ML-BKO', 120, 'GBP', 'XOF', 'Saikou Sanyang', 'Binta Keita');
    // Staged compliance case: PEP recipient triggers a hold
    await mk('GB-LDN', 'GM-BJL', 900, 'GBP', 'GMD', 'Ebrima Jobe', 'Demo Politically Exposed');
    // Attendance history
    for (let d = 1; d <= 5; d++) {
      for (const sid of ['GM-SKD-T1', 'GB-LDN-T1', 'GM-SKD-S1']) {
        const s = this.staffById(sid), c = this.branchCountry(s.branches[0]), day = this.now() - d * DAY;
        const p = localParts(day, c.tz), base = day - p.minutes * 60000;
        const late = (d + sid.length) % 4 === 0 ? 17 : 0;
        const inT = base + (hm('08:30') + late) * 60000, outT = base + (hm('17:30') + (d % 3 === 0 ? 45 : 0)) * 60000;
        if (![6, 7].includes(p.dow)) this.s.attendance.push({ id: ++this.s.counters.att, staffId: sid, branchId: s.branches[0], date: p.date, in: inT, out: outT, outReason: 'LOGOUT', lateMin: Math.max(0, late - this.s.settings.graceMin), overtimeMin: d % 3 === 0 ? 45 : 0, unscheduled: false, edited: false });
      }
    }
  }

  /* ---------- quoting ---------- */
  quote(session, { destCountry, collectCcy, payCcy, mode = 'send', amountMinor }) {
    this.need(session, 'send');
    return this._quote(session.branchId, { destCountry, collectCcy, payCcy, mode, amountMinor }, true);
  }
  _quote(originBranchId, { destCountry, collectCcy, payCcy, mode = 'send', amountMinor }, store) {
    if (!this.country(destCountry)) throw E('BAD_DEST', 'Unknown destination country');
    if (!this.cur[collectCcy] || !this.cur[payCcy]) throw E('BAD_CCY', 'Unknown currency');
    if (!Number.isSafeInteger(amountMinor) || amountMinor <= 0) throw E('BAD_AMOUNT', 'Enter an amount greater than zero');
    const origin = this.branchCountry(originBranchId);
    const domestic = origin.code === destCountry;
    const p = price({ mode, amountMinor, from: collectCcy, to: payCcy, domestic, settings: this.s.settings, cur: this.cur });
    const usd = this.usd(p.principalMinor, collectCcy);
    const out = { ...p, mode, collectCcy, payCcy, destCountry, domestic, usd, originBranchId };
    if (store) {
      const id = `Q${++this.s.counters.q}`;
      out.id = id; out.expiresAt = this.now() + this.s.settings.rateLockMinutes * 60000;
      this.s.quotes[id] = out;
      for (const [k, v] of Object.entries(this.s.quotes)) if (v.expiresAt < this.now() - DAY) delete this.s.quotes[k];
    }
    return out;
  }

  /* ---------- compliance ---------- */
  senderKey(s) { return s.idNumber ? `ID:${String(s.idType).toUpperCase()}:${String(s.idNumber).toUpperCase().replace(/[^0-9A-Z]/g, '')}` : `PH:${digits(s.phone)}`; }
  _kycTier(s, purpose, sof) {
    if (s.idType && s.idNumber && sof && purpose && s.idPhotoRef) return 'C3';
    if (s.idType && s.idNumber) return 'C2';
    return 'C1';
  }
  _history(key, since) {
    return this.s.transfers.filter((t) => t.sender.key === key && t.createdAt >= since && !['CANCELLED', 'REFUNDED'].includes(t.status));
  }
  _screen(name) {
    const hit = (list) => list.map((n) => ({ n, s: nameScore(name, n) })).filter((x) => x.s >= 0.9).sort((a, b) => b.s - a.s)[0];
    return { sanctions: hit(this.s.settings.watchlist), pep: hit(this.s.settings.pepList) };
  }
  _raise(type, severity, detail, transferId = null) {
    const a = { id: `AL${String(++this.s.counters.al).padStart(4, '0')}`, ts: this.now(), type, severity, detail, transferId, status: 'OPEN', resolvedBy: null, note: null };
    this.s.alerts.push(a); return a;
  }
  /** Returns { requiredTier, providedTier, holds:[{type,detail}], block? } or throws for hard limits. */
  _assess({ sender, recipient, purpose, sourceOfFunds, usd }) {
    const st = this.s.settings, T = st.tiers;
    if (usd > st.hardMaxTxUsd) throw E('LIMIT_EXCEEDED', `Single transfers above US$${st.hardMaxTxUsd.toLocaleString()} are not allowed. Split or refer to Compliance.`);
    const key = sender.key, d30 = this._history(key, this.now() - 30 * DAY), d12 = this._history(key, this.now() - 365 * DAY);
    const sum = (a) => a.reduce((x, t) => x + t.usdValue, 0);
    const need = ['C1', 'C2', 'C3'].find((k) => usd <= T[k].perTxUsd && (T[k].per30dUsd == null || sum(d30) + usd <= T[k].per30dUsd) && (T[k].per12mUsd == null || sum(d12) + usd <= T[k].per12mUsd));
    if (!need) throw E('LIMIT_EXCEEDED', 'This sender has reached the rolling limit. Refer to Compliance for enhanced due diligence.');
    const have = this._kycTier(sender, purpose, sourceOfFunds);
    if (['C1', 'C2', 'C3'].indexOf(have) < ['C1', 'C2', 'C3'].indexOf(need)) {
      const what = need === 'C2' ? "the sender's ID type and number" : "ID, ID photo, purpose and source of funds";
      throw E('KYC_REQUIRED', `This amount needs ${need} verification: collect ${what}.`, { neededTier: need, providedTier: have });
    }
    const holds = [], v = st.velocity;
    const h24 = d30.filter((t) => t.createdAt >= this.now() - DAY).length + 1, h7 = d30.filter((t) => t.createdAt >= this.now() - 7 * DAY);
    if (h24 > v.tx24h) holds.push({ type: 'VELOCITY_24H', detail: `${h24} transfers by this sender in 24h (limit ${v.tx24h})` });
    if (h7.length + 1 > v.tx7d) holds.push({ type: 'VELOCITY_7D', detail: `${h7.length + 1} transfers in 7 days (limit ${v.tx7d})` });
    const nearLimit = (t) => t.usdValue >= (T[t.tier]?.perTxUsd ?? T.C1.perTxUsd) * v.structuringPct / 100;
    const near = h7.filter(nearLimit).length + (usd >= T[have].perTxUsd * v.structuringPct / 100 && usd <= T[have].perTxUsd ? 1 : 0);
    if (near >= v.structuringCount) holds.push({ type: 'STRUCTURING', detail: `${near} transfers within ${100 - v.structuringPct}% of the per-transfer limit in 7 days` });
    const rk = digits(recipient.phone), since7 = this.now() - 7 * DAY;
    const sendersToR = new Set(this.s.transfers.filter((t) => digits(t.recipient.phone) === rk && t.createdAt >= since7 && t.status !== 'CANCELLED').map((t) => t.sender.key));
    sendersToR.add(key);
    if (sendersToR.size >= v.m2oSenders7d) holds.push({ type: 'MANY_TO_ONE', detail: `${sendersToR.size} different senders paying one recipient in 7 days` });
    const rcps = new Set(h7.map((t) => digits(t.recipient.phone))); rcps.add(rk);
    if (rcps.size >= v.o2mRecipients7d) holds.push({ type: 'ONE_TO_MANY', detail: `One sender paying ${rcps.size} different recipients in 7 days` });
    if (usd >= st.highValueUsd) holds.push({ type: 'HIGH_VALUE', detail: `Transfer of US$${usd.toFixed(0)} is at or above the high-value threshold` });
    const sc = this._screen(sender.name), rc = this._screen(recipient.name);
    const blocked = sc.sanctions ?? rc.sanctions;
    const pep = sc.pep ?? rc.pep;
    if (pep) holds.push({ type: 'PEP_MATCH', detail: `Possible PEP match: ${pep.n} (${Math.round(pep.s * 100)}%)` });
    return { requiredTier: need, providedTier: have, holds, blocked };
  }

  /* ---------- issuing ---------- */
  _clean(s) { return String(s ?? '').replace(/\s+/g, ' ').trim().slice(0, 120); }
  async issueTransfer(session, params) {
    this.need(session, 'send');
    if (this.s.settings.enforceOperatingHours && FRONT_LINE.includes(session.role)) {
      const o = this.branchOpen(session.branchId); if (!o.open) throw E('OUTSIDE_HOURS', o.reason);
    }
    let cosigner = null;
    const out = await this._issueCore(session, params, async (usd) => {
      if (usd >= this.s.settings.coSignAboveUsd) {
        if (!params.cosign) throw E('COSIGN_REQUIRED', `Transfers of US$${this.s.settings.coSignAboveUsd}+ need a second person to approve`, { needsApprover: true });
        cosigner = await this.verifyApprover(params.cosign.staffId, params.cosign.pin, { notStaffId: session.staffId });
      }
      return cosigner;
    });
    return out;
  }
  async _issueCore(actor, p, cosignFn) {
    const st = this.s.settings, branchId = actor.branchId;
    const sender = { name: this._clean(p.sender?.name), phone: this._clean(p.sender?.phone), idType: p.sender?.idType || '', idNumber: this._clean(p.sender?.idNumber), country: p.sender?.country || '', idPhotoRef: p.sender?.idPhotoRef || '' };
    const recipient = { name: this._clean(p.recipient?.name), phone: this._clean(p.recipient?.phone), idType: p.recipient?.idType || '', idNumber: this._clean(p.recipient?.idNumber) };
    if (sender.name.length < 3 || digits(sender.phone).length < 7) throw E('SENDER_INCOMPLETE', "Sender's full name and a valid phone number are required");
    if (recipient.name.length < 3 || digits(recipient.phone).length < 7) throw E('RECIPIENT_INCOMPLETE', "Recipient's full name and phone number are required — the payer will confirm them");
    if (sender.idType && !ID_TYPES.includes(sender.idType)) throw E('BAD_ID', 'Unknown ID type');
    if (p.destBranchId && this.branch(p.destBranchId)?.country !== p.destCountry) throw E('BAD_DEST', 'Chosen payout branch is not in the destination country');
    if (!this.branch(branchId)?.active) throw E('BRANCH_INACTIVE', 'This branch is not active');
    if (p.destBranchId && !this.branch(p.destBranchId).active) throw E('BRANCH_INACTIVE', 'Chosen payout branch is not active');
    sender.key = this.senderKey(sender);

    let q;
    if (p.quoteId) {
      q = this.s.quotes[p.quoteId];
      if (!q) throw E('QUOTE_UNKNOWN', 'Quote not found — request a new one');
      if (q.expiresAt < this.now()) throw E('QUOTE_EXPIRED', 'Rate lock expired — request a new quote');
      if (q.originBranchId !== branchId || q.destCountry !== p.destCountry || q.collectCcy !== p.collectCcy || q.payCcy !== p.payCcy) throw E('QUOTE_MISMATCH', 'Quote does not match this transfer');
    } else {
      q = this._quote(branchId, { destCountry: p.destCountry, collectCcy: p.collectCcy, payCcy: p.payCcy, mode: p.mode || 'send', amountMinor: p.amountMinor }, false);
    }
    if (q.payoutMinor <= 0 || q.principalMinor <= 0) throw E('BAD_AMOUNT', 'Amount is too small after fees');
    const usd = q.usd;
    const a = this._assess({ sender, recipient, purpose: p.purpose, sourceOfFunds: p.sourceOfFunds, usd });
    if (a.blocked) {
      const al = this._raise('SANCTIONS_BLOCK', 'CRITICAL', `Blocked at ${branchId}: match to "${a.blocked.n}" (${Math.round(a.blocked.s * 100)}%) — sender "${sender.name}" / recipient "${recipient.name}"`);
      await this._audit(actor, 'SANCTIONS_BLOCK', al.detail); this.save();
      throw E('SANCTIONS_MATCH', 'This transfer cannot be processed. Do not tell the customer why; refer to Compliance.', { alertId: al.id });
    }
    let cosigner = null;
    if (cosignFn) cosigner = await cosignFn(usd);
    const ref = newRef(), pin = newPin();
    const tx = {
      id: `TX${String(++this.s.counters.tx).padStart(6, '0')}`, refHash: await this.refHash(ref), refTail: ref.slice(-4), pinHash: await this.pinHashFor(ref, pin), pinAttempts: 0, mismatches: 0, locked: false,
      status: a.holds.length ? 'ON_HOLD' : 'ISSUED', createdAt: this.now(), expiresAt: this.now() + st.codeExpiryDays * DAY,
      originBranchId: branchId, originCountry: this.branchCountry(branchId).code, destCountry: p.destCountry, destBranchId: p.destBranchId || null,
      collectCcy: q.collectCcy, payCcy: q.payCcy, principalMinor: q.principalMinor, feeMinor: q.feeMinor, totalMinor: q.totalMinor, payoutMinor: q.payoutMinor,
      fxMarginMinor: q.fxMarginMinor, payoutAtMidMinor: q.payoutAtMidMinor, rate: q.rate, mid: q.mid, marginBps: q.marginBps, mode: q.mode, domestic: q.domestic, usdValue: usd,
      sender, recipient, purpose: p.purpose || '', sourceOfFunds: p.sourceOfFunds || '', tier: a.providedTier, issuedBy: actor.staffId, cosignedBy: cosigner?.id ?? null,
      holdReasons: a.holds.map((h) => h.type), journalIds: [], refHistory: [], events: [{ ts: this.now(), what: 'ISSUED', by: actor.staffId }]
    };
    const src = q.collectCcy, dst = q.payCcy, id = tx.id, cashA = cashAccount(branchId, src);
    const J = [];
    J.push(this._post({ type: 'COLLECT', ref: id, ccy: src, actor, memo: 'Cash collected', lines: [{ account: cashA, dr: q.totalMinor }, { account: `PAYABLE:${src}`, cr: q.principalMinor }, ...(q.feeMinor ? [{ account: `REV_FEES:${src}`, cr: q.feeMinor }] : [])] }));
    if (src !== dst) {
      J.push(this._post({ type: 'FX_SELL', ref: id, ccy: src, actor, memo: `Sell ${src}`, lines: [{ account: `PAYABLE:${src}`, dr: q.principalMinor }, { account: `FX_POS:${src}`, cr: q.principalMinor }] }));
      const margin = q.payoutAtMidMinor - q.payoutMinor;
      J.push(this._post({ type: 'FX_BUY', ref: id, ccy: dst, actor, memo: `Buy ${dst}`, lines: [{ account: `FX_POS:${dst}`, dr: q.payoutAtMidMinor }, { account: `PAYABLE:${dst}`, cr: q.payoutMinor }, ...(margin ? [{ account: `REV_FX:${dst}`, cr: margin }] : [])] }));
    }
    tx.journalIds = J.map((j) => j.id);
    this.s.transfers.push(tx);
    for (const h of a.holds) this._raise(h.type, h.type === 'PEP_MATCH' || h.type === 'STRUCTURING' ? 'HIGH' : 'MEDIUM', `${tx.id}: ${h.detail}`, tx.id);
    this._notify(tx.sender.phone, `Bantaba: we received ${this.fmt(q.totalMinor, src)}. Your recipient will be paid ${this.fmt(q.payoutMinor, dst)}. Share the code and PIN with them directly. Ref ${tx.id}.`);
    this.save();
    await this._audit(actor, 'TRANSFER_ISSUED', `${tx.id} ${this.fmt(q.totalMinor, src)}→${this.fmt(q.payoutMinor, dst)} ${tx.originCountry}→${tx.destCountry}${a.holds.length ? ' ON HOLD: ' + tx.holdReasons.join(',') : ''}`);
    return { ref, pin, transfer: this.view(tx), held: a.holds.length > 0, holds: a.holds };
  }
  _notify(to, text) { this.s.notifications.push({ id: ++this.s.counters.n, ts: this.now(), to, text }); if (this.s.notifications.length > 500) this.s.notifications.shift(); }

  view(t) {
    const { pinHash, refHash, refHistory, ...rest } = t;
    return { ...rest, refMask: `BNT-••••-••${t.refTail.slice(-2)}`, retiredCodes: refHistory.length };
  }

  /* ---------- redeeming ---------- */
  async lookup(session, input) {
    this.need(session, 'payout');
    const fails = (this.s.lookupFails[session.staffId] ??= []);
    const cut = this.now() - 3600000;
    while (fails.length && fails[0] < cut) fails.shift();
    const maxF = this.s.settings.maxLookupFailsPerHour ?? 5;
    if (fails.length >= maxF) throw E('LOOKUP_LIMIT', 'Too many unknown codes in the last hour. Ask a supervisor.');
    const f = await this.findByRef(input);
    if (!f.t) {
      fails.push(this.now()); this.save();
      await this._audit(session, 'LOOKUP_FAILED', 'Unknown code entered');
      throw E(f.ref ? 'CODE_UNKNOWN' : 'CODE_FORMAT', f.ref ? 'No such code. Check it with the customer.' : 'Codes look like BNT-XXXX-XXXX');
    }
    const t = f.t;
    if (f.retired) throw E('CODE_RETIRED', 'This code was replaced by a newer one. Ask the customer for the new code.');
    const reason = this._payBlock(t, session.branchId);
    const rc = this.country(t.destCountry);
    return { id: t.id, status: t.status, canPay: !reason, blockReason: reason, destCountry: t.destCountry, destCountryName: rc.name, payoutMinor: t.payoutMinor, payCcy: t.payCcy, payoutText: this.fmt(t.payoutMinor, t.payCcy), senderMasked: maskName(t.sender.name), recipientHint: maskName(t.recipient.name), expiresAt: t.expiresAt, attemptsLeft: this.s.settings.maxPinAttempts - t.pinAttempts, requiresId: t.usdValue >= this.s.settings.idPhotoAboveUsd };
  }
  _payBlock(t, branchId) {
    const msg = { PAID: 'Already paid out. This code is cancelled.', CANCELLED: 'This transfer was cancelled.', REFUNDED: 'This transfer was refunded.', EXPIRED: 'This code has expired.', ON_HOLD: 'On compliance hold — do not pay. Refer to a supervisor.' }[t.status];
    if (msg) return msg;
    if (t.locked) return 'Locked after too many wrong attempts. A supervisor must unlock it.';
    if (t.expiresAt < this.now()) return 'This code has expired.';
    const b = this.branch(branchId);
    if (!b?.active) return 'This branch is not active';
    if (b.country !== t.destCountry) return `This transfer is payable in ${this.country(t.destCountry).name} only`;
    if (t.destBranchId && t.destBranchId !== branchId) return `This transfer is payable at ${this.branch(t.destBranchId).name} only`;
    return '';
  }
  recipientCheck(t, given) {
    const nameS = nameScore(t.recipient.name, given.name || '');
    const phoneOk = digits(t.recipient.phone) ? phoneMatch(t.recipient.phone, given.phone || '') : true;
    const idStored = t.recipient.idNumber ? String(t.recipient.idNumber).toUpperCase().replace(/[^0-9A-Z]/g, '') : '';
    const idGiven = String(given.idNumber ?? '').toUpperCase().replace(/[^0-9A-Z]/g, '');
    const idOk = idStored ? idStored === idGiven : true;
    const { nameMatchPass: P, nameMatchReview: R } = this.s.settings;
    let verdict = 'FAIL';
    if (phoneOk && idOk && nameS >= P) verdict = 'PASS';
    else if (phoneOk && idOk && nameS >= R) verdict = 'REVIEW';
    return { verdict, nameScore: Math.round(nameS * 100) / 100, phoneOk, idOk };
  }
  async redeem(session, p) {
    this.need(session, 'payout');
    return this._redeemCore(session, p, {});
  }
  async _redeemCore(actor, { ref, pin, recipient = {}, idPhotoRef, approver }, { skipHours = false } = {}) {
    const st = this.s.settings;
    if (!skipHours && st.enforceOperatingHours && FRONT_LINE.includes(actor.role)) { const o = this.branchOpen(actor.branchId); if (!o.open) throw E('OUTSIDE_HOURS', o.reason); }
    const f = await this.findByRef(ref);
    if (!f.t || f.retired) throw E('CODE_UNKNOWN', 'No such code');
    const t = f.t, blk = this._payBlock(t, actor.branchId);
    if (blk) throw E('CANNOT_PAY', blk);
    if (!st.allowSelfRedeem && t.issuedBy === actor.staffId) throw E('SELF_REDEEM', 'The person who issued this transfer cannot pay it out');
    if (!/^\d{6}$/.test(String(pin ?? ''))) throw E('PIN_FORMAT', 'The Release PIN is 6 digits');
    const wrong = async (kind, msg) => {
      if (kind === 'PIN') t.pinAttempts++; else t.mismatches++;
      const total = t.pinAttempts + t.mismatches;
      if (total >= st.maxPinAttempts) {
        t.locked = true;
        this._raise('CODE_LOCKED', 'HIGH', `${t.id} locked after ${t.pinAttempts} wrong PIN and ${t.mismatches} recipient mismatches at ${actor.branchId}`, t.id);
      }
      t.events.push({ ts: this.now(), what: `BAD_${kind}`, by: actor.staffId }); this.save();
      await this._audit(actor, `REDEEM_${kind}_FAIL`, `${t.id} ${msg}${t.locked ? ' — LOCKED' : ''}`);
      throw E(t.locked ? 'LOCKED' : kind === 'PIN' ? 'PIN_WRONG' : 'RECIPIENT_MISMATCH', t.locked ? 'Too many failed attempts. This transfer is locked — a supervisor must unlock it.' : msg, { attemptsLeft: st.maxPinAttempts - total });
    };
    if (!safeEqual(await this.pinHashFor(f.ref, pin), t.pinHash ?? '')) await wrong('PIN', 'Release PIN incorrect');
    const chk = this.recipientCheck(t, recipient);
    if (t.usdValue >= st.idPhotoAboveUsd && (!recipient.idType || !recipient.idNumber)) throw E('ID_REQUIRED', `Record the recipient's ID type and number (transfers of US$${st.idPhotoAboveUsd}+)`);
    let approvedBy = null;
    if (chk.verdict === 'FAIL') await wrong('RECIPIENT', `Recipient details do not match (${!chk.phoneOk ? 'phone ' : ''}${!chk.idOk ? 'ID ' : ''}${chk.nameScore < st.nameMatchReview ? 'name' : ''}`.trim().replace(/ $/, '') + '). Do not pay.');
    if (chk.verdict === 'REVIEW') {
      if (!approver) throw E('APPROVAL_REQUIRED', 'Name is close but not exact. A supervisor must confirm the recipient in person.', { needsApprover: true, check: chk });
      approvedBy = (await this.verifyApprover(approver.staffId, approver.pin, { notStaffId: actor.staffId })).id;
    }
    const cash = this.cash(actor.branchId, t.payCcy);
    if (cash < t.payoutMinor) {
      this._raise('LOW_FLOAT', 'MEDIUM', `${actor.branchId} cannot pay ${t.id}: ${this.fmt(cash, t.payCcy)} on hand, needs ${this.fmt(t.payoutMinor, t.payCcy)}`);
      this.save();
      throw E('INSUFFICIENT_FLOAT', `Not enough ${t.payCcy} cash in this branch (${this.fmt(cash, t.payCcy)}). Ask Treasury for float.`);
    }
    const ccy = t.payCcy, b = this.branch(actor.branchId);
    const lines = [{ account: `PAYABLE:${ccy}`, dr: t.payoutMinor }, { account: cashAccount(actor.branchId, ccy), cr: t.payoutMinor }];
    const J = [this._post({ type: 'PAYOUT', ref: t.id, ccy, actor, memo: 'Cash paid to recipient', lines })];
    if (b.type === 'AGENT' && b.commissionBps) {
      const c = Math.round(t.payoutMinor * b.commissionBps / 10000);
      if (c > 0) J.push(this._post({ type: 'COMMISSION', ref: t.id, ccy, actor, memo: `Agent commission ${b.commissionBps}bps`, lines: [{ account: `EXP_COMM:${ccy}`, dr: c }, { account: `COMM_PAYABLE:${actor.branchId}:${ccy}`, cr: c }] }));
    }
    t.journalIds.push(...J.map((j) => j.id));
    t.status = 'PAID'; t.pinHash = null; // nullified: code can never be used again
    t.paid = { ts: this.now(), by: actor.staffId, branchId: actor.branchId, recipient: { name: this._clean(recipient.name), phone: this._clean(recipient.phone), idType: recipient.idType || '', idNumber: this._clean(recipient.idNumber) }, check: chk, approvedBy, idPhotoRef: idPhotoRef || '' };
    t.events.push({ ts: this.now(), what: 'PAID', by: actor.staffId });
    this._notify(t.sender.phone, `Bantaba: ${t.id} has been paid out to your recipient. Thank you.`);
    this._notify(t.recipient.phone, `Bantaba: you received ${this.fmt(t.payoutMinor, ccy)}. Thank you.`);
    this.save();
    await this._audit(actor, 'TRANSFER_PAID', `${t.id} ${this.fmt(t.payoutMinor, ccy)} at ${actor.branchId}, match ${chk.verdict} (${chk.nameScore})${approvedBy ? ', approved by ' + approvedBy : ''}`);
    return { transfer: this.view(t), check: chk };
  }

  /* ---------- manage transfers ---------- */
  _tx(id) { const t = this.s.transfers.find((x) => x.id === id); if (!t) throw E('NOT_FOUND', 'Transfer not found'); return t; }
  async unlock(session, id, note = '') {
    this.need(session, 'transfers.manage'); const t = this._tx(id);
    if (!t.locked) throw E('NOT_LOCKED', 'Transfer is not locked');
    t.locked = false; t.pinAttempts = 0; t.mismatches = 0; t.events.push({ ts: this.now(), what: 'UNLOCKED', by: session.staffId }); this.save();
    await this._audit(session, 'TRANSFER_UNLOCKED', `${id} ${note}`);
  }
  async reissue(session, id, note = '') {
    this.need(session, 'transfers.manage'); const t = this._tx(id);
    if (!['ISSUED', 'EXPIRED'].includes(t.status) && !t.locked) throw E('CANNOT_REISSUE', 'Only active, locked or expired transfers can get a new code');
    const ref = newRef(), pin = newPin();
    t.refHistory.push({ hash: t.refHash, retiredAt: this.now(), by: session.staffId });
    t.refHash = await this.refHash(ref); t.refTail = ref.slice(-4); t.pinHash = await this.pinHashFor(ref, pin);
    t.pinAttempts = 0; t.mismatches = 0; t.locked = false;
    if (t.status === 'EXPIRED') { t.status = 'ISSUED'; t.expiresAt = this.now() + this.s.settings.codeExpiryDays * DAY; }
    t.events.push({ ts: this.now(), what: 'REISSUED', by: session.staffId }); this.save();
    await this._audit(session, 'TRANSFER_REISSUED', `${id} old code retired. ${note}`);
    return { ref, pin, transfer: this.view(t) };
  }
  async cancel(session, id, { reason, refundFee = false } = {}) {
    this.need(session, 'transfers.manage'); const t = this._tx(id);
    if (!reason) throw E('REASON_REQUIRED', 'Give a reason for the cancellation');
    return this._refund(session, t, { reason, refundFee, status: 'CANCELLED' });
  }
  async _refund(actor, t, { reason, refundFee, status }) {
    if (!['ISSUED', 'ON_HOLD', 'EXPIRED'].includes(t.status)) throw E('CANNOT_CANCEL', `A ${t.status.toLowerCase()} transfer cannot be cancelled`);
    const src = t.collectCcy, dst = t.payCcy, id = t.id, amt = t.principalMinor + (refundFee ? t.feeMinor : 0);
    if (this.cash(actor.branchId, src) < amt) throw E('INSUFFICIENT_FLOAT', `Not enough ${src} cash at this branch to refund`);
    if (src !== dst) {
      const margin = t.payoutAtMidMinor - t.payoutMinor;
      this._post({ type: 'FX_BUY_REV', ref: id, ccy: dst, actor, memo: 'Reverse FX buy', lines: [{ account: `PAYABLE:${dst}`, dr: t.payoutMinor }, ...(margin ? [{ account: `REV_FX:${dst}`, dr: margin }] : []), { account: `FX_POS:${dst}`, cr: t.payoutAtMidMinor }] });
      this._post({ type: 'FX_SELL_REV', ref: id, ccy: src, actor, memo: 'Reverse FX sell', lines: [{ account: `FX_POS:${src}`, dr: t.principalMinor }, { account: `PAYABLE:${src}`, cr: t.principalMinor }] });
    } else {
      // same currency: payable already in src
    }
    this._post({ type: 'REFUND', ref: id, ccy: src, actor, memo: `Refund to sender (${reason})`, lines: [{ account: `PAYABLE:${src}`, dr: t.principalMinor }, ...(refundFee && t.feeMinor ? [{ account: `REV_FEES:${src}`, dr: t.feeMinor }] : []), { account: cashAccount(actor.branchId, src), cr: amt }] });
    t.status = status; t.pinHash = null; t.cancel = { ts: this.now(), by: actor.staffId, reason, refundFee, refundMinor: amt, branchId: actor.branchId };
    t.events.push({ ts: this.now(), what: status, by: actor.staffId });
    for (const a of this.s.alerts) if (a.transferId === t.id && a.status === 'OPEN') { a.status = 'CLOSED'; a.note = 'Transfer ' + status.toLowerCase(); }
    this._notify(t.sender.phone, `Bantaba: ${t.id} was cancelled. ${this.fmt(amt, src)} refunded.`);
    this.save();
    await this._audit(actor, `TRANSFER_${status}`, `${id} refund ${this.fmt(amt, src)}: ${reason}`);
    return this.view(t);
  }
  expireDue() {
    let n = 0;
    for (const t of this.s.transfers) if (t.status === 'ISSUED' && t.expiresAt < this.now()) { t.status = 'EXPIRED'; t.events.push({ ts: this.now(), what: 'EXPIRED', by: 'SYSTEM' }); n++; }
    if (n) this.save();
    return n;
  }
  listTransfers(session, { status, q, limit = 200 } = {}) {
    this.need(session, 'transfers.view');
    const needle = String(q ?? '').toLowerCase();
    return this.s.transfers.filter((t) => {
      if (session.role === 'TELLER' && t.originBranchId !== session.branchId && t.destCountry !== this.branchCountry(session.branchId).code) return false;
      if (status && t.status !== status) return false;
      return !needle || [t.id, t.sender.name, t.recipient.name, t.refTail].some((x) => String(x).toLowerCase().includes(needle));
    }).slice().reverse().slice(0, limit).map((t) => this.view(t));
  }

  /* ---------- compliance alerts ---------- */
  listAlerts(session, { status } = {}) {
    this.need(session, 'compliance.view');
    return this.s.alerts.filter((a) => !status || a.status === status).slice().reverse();
  }
  async resolveAlert(session, id, action, note) {
    this.need(session, 'compliance.resolve');
    const a = this.s.alerts.find((x) => x.id === id);
    if (!a) throw E('NOT_FOUND', 'Alert not found');
    if (a.status !== 'OPEN') throw E('ALREADY_RESOLVED', 'Alert already resolved');
    if (!note) throw E('NOTE_REQUIRED', 'A note is required');
    const t = a.transferId ? this._tx(a.transferId) : null;
    if (action === 'REJECT') {
      if (t && ['ON_HOLD', 'ISSUED'].includes(t.status)) {
        if (!(this.cash(session.branchId, t.collectCcy) >= t.principalMinor)) {
          // Compliance refunds from the originating branch's books
        }
        await this._refund({ ...session, branchId: t.originBranchId, staffId: session.staffId }, t, { reason: `Compliance: ${note}`, refundFee: false, status: 'CANCELLED' });
      }
      a.status = 'REJECTED';
    } else if (action === 'CLEAR') {
      a.status = 'CLEARED';
      if (t && t.status === 'ON_HOLD' && !this.s.alerts.some((x) => x.transferId === t.id && x.status === 'OPEN' && x !== a)) {
        t.status = 'ISSUED'; t.events.push({ ts: this.now(), what: 'HOLD_RELEASED', by: session.staffId });
      }
    } else throw E('BAD_ACTION', 'Action must be CLEAR or REJECT');
    a.resolvedBy = session.staffId; a.note = note; a.resolvedAt = this.now(); this.save();
    await this._audit(session, 'ALERT_' + a.status, `${id} ${note}`);
    return a;
  }

  /* ---------- treasury ---------- */
  async injectFloat(session, branchId, ccy, amountMinor, memo = '') {
    this.need(session, 'vault.inject');
    if (!this.branch(branchId) || !this.cur[ccy] || !Number.isSafeInteger(amountMinor) || amountMinor <= 0) throw E('BAD_INPUT', 'Branch, currency and a positive amount are required');
    this._post({ type: 'FLOAT_IN', ref: branchId, ccy, actor: session, memo: memo || 'Float injection', lines: [{ account: cashAccount(branchId, ccy), dr: amountMinor }, { account: `HQ_FUNDING:${ccy}`, cr: amountMinor }] });
    this.save(); await this._audit(session, 'FLOAT_INJECT', `${branchId} +${this.fmt(amountMinor, ccy)} ${memo}`);
  }
  async moveCash(session, fromId, toId, ccy, amountMinor) {
    this.need(session, 'vault.move');
    if (session.role === 'SUPERVISOR' && fromId !== session.branchId) throw E('FORBIDDEN', 'Supervisors can only move cash out of their own branch');
    if (!this.branch(fromId) || !this.branch(toId) || fromId === toId || !Number.isSafeInteger(amountMinor) || amountMinor <= 0) throw E('BAD_INPUT', 'Choose two different branches and a positive amount');
    if (this.cash(fromId, ccy) < amountMinor) throw E('INSUFFICIENT_FLOAT', 'Not enough cash at the source branch');
    this._post({ type: 'CASH_MOVE', ref: `${fromId}>${toId}`, ccy, actor: session, memo: 'Cash movement', lines: [{ account: cashAccount(toId, ccy), dr: amountMinor }, { account: cashAccount(fromId, ccy), cr: amountMinor }] });
    this.save(); await this._audit(session, 'CASH_MOVE', `${fromId}→${toId} ${this.fmt(amountMinor, ccy)}`);
  }
  async closeDay(session, counts, approver) {
    this.need(session, 'vault.close');
    const branchId = session.branchId, rows = [];
    let over = false;
    for (const [ccy, counted] of Object.entries(counts)) {
      const book = this.cash(branchId, ccy), variance = counted - book, vUsd = Math.abs(this.usd(variance, ccy));
      rows.push({ ccy, book, counted, variance, vUsd }); if (vUsd > this.s.settings.varianceToleranceUsd) over = true;
    }
    let approvedBy = null;
    if (over) {
      if (!approver) throw E('VARIANCE_APPROVAL', 'Variance is above tolerance. A second approver must sign off.', { needsApprover: true, rows });
      approvedBy = (await this.verifyApprover(approver.staffId, approver.pin, { notStaffId: session.staffId, minRoles: ['SUPERVISOR', 'ADMIN', 'TREASURY'] })).id;
    }
    for (const r of rows) {
      if (!r.variance) continue;
      const lines = r.variance < 0 ? [{ account: `SUSPENSE_VARIANCE:${r.ccy}`, dr: -r.variance }, { account: cashAccount(branchId, r.ccy), cr: -r.variance }] : [{ account: cashAccount(branchId, r.ccy), dr: r.variance }, { account: `SUSPENSE_VARIANCE:${r.ccy}`, cr: r.variance }];
      this._post({ type: 'VARIANCE', ref: branchId, ccy: r.ccy, actor: session, memo: 'End-of-day cash variance', lines });
      if (r.vUsd > this.s.settings.varianceToleranceUsd) this._raise('CASH_VARIANCE', 'MEDIUM', `${branchId} ${r.ccy} variance ${this.fmt(r.variance, r.ccy)}`);
    }
    const rec = { id: this.s.dayCloses.length + 1, ts: this.now(), branchId, by: session.staffId, approvedBy, rows };
    this.s.dayCloses.push(rec); this.save();
    await this._audit(session, 'DAY_CLOSE', `${branchId} ${rows.map((r) => `${r.ccy} var ${r.variance}`).join(', ')}`);
    return rec;
  }

  /* ---------- admin ---------- */
  async updateSettings(session, patch) {
    this.need(session, 'admin');
    const st = this.s.settings, changed = [];
    for (const [k, v] of Object.entries(patch)) {
      if (!(k in st)) throw E('BAD_SETTING', `Unknown setting ${k}`);
      if (typeof st[k] === 'number' && (typeof v !== 'number' || !Number.isFinite(v) || v < 0)) throw E('BAD_SETTING', `${k} must be a non-negative number`);
      if (typeof st[k] === 'boolean' && typeof v !== 'boolean') throw E('BAD_SETTING', `${k} must be true/false`);
      if (JSON.stringify(st[k]) !== JSON.stringify(v)) { changed.push(`${k}: ${JSON.stringify(st[k])} → ${JSON.stringify(v)}`); st[k] = v; }
    }
    if (st.nameMatchReview > st.nameMatchPass) throw E('BAD_SETTING', 'Review threshold cannot be above pass threshold');
    this.save(); if (changed.length) await this._audit(session, 'SETTINGS_CHANGED', changed.join('; '));
  }
  async setRate(session, code, perUsd) {
    this.need(session, 'rates.edit');
    const c = this.cur[code];
    if (!c) throw E('BAD_CCY', 'Unknown currency');
    if (!(perUsd > 0) || !Number.isFinite(perUsd)) throw E('BAD_RATE', 'Rate must be greater than zero');
    const old = c.perUsd; c.perUsd = perUsd; this.save();
    await this._audit(session, 'RATE_CHANGED', `${code} per USD ${old} → ${perUsd}`);
  }
  async upsertCurrency(session, { code, name, symbol, decimals, perUsd }) {
    this.need(session, 'admin');
    code = String(code ?? '').toUpperCase();
    if (!/^[A-Z]{3}$/.test(code)) throw E('BAD_CCY', 'Currency code must be 3 letters (ISO 4217)');
    if (![0, 2, 3].includes(decimals) || !(perUsd > 0)) throw E('BAD_CCY', 'Decimals must be 0, 2 or 3 and the rate above zero');
    const ex = this.s.currencies.find((c) => c.code === code);
    if (ex) Object.assign(ex, { name, symbol, decimals: ex.decimals, perUsd }); else this.s.currencies.push({ code, name, symbol: symbol || code, decimals, perUsd });
    this.save(); await this._audit(session, ex ? 'CURRENCY_UPDATED' : 'CURRENCY_ADDED', `${code} ${name}`);
  }
  async upsertCountry(session, { code, name, currency, tz, dial, lang = 'en' }) {
    this.need(session, 'admin');
    code = String(code ?? '').toUpperCase();
    if (!/^[A-Z]{2}$/.test(code) || !this.cur[currency]) throw E('BAD_COUNTRY', 'Use a 2-letter country code and an existing currency');
    try { new Intl.DateTimeFormat('en', { timeZone: tz }); } catch { throw E('BAD_COUNTRY', 'Unknown timezone (use an IANA name such as Africa/Lusaka)'); }
    const ex = this.s.countries.find((c) => c.code === code);
    if (ex) Object.assign(ex, { name, currency, tz, dial, lang }); else this.s.countries.push({ code, name, currency, tz, dial, lang });
    this.save(); await this._audit(session, ex ? 'COUNTRY_UPDATED' : 'COUNTRY_ADDED', `${code} ${name}`);
  }
  async upsertBranch(session, b) {
    this.need(session, 'admin');
    const id = String(b.id ?? '').toUpperCase();
    if (!/^[A-Z]{2}-[A-Z0-9]{2,5}$/.test(id) || id.slice(0, 2) !== b.country || !this.country(b.country)) throw E('BAD_BRANCH', 'ID must look like GM-SKD (country code, dash, 2–5 letters) and match the country');
    const hours = b.hours ?? { open: '08:30', close: '17:30', days: [1, 2, 3, 4, 5, 6] };
    if (hm(hours.open) >= hm(hours.close)) throw E('BAD_BRANCH', 'Opening time must be before closing time');
    const ex = this.branch(id);
    const rec = { id, country: b.country, name: this._clean(b.name), city: this._clean(b.city), type: b.type === 'AGENT' ? 'AGENT' : 'OWN', commissionBps: Math.max(0, Math.min(500, Math.round(b.commissionBps ?? 0))), active: b.active !== false, hours };
    if (ex) Object.assign(ex, rec); else this.s.branches.push(rec);
    this.save(); await this._audit(session, ex ? 'BRANCH_UPDATED' : 'BRANCH_ADDED', `${id} ${rec.name}`);
  }
  async setBranchActive(session, id, active) {
    this.need(session, 'admin'); const b = this.branch(id);
    if (!b) throw E('NOT_FOUND', 'Branch not found');
    if (!active && this.onShift().some((a) => a.branchId === id)) throw E('BRANCH_BUSY', 'Staff are signed in at this branch');
    b.active = active; this.save(); await this._audit(session, active ? 'BRANCH_ENABLED' : 'BRANCH_DISABLED', id);
  }
  async upsertStaff(session, { id, name, role, branches, pin, schedule }) {
    this.need(session, 'admin');
    id = String(id ?? '').trim().toUpperCase();
    if (!/^[A-Z0-9-]{3,16}$/.test(id) || !ROLES.includes(role) || this._clean(name).length < 3) throw E('BAD_STAFF', 'Give an ID (3–16 letters/digits), a name and a valid role');
    for (const b of branches ?? []) if (!this.branch(b)) throw E('BAD_STAFF', `Unknown branch ${b}`);
    if (!(branches ?? []).length) throw E('BAD_STAFF', 'Assign at least one branch');
    const ex = this.staffById(id);
    if (!ex && !/^\d{6}$/.test(pin ?? '')) throw E('BAD_STAFF', 'New staff need a 6-digit starting PIN');
    if (ex && ex.role === 'ADMIN' && role !== 'ADMIN' && this.s.staff.filter((x) => x.role === 'ADMIN' && x.active).length <= 1) throw E('LAST_ADMIN', 'Cannot demote the last administrator');
    if (schedule && (hm(schedule.start) >= hm(schedule.end) || !schedule.days?.length)) throw E('BAD_STAFF', 'Schedule start must be before end, with at least one day');
    if (ex) { Object.assign(ex, { name: this._clean(name), role, branches, schedule: schedule ?? ex.schedule }); if (pin) { ex.salt = toHex(randomBytes(16)); ex.pinHash = await this._hashPin(pin, ex.salt); ex.mustChangePin = true; } }
    else { const s = await this._mkStaff(id, this._clean(name), role, branches, pin, schedule); s.mustChangePin = true; this.s.staff.push(s); }
    this.save(); await this._audit(session, ex ? 'STAFF_UPDATED' : 'STAFF_ADDED', `${id} ${role} @ ${branches.join(',')}`);
  }
  async setStaffActive(session, id, active) {
    this.need(session, 'admin'); const st = this.staffById(id);
    if (!st) throw E('NOT_FOUND', 'Staff not found');
    if (id === session.staffId && !active) throw E('SELF_DEACTIVATE', 'You cannot deactivate yourself');
    if (!active && st.role === 'ADMIN' && this.s.staff.filter((x) => x.role === 'ADMIN' && x.active).length <= 1) throw E('LAST_ADMIN', 'Cannot deactivate the last administrator');
    st.active = active;
    if (!active) for (const [sid, s] of this.sessions) if (s.staffId === id) this._closeSession(s, 'DEACTIVATED');
    this.save(); await this._audit(session, active ? 'STAFF_ENABLED' : 'STAFF_REMOVED', id);
  }

  /* ---------- reports ---------- */
  report(session, { from = 0, to = this.now() + 1 } = {}) {
    this.need(session, 'reports.view');
    const ts = this.s.transfers.filter((t) => t.createdAt >= from && t.createdAt < to);
    const live = ts.filter((t) => !['CANCELLED', 'REFUNDED'].includes(t.status));
    const by = (key) => {
      const m = {};
      for (const t of live) { const k = key(t); const r = (m[k] ??= { key: k, count: 0, usd: 0, feesUsd: 0, fxUsd: 0 }); r.count++; r.usd += t.usdValue; r.feesUsd += this.usd(t.feeMinor, t.collectCcy); r.fxUsd += this.usd(t.payoutAtMidMinor - t.payoutMinor, t.payCcy); }
      return Object.values(m).sort((a, b) => b.usd - a.usd);
    };
    const status = {}; for (const t of ts) status[t.status] = (status[t.status] ?? 0) + 1;
    return {
      count: ts.length, status, volumeUsd: live.reduce((a, t) => a + t.usdValue, 0),
      feesUsd: live.reduce((a, t) => a + this.usd(t.feeMinor, t.collectCcy), 0), fxUsd: live.reduce((a, t) => a + this.usd(t.payoutAtMidMinor - t.payoutMinor, t.payCcy), 0),
      corridors: by((t) => `${t.originCountry}→${t.destCountry}`), branches: by((t) => t.originBranchId), currencies: by((t) => `${t.collectCcy}→${t.payCcy}`),
      liabilityUsd: this.s.transfers.filter((t) => ['ISSUED', 'ON_HOLD', 'EXPIRED'].includes(t.status)).reduce((a, t) => a + this.usd(t.payoutMinor, t.payCcy), 0)
    };
  }
  floatTable(session) {
    this.need(session, 'vault.view');
    const rows = [];
    for (const b of this.s.branches) {
      if (session.role === 'TELLER' && b.id !== session.branchId) continue;
      const cash = this.branchCash(b.id);
      const ccys = new Set([this.country(b.country).currency, ...Object.keys(cash)]);
      for (const c of ccys) { const v = cash[c] ?? 0; rows.push({ branchId: b.id, branch: b.name, ccy: c, minor: v, low: v < this.lowFloatMinor(c) }); }
    }
    return rows;
  }
}
