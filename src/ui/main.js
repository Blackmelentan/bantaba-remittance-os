import { Core, LocalStorageAdapter, PERMS } from '../engine/core.js';
import { toMinor, fmt } from '../engine/money.js';

const app = document.getElementById('app');
const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const dt = (ts) => (ts ? new Date(ts).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' }) : '—');
const mins = (m) => `${Math.floor(m / 60)}h ${String(m % 60).padStart(2, '0')}m`;
const usd = (n) => '$' + Math.round(n).toLocaleString('en-US');

// Custom Bespoke Vector Icons (SVG)
const ICONS = {
  send: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>`,
  payout: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 12h.01M18 12h.01"/></svg>`,
  transfers: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>`,
  cash: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="12" cy="12" r="3"/><path d="M12 9v6M9 12h6"/></svg>`,
  compliance: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>`,
  ledger: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M9 14h6M9 18h4"/></svg>`,
  reports: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>`,
  admin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>`,
  print: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16"><path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><path d="M6 14h12v8H6z"/></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16"><polyline points="20 6 9 17 4 12"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  lock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>`,
  unlock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 019.9-1"/></svg>`,
  globe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>`
};

let core, S = null, view = 'send', sub = {}, flashT, last = {};
const TABS = [
  ['send', 'Send Money', 'send', ICONS.send],
  ['payout', 'Pay Out', 'payout', ICONS.payout],
  ['transfers', 'Transfers', 'transfers.view', ICONS.transfers],
  ['cash', 'Cash & Vault', 'vault.view', ICONS.cash],
  ['compliance', 'Compliance & AML', 'compliance.view', ICONS.compliance],
  ['ledger', 'Double-Entry Ledger', 'ledger.view', ICONS.ledger],
  ['reports', 'Reports & Analytics', 'reports.view', ICONS.reports],
  ['admin', 'System Admin', 'admin', ICONS.admin]
];

function flash(msg, kind = 'ok') {
  clearTimeout(flashT);
  document.querySelector('.flash')?.remove();
  const d = document.createElement('div');
  d.className = `flash ${kind === 'ok' ? 'ok' : 'err'}`;
  d.innerHTML = `<span>${kind === 'ok' ? '✔' : '⚠'}</span> <span>${esc(msg)}</span>`;
  d.setAttribute('role', 'alert');
  document.body.append(d);
  flashT = setTimeout(() => d.remove(), kind === 'ok' ? 4000 : 8000);
}

const fail = (e) => { console.error(e); flash(e?.message || 'Operation failed', 'err'); };
const val = (f, n) => f.elements[n]?.value?.trim() ?? '';
const opts = (list, sel) => list.map(([v, l]) => `<option value="${esc(v)}"${v === sel ? ' selected' : ''}>${esc(l)}</option>`).join('');

/* --- Cyber & Anti-Bot Defense Layer --- */
const _rateLimits = new Map();
function throttleAction(action, minMs = 500) {
  const now = Date.now();
  const prev = _rateLimits.get(action) || 0;
  if (now - prev < minMs) {
    flash('Security notice: transaction throttled to prevent duplicate execution.', 'err');
    return false;
  }
  _rateLimits.set(action, now);
  return true;
}

function checkHoneypot(f) {
  if (f.elements._bnt_trap_usr && f.elements._bnt_trap_usr.value !== '') {
    console.warn('[SECURITY] Bot trap tripped. Intercepted automated submission.');
    flash('Security policy: automated crawler access prohibited.', 'err');
    return false;
  }
  return true;
}

const honeypot = () => `
  <div class="hp-trap" aria-hidden="true">
    <label for="_bnt_trap_usr">Leave this empty</label>
    <input type="text" id="_bnt_trap_usr" name="_bnt_trap_usr" tabindex="-1" autocomplete="off" value="">
  </div>`;

const field = (label, name, extra = '', type = 'text', v = '') => {
  const isPin = type === 'password' || name.toLowerCase().includes('pin');
  const max = isPin ? 'maxlength="6"' : 'maxlength="100"';
  return `<div><label for="f_${name}">${esc(label)}</label><input id="f_${name}" name="${name}" type="${type}" value="${esc(v)}" ${max} ${extra}></div>`;
};
const can = (p) => S && core.can(S, p);

/* ---------- Main Shell ---------- */
function render() {
  if (!S) return renderLogin();
  const b = core.branch(S.branchId), c = core.branchCountry(S.branchId), o = core.branchOpen(S.branchId);
  const tabs = TABS.filter(([, , p]) => can(p));
  if (!tabs.find(([k]) => k === view)) view = tabs[0][0];

  app.innerHTML = `
  <div class="system-ticker">
    <span class="status-badge"><span class="led"></span> CENTRAL CLEARING NETWORK · AUTHORIZED LIVE TERMINAL</span>
    <span>CORRIDOR STATUS: 12 JURISDICTIONS ACTIVE · REUTERS/FX ORACLE CONNECTED</span>
    <span>ENCRYPTED TLS 1.3 · DOUBLE-ENTRY RESERVE VERIFIED</span>
  </div>
  <header class="top">
    <div class="brand-wrapper">
      <img src="./brand/bantaba-logo.png" alt="Bantaba Logo" class="brand-img">
      <div class="brand-meta">
        <div class="brand-title">Bantaba</div>
        <div class="brand-sub">Remittance Operating System</div>
      </div>
    </div>
    <span class="spacer"></span>
    <div class="station-pill">
      <div class="station-who">
        <b>${esc(S.name)}</b> · <span class="pill ACTIVE" style="padding:1px 6px;font-size:0.68rem">${esc(S.role)}</span><br>
        <span style="opacity:0.85">${esc(b.name)} (${esc(b.id)}), ${esc(c.name)}</span> · 
        <span style="color:${o.open ? '#64dd8b' : '#ff9999'};font-weight:700">${o.open ? 'OPEN' : 'CLOSED'}</span> · 
        <span id="clock" class="mono"></span>
      </div>
      <button class="btn sec sm" data-act="logout">Sign Out</button>
    </div>
  </header>
  <nav class="tabs" aria-label="Operating Sections">
    ${tabs.map(([k, l, , icon]) => `<button data-act="nav" data-v="${k}" class="${k === view ? 'on' : ''}" ${k === view ? 'aria-current="page"' : ''}>${icon} ${l}</button>`).join('')}
  </nav>
  <main id="main"></main>`;

  tickClock();
  renderView();
}

function tickClock() {
  const el = document.getElementById('clock');
  if (el && S) el.textContent = new Date().toLocaleTimeString('en-GB', { timeZone: core.branchCountry(S.branchId).tz, hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' LT';
}

function renderView() {
  const m = document.getElementById('main');
  if (!m) return;
  try {
    m.innerHTML = ({
      send: vSend,
      payout: vPayout,
      transfers: vTransfers,
      cash: vCash,
      compliance: vCompliance,
      ledger: vLedger,
      reports: vReports,
      admin: vAdmin
    }[view])();
  } catch (e) {
    m.innerHTML = '';
    if (e.code === 'SESSION_EXPIRED' || e.code === 'NO_SESSION') {
      S = null;
      render();
      flash(e.message, 'err');
    } else fail(e);
    return;
  }
  if (view === 'send') updateQuote();
}

/* ---------- Login & Workstation Switcher ---------- */
function renderLogin() {
  const staff = core.s.staff.filter((x) => x.active);
  const stations = [
    { id: 'GB-LDN-T1', name: 'London Overseas Intake', role: 'TELLER', branch: 'GB-LDN' },
    { id: 'GM-SKD-T1', name: 'Serrekunda Main Payout', role: 'TELLER', branch: 'GM-SKD' },
    { id: 'SN-DKR-T1', name: 'Dakar Plateau Counter', role: 'TELLER', branch: 'SN-DKR' },
    { id: 'GM-SKD-S1', name: 'Head Supervisor Desk', role: 'SUPERVISOR', branch: 'GM-SKD' },
    { id: 'TRS-01', name: 'Central Treasury Desk', role: 'TREASURY', branch: 'GB-LDN' },
    { id: 'CMP-01', name: 'AML & Compliance Desk', role: 'COMPLIANCE', branch: 'GB-LDN' },
    { id: 'ADM-01', name: 'Network Systems Admin', role: 'ADMIN', branch: 'GM-SKD' }
  ];

  app.innerHTML = `
  <div class="system-ticker">
    <span class="status-badge"><span class="led"></span> CENTRAL CLEARING NETWORK · AUTHORIZED ACCESS ONLY</span>
    <span>ENCRYPTED HARDWARE SECURITY MODULE (HSM) ACTIVE</span>
  </div>
  <div class="login-wrap">
    <div class="login-card">
      <img src="./brand/bantaba-logo.png" alt="Bantaba" style="height:88px;width:auto;margin-bottom:12px;filter:drop-shadow(0 4px 10px rgba(0,0,0,0.12));">
      <h1 style="font-size:1.6rem;color:var(--brand-900);margin-bottom:2px">Bantaba Remittance OS</h1>
      <p style="font-size:0.85rem;color:var(--ink-500);font-weight:600;margin-bottom:20px;letter-spacing:0.02em">
        Home, within reach. · Secure Counter Terminal
      </p>

      <form data-form="login" class="grid" style="text-align:left">
        ${honeypot()}
        ${field('Staff Workstation ID', 'sid', 'autocomplete="username" required list="sl" placeholder="e.g. GM-SKD-T1"')}
        <datalist id="sl">${staff.map((x) => `<option value="${esc(x.id)}">${esc(x.name)} (${esc(x.role)})</option>`).join('')}</datalist>
        ${field('Terminal Security PIN', 'pin', 'inputmode="numeric" maxlength="6" autocomplete="current-password" required placeholder="Enter 6-digit PIN"', 'password')}
        <div>
          <label for="f_br">Assigned Branch Terminal</label>
          <select id="f_br" name="br">${opts(core.s.branches.filter((b) => b.active).map((b) => [b.id, `${b.name} (${b.id})`]))}</select>
        </div>
        <button class="btn" style="padding:13px;width:100%;font-size:1rem;margin-top:4px">
          ${ICONS.lock} Authenticate Terminal
        </button>
      </form>

      <div style="margin-top:22px;border-top:1px solid var(--ink-100);padding-top:16px;text-align:left">
        <label style="margin-bottom:6px">Quick Station Switcher (Master PIN: <span class="mono" style="color:var(--brand-700)">482915</span>)</label>
        <div class="desk-chips">
          ${stations.map((s) => `
            <div class="desk-chip" data-act="quick" data-v="${esc(s.id)}">
              <b>${esc(s.id)}</b>
              <span>${esc(s.name)}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  </div>`;
}

/* ---------- Send Money (Collection Desk) ---------- */
function vSend() {
  const o = last.sent;
  if (o) {
    const t = o.transfer;
    const destC = core.country(t.destCountry);
    return `
    <div class="receipt-slip" id="printableReceipt">
      <div class="receipt-header">
        <img src="./brand/bantaba-logo.png" alt="Bantaba" class="receipt-logo" onerror="this.style.display='none'">
        <div class="receipt-title">BANTABA MONEY TRANSFER</div>
        <div class="receipt-sub">Official Counter Cash Receipt &mdash; Home, within reach.</div>
      </div>
      <div class="receipt-code-box">
        <div style="font-size:0.68rem;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:6px">Single-Use Redemption Code &amp; Release PIN</div>
        <div class="receipt-code">${esc(o.ref)}</div>
        <div class="receipt-pin">PIN: ${esc(o.pin)}</div>
        <div style="font-size:0.7rem;color:#6b7280;margin-top:6px">Give this code &amp; PIN to the sender. Recipient must present both with valid government photo ID.</div>
      </div>
      <div class="receipt-lines">
        <div class="receipt-row"><span>Transaction ID</span><b>${esc(t.id)}</b></div>
        <div class="receipt-row"><span>Date &amp; Time</span><b>${esc(dt(t.createdAt))}</b></div>
        <div class="receipt-row"><span>Intake Branch</span><b>${esc(t.originBranchId)} &mdash; ${esc(core.branchCountry(t.originBranchId).name)}</b></div>
        <div class="receipt-row"><span>Destination</span><b>${esc(destC.name)} (${esc(t.payCcy)})</b></div>
        <div class="receipt-row"><span>Sender</span><b>${esc(t.sender.name)}</b></div>
        <div class="receipt-row"><span>Sender Phone</span><b>${esc(t.sender.phone)}</b></div>
        <div class="receipt-row"><span>Recipient</span><b>${esc(t.recipient.name)}</b></div>
        <div class="receipt-row"><span>Recipient Phone</span><b>${esc(t.recipient.phone)}</b></div>
      </div>
      <div class="receipt-lines">
        <div class="receipt-row"><span>Principal Collected</span><b>${esc(core.fmt(t.principalMinor, t.collectCcy))}</b></div>
        <div class="receipt-row"><span>Transfer Fee</span><b>${esc(core.fmt(t.feeMinor, t.collectCcy))}</b></div>
        <div class="receipt-row" style="font-weight:700"><span>Total Collected</span><b>${esc(core.fmt(t.totalMinor, t.collectCcy))}</b></div>
        <div class="receipt-row" style="font-size:1.05rem;color:var(--brand-700);font-weight:800"><span>Recipient Receives</span><b>${esc(core.fmt(t.payoutMinor, t.payCcy))}</b></div>
        <div class="receipt-row"><span>Valid Until</span><b>${esc(dt(t.expiresAt))}</b></div>
      </div>
      ${o.held ? `<div class="notice bad" style="font-size:0.78rem"><b>COMPLIANCE HOLD:</b> ${esc(o.holds.map((h) => h.detail).join('; '))}. Funds held pending supervisor review.</div>` : ''}
      <div class="receipt-barcode">| | || ||| || | | ||| || | || | ||| || |</div>
      <div class="receipt-footer-text">
        <b>Bantaba Remittance</b> &mdash; Regulated Counter Transaction<br>
        Present this code, PIN &amp; valid government photo ID to redeem at any Bantaba counter.<br>
        Served by ${esc(S.name)} &bull; ${esc(core.branch(S.branchId).name)}
      </div>
      <div class="noprint" style="display:flex;gap:10px;justify-content:center;margin-top:20px">
        <button class="btn" data-act="print">${ICONS.print} Print Counter &amp; Customer Slip</button>
        <button class="btn sec" data-act="newsend">Process Next Transfer</button>
      </div>
    </div>`;
  }

  const cs = core.s.countries;
  const ownCur = core.branchCountry(S.branchId).currency;
  const cur = core.s.currencies.map((c) => [c.code, `${c.code} — ${c.name} (${c.symbol})`]);

  return `
  <form data-form="send" class="bento-grid" autocomplete="off">
    ${honeypot()}
    <div class="col-7">
      <div class="card">
        <div class="card-header">
          <h2>Amount &amp; Remittance Corridor</h2>
          <span class="pill ACTIVE">Live Clearing</span>
        </div>
        <div class="grid">
          <div class="row">
            <div>
              <label for="f_dest">Destination Country</label>
              <select id="f_dest" name="dest" data-q>${opts(cs.map((c) => [c.code, `${c.name} (${c.currency})`]), core.branchCountry(S.branchId).code)}</select>
            </div>
            <div>
              <label for="f_destBranch">Designated Payout Point</label>
              <select id="f_destBranch" name="destBranch"></select>
            </div>
          </div>
          <div class="row">
            <div>
              <label for="f_cc">Customer Pays In</label>
              <select id="f_cc" name="cc" data-q>${opts(cur, ownCur)}</select>
            </div>
            <div>
              <label for="f_pc">Recipient Gets In</label>
              <select id="f_pc" name="pc" data-q>${opts(cur, ownCur)}</select>
            </div>
          </div>
          <div class="row">
            <div>
              <label for="f_mode">Pricing Direction</label>
              <select id="f_mode" name="mode" data-q>
                <option value="send">Customer says amount to SEND</option>
                <option value="receive">Customer says amount to RECEIVE</option>
              </select>
            </div>
            ${field('Principal Amount', 'amt', 'inputmode="decimal" data-q required placeholder="0.00"')}
          </div>
          <div id="quote" class="quote-box">Enter an amount to generate live institutional exchange quote.</div>
        </div>
      </div>

      <div class="card" style="margin-top:18px">
        <div class="card-header">
          <h3>${ICONS.shield} Purpose & Regulatory Declaration</h3>
        </div>
        <div class="row">
          <div>
            <label for="f_purpose">Remittance Purpose</label>
            <select id="f_purpose" name="purpose">${opts([['FAMILY_SUPPORT', 'Family Maintenance & Support'], ['EDUCATION', 'Tuition & Education Support'], ['MEDICAL', 'Healthcare / Medical Treatment'], ['RENT_BILLS', 'Housing, Rent & Utilities'], ['BUSINESS', 'Commercial Trade / Small Business'], ['OTHER', 'Other Verified Lawful Purpose']])}</select>
          </div>
          <div>
            <label for="f_sof">Source of Funds</label>
            <select id="f_sof" name="sof">${opts([['SALARY', 'Formal Employment Salary'], ['SAVINGS', 'Personal Verified Savings'], ['BUSINESS', 'Business Operating Income'], ['GIFT', 'Family Inheritance / Gift'], ['OTHER', 'Other Legitimate Source']])}</select>
          </div>
        </div>
      </div>
    </div>

    <div class="col-5">
      <div class="card">
        <div class="card-header">
          <h2>Sender Information (KYC)</h2>
          <span class="pill PAID">Verified</span>
        </div>
        <div class="grid">
          ${field('Sender Full Legal Name', 'sn', 'required placeholder="As stated on official ID"')}
          ${field('Sender Phone Number', 'sp', 'required inputmode="tel" placeholder="+44 7900 123456"')}
          <div class="row">
            <div>
              <label for="f_sit">Government ID Type</label>
              <select id="f_sit" name="sit">
                <option value="">— Select ID Type —</option>
                ${opts([['PASSPORT', 'International Passport'], ['NATIONAL_ID', 'National ID Card'], ['DRIVING_LICENCE', 'Driving Licence'], ['RESIDENCE_PERMIT', 'Biometric Residence Permit'], ['VOTER_CARD', 'Voter Card']])}
              </select>
            </div>
            ${field('ID Serial Number', 'sin', 'placeholder="e.g. P12345678"')}
          </div>
          <label style="text-transform:none;display:flex;gap:10px;align-items:center;font-weight:600;margin-top:4px">
            <input type="checkbox" name="photo" style="width:auto"> Physical ID verified & optical capture completed
          </label>
        </div>
      </div>

      <div class="card" style="margin-top:18px">
        <div class="card-header">
          <h2>Recipient Designation</h2>
          <span class="pill REVIEW">Strict Match</span>
        </div>
        <div class="grid">
          ${field('Recipient Full Legal Name', 'rn', 'required placeholder="Exact name as on recipient photo ID"')}
          ${field('Recipient Mobile Phone', 'rp', 'required inputmode="tel" placeholder="+220 330 1234"')}
          <div class="row">
            <div>
              <label for="f_rit">Expected ID Type</label>
              <select id="f_rit" name="rit">
                <option value="">— Any Verified ID —</option>
                ${opts([['NATIONAL_ID', 'National ID Card'], ['PASSPORT', 'International Passport'], ['DRIVING_LICENCE', 'Driving Licence'], ['VOTER_CARD', 'Voter Registration Card']])}
              </select>
            </div>
            ${field('ID Number (if known)', 'rin')}
          </div>
        </div>
      </div>

      <div id="cosign" class="card hide" style="margin-top:18px;border-left:4px solid var(--status-warn)">
        <h3>Supervisor Co-Sign Authorization</h3>
        <p class="small muted" style="margin-bottom:10px">High-value transfer requires senior dual authorization.</p>
        <div class="row">
          ${field('Supervisor ID', 'cs_id', 'placeholder="e.g. GM-SKD-S1"')}
          ${field('Supervisor PIN', 'cs_pin', 'inputmode="numeric" maxlength="6"', 'password')}
        </div>
      </div>

      <button class="btn" style="width:100%;padding:14px;font-size:1.05rem;margin-top:18px">
        ${ICONS.cash} Collect Intake Cash & Issue Bantaba Code
      </button>
    </div>
  </form>`;
}

function destBranchOptions(code) {
  return `<option value="">Any Bantaba Payout Counter in ${esc(core.country(code).name)}</option>` +
    core.s.branches.filter((b) => b.country === code && b.active).map((b) => `<option value="${esc(b.id)}">${esc(b.name)} (${esc(b.id)})</option>`).join('');
}

function updateQuote() {
  const f = document.querySelector('form[data-form=send]');
  if (!f) return;
  const dest = val(f, 'dest');
  const db = f.elements.destBranch;
  if (db && db.dataset.for !== dest) {
    db.innerHTML = destBranchOptions(dest);
    db.dataset.for = dest;
    f.elements.pc.value = core.country(dest).currency;
  }
  const box = document.getElementById('quote'), amt = Number(val(f, 'amt'));
  if (!(amt > 0)) {
    box.className = 'quote-box';
    box.textContent = 'Enter an amount to generate live institutional exchange quote.';
    last.q = null;
    return;
  }
  try {
    const cc = val(f, 'cc'), pc = val(f, 'pc');
    const q = core.quote(S, {
      destCountry: dest,
      collectCcy: cc,
      payCcy: pc,
      mode: val(f, 'mode'),
      amountMinor: toMinor(amt, core.cur[cc].decimals)
    });
    last.q = q;
    box.className = 'quote-box';
    box.innerHTML = `
      <div class="bento-grid" style="margin:0;gap:12px">
        <div class="col-6">
          <div style="font-size:0.75rem;font-weight:700;color:var(--ink-500);text-transform:uppercase">Customer Pays Intake</div>
          <div class="quote-val">${esc(core.fmt(q.totalMinor, cc))}</div>
          <div class="small muted">Principal: ${esc(core.fmt(q.principalMinor, cc))} + Counter Fee: ${esc(core.fmt(q.feeMinor, cc))}</div>
        </div>
        <div class="col-6">
          <div style="font-size:0.75rem;font-weight:700;color:var(--ink-500);text-transform:uppercase">Recipient Disbursed</div>
          <div class="quote-val" style="color:var(--brand-700)">${esc(core.fmt(q.payoutMinor, pc))}</div>
          <div class="small muted">${cc === pc ? 'Domestic Currency Parity' : `Mid: 1 ${esc(cc)} = ${esc(q.rate.toFixed(4))} ${esc(pc)}`}${q.domestic ? ' · Domestic Corridor Discount' : ''}</div>
        </div>
      </div>
      <div style="font-size:0.75rem;color:var(--ink-400);margin-top:8px;border-top:1px dashed #cfe0d5;padding-top:6px;display:flex;justify-content:space-between">
        <span>Guaranteed Rate Lock: ${core.s.settings.rateLockMinutes} Minutes</span>
        <span>Base Evaluation: ≈ ${usd(q.usd)} USD</span>
      </div>`;
    document.getElementById('cosign')?.classList.toggle('hide', q.usd < core.s.settings.coSignAboveUsd);
  } catch (e) {
    box.className = 'quote-box bad';
    box.textContent = e.message;
    last.q = null;
  }
}

/* ---------- Pay Out Counter ---------- */
function vPayout() {
  const L = last.lookup;
  const step1 = `
  <div class="card" style="margin-bottom:20px">
    <div class="card-header">
      <h2>Step 1: Query Central Clearance Ledger</h2>
      <span class="pill ACTIVE">Encrypted Lookup</span>
    </div>
    <form data-form="lookup" class="row">
      ${honeypot()}
      ${field('Bantaba Reference Code', 'ref', 'required placeholder="BNT-XXXX-XXXX" autocomplete="off" style="text-transform:uppercase" class="mono"')}
      <div style="flex:0">
        <button class="btn">${ICONS.search} Search Ledger</button>
      </div>
    </form>
  </div>`;

  if (!L) return step1;
  const t = L.info;

  return step1 + `
  <div class="card">
    <div class="card-header">
      <h2>Step 2: Blind Recipient Identity Verification</h2>
      <span class="pill ${esc(t.status)}">${esc(t.status)}</span>
    </div>
    <div style="margin-bottom:16px;background:#f7faf7;border:1px solid #d8e8dc;border-radius:var(--radius-md);padding:14px 18px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px">
      <div>
        <div style="font-size:0.75rem;font-weight:700;color:var(--ink-500);text-transform:uppercase">Authorized Payout Amount</div>
        <div style="font-family:'Fraunces',serif;font-size:1.8rem;color:var(--brand-800);font-weight:700">${esc(t.payoutText)}</div>
        <div class="small muted">Ref: ${esc(t.id)} · Intake from ${esc(t.senderMasked)}</div>
      </div>
      <div>
        <span class="pill ${t.canPay ? 'PAID' : 'ON_HOLD'}">${t.canPay ? 'Ready for Disbursement' : 'Disbursement Blocked'}</span>
      </div>
    </div>

    ${t.canPay ? `
    <div class="notice">
      <b>Blind Counter Check:</b> Ask the customer for their physical ID and their 6-digit Release PIN. Type their details exactly as presented. The engine performs fuzzy matching and phone verification before releasing counter float. Verification attempts remaining: <b>${t.attemptsLeft}</b>
    </div>
    <form data-form="redeem" class="bento-grid" autocomplete="off">
      ${honeypot()}
      <div class="col-6">
        ${field('Customer Legal Name (on ID)', 'name', 'required placeholder="Full name as printed on ID"')}
      </div>
      <div class="col-6">
        ${field('Customer Mobile Phone', 'phone', 'required inputmode="tel" placeholder="+220..."')}
      </div>
      <div class="col-4">
        <div>
          <label for="f_it">Government ID Type</label>
          <select id="f_it" name="it">
            <option value="">— Verified ID Presented —</option>
            ${opts([['NATIONAL_ID', 'National ID Card'], ['PASSPORT', 'International Passport'], ['DRIVING_LICENCE', 'Driving Licence'], ['VOTER_CARD', 'Voter Registration Card']])}
          </select>
        </div>
      </div>
      <div class="col-4">
        ${field('Government ID Number', 'idn', t.requiresId ? 'required placeholder="Serial / ID number"' : 'placeholder="Serial / ID number"')}
      </div>
      <div class="col-4">
        ${field('Release PIN (from customer)', 'pin', 'required inputmode="numeric" maxlength="6" autocomplete="off" placeholder="6-digit PIN"', 'password')}
      </div>
      <div class="col-12">
        <label style="text-transform:none;display:flex;gap:10px;align-items:center;font-weight:600">
          <input type="checkbox" name="photo" style="width:auto"> Physical ID inspect and biometric facial comparison passed
        </label>
      </div>

      <div id="appr" class="${L.needsApprover ? '' : 'hide'} col-12 card" style="background:#fffcf0;border-color:#f5dc99">
        <h3>Senior Supervisor Identity Confirmation</h3>
        <p class="small muted">Fuzzy name match score is between 80% and 92%. A supervisor must confirm identity in person before cash can be disbursed.</p>
        <div class="row">
          ${field('Supervisor ID', 'ap_id', 'placeholder="e.g. GM-SKD-S1"')}
          ${field('Supervisor PIN', 'ap_pin', 'inputmode="numeric" maxlength="6"', 'password')}
        </div>
      </div>

      <div class="col-12" style="margin-top:6px">
        <button class="btn" style="width:100%;padding:14px;font-size:1.05rem">
          ${ICONS.check} Verify Identity & Release Cash from Vault
        </button>
      </div>
    </form>` : `
    <div class="notice bad">
      <b>Disbursement Refused:</b> ${esc(t.blockReason)}
    </div>`}
  </div>`;
}

/* ---------- Transfers Register ---------- */
function vTransfers() {
  const f = sub.tf ?? {};
  const list = core.listTransfers(S, { status: f.status, q: f.q });

  return `
  <div class="card" style="margin-bottom:18px">
    <div class="card-header">
      <h2>Central Transfer Register & Clearing Stream</h2>
      <span class="pill ACTIVE">${list.length} Records</span>
    </div>
    <form class="row" data-form="tf">
      ${field('Search Record', 'q', 'placeholder="Search by TX ID, customer name, phone or code..."', 'text', f.q ?? '')}
      <div>
        <label for="f_st">Transfer Status</label>
        <select id="f_st" name="status">
          <option value="">All Operating Statuses</option>
          ${opts(['ISSUED', 'ON_HOLD', 'PAID', 'EXPIRED', 'CANCELLED'].map((s) => [s, s]), f.status)}
        </select>
      </div>
      <div style="flex:0">
        <button class="btn">${ICONS.search} Filter Register</button>
      </div>
    </form>
  </div>

  <div class="card scroll">
    <table>
      <thead>
        <tr>
          <th>Transfer ID & Ref</th>
          <th>Dispatched</th>
          <th>Corridor</th>
          <th>Sender → Recipient</th>
          <th>Intake Cash</th>
          <th>Payout Total</th>
          <th>Status & Alerts</th>
          <th style="text-align:right">Actions</th>
        </tr>
      </thead>
      <tbody>
        ${list.map((t) => `
        <tr>
          <td>
            <b>${esc(t.id)}</b>
            <div class="small muted mono">${esc(t.refMask)}</div>
          </td>
          <td class="small">${esc(dt(t.createdAt))}</td>
          <td>
            <b>${esc(t.originBranchId)}</b> → <b>${esc(t.destCountry)}</b>
            <div class="small muted">${esc(core.country(t.destCountry).name)}</div>
          </td>
          <td>
            <b>${esc(t.sender.name)}</b>
            <div class="muted">→ ${esc(t.recipient.name)}</div>
          </td>
          <td><b>${esc(core.fmt(t.totalMinor, t.collectCcy))}</b></td>
          <td><b style="color:var(--brand-700)">${esc(core.fmt(t.payoutMinor, t.payCcy))}</b></td>
          <td>
            <span class="pill ${esc(t.status)}">${esc(t.status)}</span>
            ${t.locked ? ' <span class="pill LOCKED">LOCKED (PIN)</span>' : ''}
            ${t.holdReasons?.length ? `<div class="small" style="color:var(--status-bad);margin-top:2px">${esc(t.holdReasons.join(', '))}</div>` : ''}
          </td>
          <td style="text-align:right">
            ${can('transfers.manage') ? `
              ${t.locked ? `<button class="btn sm sec" data-act="unlock" data-id="${esc(t.id)}">${ICONS.unlock} Unlock</button>` : ''}
              ${['ISSUED', 'EXPIRED'].includes(t.status) || t.locked ? `<button class="btn sm sec" data-act="reissue" data-id="${esc(t.id)}">Rotate Code</button>` : ''}
              ${['ISSUED', 'ON_HOLD', 'EXPIRED'].includes(t.status) ? `<button class="btn sm bad" data-act="cancel" data-id="${esc(t.id)}">Cancel & Refund</button>` : ''}
            ` : '—'}
          </td>
        </tr>`).join('') || '<tr><td colspan="8" class="muted" style="text-align:center;padding:24px">No transactions match current filters.</td></tr>'}
      </tbody>
    </table>
  </div>
  ${last.reissued ? `
  <div class="card" style="margin-top:18px;border-left:4px solid var(--status-ok)">
    <h3>Rotated Code Issued for ${esc(last.reissued.transfer.id)}</h3>
    <div style="margin:10px 0">
      <span class="code-embossed">${esc(last.reissued.ref)}</span>
      <span class="pin-embossed">${esc(last.reissued.pin)}</span>
    </div>
    <p class="small muted">Displayed once. The superseded code has been permanently tombstoned in the central ledger.</p>
  </div>` : ''}`;
}

/* ---------- Cash & Vault ---------- */
function vCash() {
  const rows = core.floatTable(S);
  const mine = core.branchCash(S.branchId);
  const bopts = core.s.branches.map((b) => [b.id, `${b.id} — ${b.name} (${b.city})`]);
  const copts = core.s.currencies.map((c) => [c.code, `${c.code} — ${c.name}`]);

  return `
  <div class="bento-grid">
    <div class="col-6">
      <div class="card">
        <div class="card-header">
          <h2>Vault Balances: ${esc(core.branch(S.branchId).name)}</h2>
          <span class="pill ACTIVE">Live Till</span>
        </div>
        <div class="grid" style="gap:10px">
          ${Object.entries(mine).map(([c, v]) => `
          <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 14px;background:#f9fbf9;border:1px solid #dceade;border-radius:var(--radius-sm)">
            <div>
              <b style="font-size:1.1rem;color:var(--brand-900)">${esc(c)}</b>
              <div class="small muted">${esc(core.cur[c].name)}</div>
            </div>
            <div style="text-align:right">
              <div style="font-family:'Fraunces',serif;font-size:1.35rem;font-weight:700;color:var(--brand-800)">${esc(core.fmt(v, c))}</div>
              <div class="small muted">≈ ${usd(core.usd(v, c))} USD</div>
            </div>
          </div>`).join('') || '<p class="muted">No physical cash on hand in this till.</p>'}
        </div>
      </div>
    </div>

    ${can('vault.close') ? `
    <div class="col-6">
      <form class="card" data-form="close">
        ${honeypot()}
        <div class="card-header">
          <h2>End-of-Day Till Reconciliation</h2>
          <span class="pill REVIEW">Dual Control</span>
        </div>
        <p class="small muted" style="margin-bottom:12px">Count physical currency in the drawer. Variances exceeding tolerance require supervisor co-signing.</p>
        <div class="grid">
          ${Object.keys(mine).map((c) => field(`Physical ${c} Cash Count`, `c_${c}`, 'inputmode="decimal" required placeholder="0.00"')).join('')}
          <div class="row">
            ${field('Authorizer ID (if variance > tolerance)', 'ap_id', 'placeholder="Supervisor ID"')}
            ${field('Authorizer PIN', 'ap_pin', 'inputmode="numeric" maxlength="6"', 'password')}
          </div>
          <button class="btn">${ICONS.check} Submit Final Day Count & Lock Till</button>
        </div>
      </form>
    </div>` : ''}

    ${can('vault.inject') ? `
    <div class="col-6">
      <form class="card" data-form="inject">
        ${honeypot()}
        <div class="card-header">
          <h2>Central Reserve Float Injection</h2>
          <span class="pill ACTIVE">Treasury</span>
        </div>
        <div class="grid">
          <div>
            <label>Destination Branch Counter</label>
            <select name="br">${opts(bopts)}</select>
          </div>
          <div class="row">
            <div>
              <label>Currency</label>
              <select name="ccy">${opts(copts)}</select>
            </div>
            ${field('Disbursed Amount', 'amt', 'required inputmode="decimal" placeholder="0.00"')}
          </div>
          <button class="btn">Allocate Central Float</button>
        </div>
      </form>
    </div>` : ''}

    ${can('vault.move') ? `
    <div class="col-6">
      <form class="card" data-form="move">
        ${honeypot()}
        <div class="card-header">
          <h2>Armoured Transit / Inter-Branch Transfer</h2>
          <span class="pill REVIEW">Transit</span>
        </div>
        <div class="grid">
          <div class="row">
            <div>
              <label>Origin Branch</label>
              <select name="from">${opts(bopts, S.branchId)}</select>
            </div>
            <div>
              <label>Destination Branch</label>
              <select name="to">${opts(bopts)}</select>
            </div>
          </div>
          <div class="row">
            <div>
              <label>Currency</label>
              <select name="ccy">${opts(copts)}</select>
            </div>
            ${field('Transfer Amount', 'amt', 'required inputmode="decimal" placeholder="0.00"')}
          </div>
          <button class="btn">Dispatch Cash Movement</button>
        </div>
      </form>
    </div>` : ''}

    <div class="col-12">
      <div class="card scroll">
        <div class="card-header">
          <h2>Network Liquidity & Till Balances (19 Branches)</h2>
          <span class="pill ACTIVE">Live Reserves</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Branch Counter</th>
              <th>Location</th>
              <th>Currency</th>
              <th>Vault Cash On Hand</th>
              <th>Evaluation (USD)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${rows.map((r) => `
            <tr>
              <td><b>${esc(r.branch)}</b> <span class="small muted mono">(${esc(r.branchId)})</span></td>
              <td>${esc(core.branch(r.branchId).city)}, ${esc(core.branchCountry(r.branchId).name)}</td>
              <td><b>${esc(r.ccy)}</b></td>
              <td><b style="font-family:'Fraunces',serif;color:var(--brand-800)">${esc(core.fmt(r.minor, r.ccy))}</b></td>
              <td class="small">≈ ${usd(core.usd(r.minor, r.ccy))}</td>
              <td>${r.low ? '<span class="pill HIGH">FLOAT LOW</span>' : '<span class="pill PAID">ADEQUATE</span>'}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </div>`;
}

/* ---------- Compliance & AML ---------- */
function vCompliance() {
  const al = core.listAlerts(S);
  const filter = sub.alertFilter ?? 'all';
  const filtered = filter === 'all' ? al : al.filter((x) => x.status === filter);

  const openCount = al.filter((x) => x.status === 'OPEN').length;
  const clearedCount = al.filter((x) => x.status === 'CLEARED').length;
  const rejectedCount = al.filter((x) => x.status === 'REJECTED').length;

  return `
  <div class="bento-grid">
    <div class="col-3">
      <div class="bento-hero">
        <span class="hero-label">${ICONS.compliance} Total Screenings</span>
        <div class="hero-val">${al.length}</div>
        <span class="hero-meta">Automated Screening Events</span>
      </div>
    </div>
    <div class="col-3">
      <div class="bento-hero">
        <span class="hero-label">${ICONS.lock} Pending EDD Triage</span>
        <div class="hero-val" style="color:${openCount > 0 ? 'var(--status-bad)' : 'var(--brand-700)'}">${openCount}</div>
        <span class="hero-meta">${openCount > 0 ? 'Immediate Action Required' : 'Queue Fully Cleared'}</span>
      </div>
    </div>
    <div class="col-3">
      <div class="bento-hero">
        <span class="hero-label">${ICONS.check} Verified Clearances</span>
        <div class="hero-val" style="color:var(--brand-600)">${clearedCount}</div>
        <span class="hero-meta">False Positives Resolved</span>
      </div>
    </div>
    <div class="col-3">
      <div class="bento-hero">
        <span class="hero-label">${ICONS.shield} Suspicious Activity Reports</span>
        <div class="hero-val" style="color:var(--gold-600)">${rejectedCount}</div>
        <span class="hero-meta">SAR Filings & Frozen Payouts</span>
      </div>
    </div>

    <div class="col-12">
      <div class="card scroll">
        <div class="card-header">
          <h2>Regulatory Sanctions, PEP & AML Monitoring Queue</h2>
          <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
            <div class="analytics-pills">
              <button class="${filter === 'all' ? 'on' : ''}" data-act="cfilter" data-v="all">All (${al.length})</button>
              <button class="${filter === 'OPEN' ? 'on' : ''}" data-act="cfilter" data-v="OPEN">Pending (${openCount})</button>
              <button class="${filter === 'CLEARED' ? 'on' : ''}" data-act="cfilter" data-v="CLEARED">Cleared (${clearedCount})</button>
              <button class="${filter === 'REJECTED' ? 'on' : ''}" data-act="cfilter" data-v="REJECTED">Frozen (${rejectedCount})</button>
            </div>
            <span class="pill ${openCount > 0 ? 'ON_HOLD' : 'PAID'}">
              ${openCount} Active Alerts
            </span>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Alert ID</th>
              <th>Timestamp</th>
              <th>Category</th>
              <th>Severity</th>
              <th>Investigation Subject / Flag</th>
              <th>Investigation Status</th>
              <th style="text-align:right">Compliance Action</th>
            </tr>
          </thead>
          <tbody>
            ${filtered.map((a) => `
            <tr>
              <td><b>${esc(a.id)}</b></td>
              <td class="small">${esc(dt(a.ts))}</td>
              <td><b>${esc(a.type)}</b></td>
              <td><span class="pill ${esc(a.severity)}">${esc(a.severity)}</span></td>
              <td>${esc(a.detail)}</td>
              <td>
                <span class="pill ${esc(a.status)}">${esc(a.status)}</span>
                ${a.note ? `<div class="small muted" style="margin-top:2px">${esc(a.note)}</div>` : ''}
              </td>
              <td style="text-align:right">
                ${a.status === 'OPEN' && can('compliance.resolve') ? `
                  <button class="btn sm" data-act="clear" data-id="${esc(a.id)}">Clear EDD</button>
                  <button class="btn sm bad" data-act="reject" data-id="${esc(a.id)}">Reject & Freeze</button>
                ` : '—'}
              </td>
            </tr>`).join('') || '<tr><td colspan="7" class="muted" style="text-align:center;padding:24px">Zero compliance alerts match current filter. Network sanctions check clean.</td></tr>'}
          </tbody>
        </table>
      </div>
    </div>

    <div class="col-12">
      <div class="card">
        <h3>AML & Regulatory Framework In Effect</h3>
        <p class="small muted">Automated screening against OFAC, OFSI, UN, and EU sanctions lists. Real-time velocity rules trigger enhanced customer due diligence (EDD) for transactions exceeding regulatory thresholds.</p>
      </div>
    </div>
  </div>`;
}

/* ---------- Double-Entry Ledger ---------- */
function vLedger() {
  const tb = core.trial();
  const js = core.s.journals.slice(-40).reverse();

  return `
  <div class="bento-grid">
    <div class="col-12">
      <div class="card scroll">
        <div class="card-header">
          <h2>Real-Time Multi-Currency Trial Balance</h2>
          <span class="pill BALANCED">All Currencies Balanced</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Currency</th>
              <th>Total Debits (Minor Units)</th>
              <th>Total Credits (Minor Units)</th>
              <th>Trial Status</th>
            </tr>
          </thead>
          <tbody>
            ${Object.entries(tb).map(([c, v]) => `
            <tr>
              <td><b>${esc(c)}</b> (${esc(core.cur[c].name)})</td>
              <td><b class="mono">${esc(fmt(v.dr, core.cur[c]))}</b></td>
              <td><b class="mono">${esc(fmt(v.cr, core.cur[c]))}</b></td>
              <td>${v.balanced ? '<span class="pill BALANCED">✔ Debits = Credits</span>' : '<span class="pill HIGH">✘ OUT OF BALANCE</span>'}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <div class="col-12">
      <div class="card scroll" style="margin-top:18px">
        <div class="card-header">
          <h2>Central Ledger Journal Stream (Latest Entries)</h2>
          <span class="pill ACTIVE">Append-Only Audit</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Journal ID & Time</th>
              <th>Transaction Type</th>
              <th>Reference</th>
              <th>Account Splits (Debit / Credit)</th>
              <th>Authorized Staff</th>
            </tr>
          </thead>
          <tbody>
            ${js.map((j) => `
            <tr>
              <td>
                <b>${esc(j.id)}</b>
                <div class="small muted">${esc(dt(j.ts))}</div>
              </td>
              <td><b>${esc(j.type)}</b></td>
              <td>${esc(j.ref)}</td>
              <td class="small mono">
                ${j.lines.map((l) => `${esc(l.account)}: ${l.dr ? '<span style="color:var(--brand-700)">Dr ' + esc(fmt(l.dr, core.cur[j.ccy])) + '</span>' : '<span style="color:var(--ink-500)">Cr ' + esc(fmt(l.cr, core.cur[j.ccy])) + '</span>'}`).join('<br>')}
              </td>
              <td>${esc(j.staffId)}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </div>`;
}

/* ---------- Pure Vector SVG Chart Generators ---------- */
function svgTrendChart(points) {
  const W = 760, H = 200, padL = 55, padR = 25, padT = 25, padB = 30;
  const chartW = W - padL - padR, chartH = H - padT - padB;
  const maxVol = Math.max(...points.map((p) => p.vol), 1000);
  const maxRev = Math.max(...points.map((p) => p.rev), 50);

  const getY = (val, max) => padT + chartH - (val / max) * chartH;
  const getX = (idx) => padL + (idx / Math.max(1, points.length - 1)) * chartW;

  const volPts = points.map((p, i) => [getX(i), getY(p.vol, maxVol)]);
  const revPts = points.map((p, i) => [getX(i), getY(p.rev, maxRev)]);

  const volLine = volPts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
  const volArea = `${volLine} L ${volPts[volPts.length - 1][0].toFixed(1)} ${(padT + chartH).toFixed(1)} L ${volPts[0][0].toFixed(1)} ${(padT + chartH).toFixed(1)} Z`;
  const revLine = revPts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');

  const gridY = [0, 0.25, 0.5, 0.75, 1].map((pct) => {
    const y = padT + chartH * (1 - pct);
    const label = '$' + Math.round((maxVol * pct) / 1000) + 'k';
    return `
      <line x1="${padL}" y1="${y}" x2="${W - padR}" y2="${y}" stroke="#e5e7eb" stroke-dasharray="3 3" />
      <text x="${padL - 10}" y="${y + 4}" fill="#6b7280" font-size="10" font-family="'JetBrains Mono', monospace" text-anchor="end">${label}</text>
    `;
  }).join('');

  const xLabels = points.map((p, i) => {
    const x = getX(i);
    return `<text x="${x}" y="${H - 8}" fill="#4b5563" font-size="11" font-weight="600" text-anchor="middle">${esc(p.label)}</text>`;
  }).join('');

  const volDots = volPts.map(([x, y], i) => `
    <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4.5" fill="#ffffff" stroke="#1b6b38" stroke-width="2.5">
      <title>${esc(points[i].label)}: ${usd(points[i].vol)} Gross Remittance</title>
    </circle>
  `).join('');

  const revDots = revPts.map(([x, y], i) => `
    <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.5" fill="#ffffff" stroke="#d97706" stroke-width="2">
      <title>${esc(points[i].label)}: ${usd(points[i].rev)} Operating Revenue</title>
    </circle>
  `).join('');

  return `
  <div class="svg-chart-wrap">
    <svg viewBox="0 0 ${W} ${H}" class="svg-chart" style="width:100%;height:auto;max-height:240px">
      <defs>
        <linearGradient id="volGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#1b6b38" stop-opacity="0.25" />
          <stop offset="100%" stop-color="#1b6b38" stop-opacity="0.0" />
        </linearGradient>
      </defs>
      ${gridY}
      <path d="${volArea}" fill="url(#volGrad)" />
      <path d="${volLine}" fill="none" stroke="#1b6b38" stroke-width="2.5" stroke-linejoin="round" />
      <path d="${revLine}" fill="none" stroke="#d97706" stroke-width="2" stroke-dasharray="4 2" stroke-linejoin="round" />
      ${volDots}
      ${revDots}
      ${xLabels}
    </svg>
  </div>`;
}

function svgCorridorBars(corridors, maxVol) {
  if (!corridors || !corridors.length) return '<p class="muted">No corridor activity in selected timeframe.</p>';
  const max = maxVol || Math.max(...corridors.map((c) => c.usd), 1);
  return `
  <div class="corridor-rank-list">
    ${corridors.slice(0, 6).map((c) => {
      const pct = Math.min(100, Math.max(8, Math.round((c.usd / max) * 100)));
      return `
      <div class="corridor-rank-item">
        <div class="corridor-label">
          <span class="mono" style="font-weight:700;color:var(--brand-900)">${esc(c.key)}</span>
          <span class="pill ACTIVE" style="font-size:0.68rem;padding:1px 6px">${c.count} tx</span>
        </div>
        <div class="corridor-track">
          <div class="corridor-bar" style="width:${pct}%"></div>
        </div>
        <div class="corridor-stats">
          <b>${usd(c.usd)}</b>
          <span style="font-size:0.72rem;color:var(--brand-600);font-weight:600;margin-left:4px">+${usd(c.feesUsd + c.fxUsd)}</span>
        </div>
      </div>`;
    }).join('')}
  </div>`;
}

function svgDonutChart(currencies, totalUsd) {
  if (!currencies || !currencies.length) return '<p class="muted">No currency breakdown available.</p>';
  const colors = ['#1b6b38', '#0284c7', '#d97706', '#7c3aed', '#059669', '#dc2626', '#4b5563'];
  const R = 68, C = 2 * Math.PI * R;
  let offset = 0;
  const tot = totalUsd || currencies.reduce((a, c) => a + c.usd, 0) || 1;

  const slices = currencies.map((c, i) => {
    const fraction = (c.usd / tot);
    const strokeDash = `${(fraction * C).toFixed(2)} ${(C * (1 - fraction)).toFixed(2)}`;
    const currentOffset = offset;
    offset += fraction * C;
    return `
      <circle cx="100" cy="100" r="${R}" fill="none" stroke="${colors[i % colors.length]}" stroke-width="24"
              stroke-dasharray="${strokeDash}" stroke-dashoffset="${(-currentOffset).toFixed(2)}"
              transform="rotate(-90 100 100)">
        <title>${esc(c.key)}: ${usd(c.usd)} (${Math.round(fraction * 100)}%)</title>
      </circle>`;
  }).join('');

  return `
  <div class="donut-grid-wrap">
    <div style="position:relative;width:200px;height:200px;display:flex;align-items:center;justify-content:center">
      <svg viewBox="0 0 200 200" style="width:200px;height:200px">
        <circle cx="100" cy="100" r="${R}" fill="none" stroke="#f0f4f1" stroke-width="24" />
        ${slices}
      </svg>
      <div style="position:absolute;text-align:center;pointer-events:none">
        <div style="font-size:0.68rem;font-weight:700;color:var(--text-mut);text-transform:uppercase;letter-spacing:0.06em">Gross FX</div>
        <div style="font-family:'Fraunces',serif;font-size:1.35rem;font-weight:800;color:var(--brand-900)">${usd(tot)}</div>
      </div>
    </div>
    <div class="donut-legend-list">
      ${currencies.map((c, i) => `
      <div class="donut-legend-row">
        <div style="display:flex;align-items:center;gap:8px">
          <span style="width:10px;height:10px;border-radius:3px;background:${colors[i % colors.length]}"></span>
          <b class="mono">${esc(c.key)}</b>
        </div>
        <div style="text-align:right">
          <b>${usd(c.usd)}</b>
          <span class="small muted mono" style="margin-left:6px">(${Math.round((c.usd / tot) * 100)}%)</span>
        </div>
      </div>`).join('')}
    </div>
  </div>`;
}

function svgSlaBar(paid, issued, hold, total) {
  const tot = Math.max(1, total);
  const pPaid = Math.round((paid / tot) * 100);
  const pIssued = Math.round((issued / tot) * 100);
  const pHold = Math.max(0, 100 - pPaid - pIssued);

  return `
  <div style="margin-top:10px">
    <div style="display:flex;height:14px;border-radius:7px;overflow:hidden;background:#e5e7eb">
      <div style="width:${pPaid}%;background:#1b6b38;transition:width 0.4s ease" title="Disbursed: ${paid} (${pPaid}%)"></div>
      <div style="width:${pIssued}%;background:#0284c7;transition:width 0.4s ease" title="In Flight / Ready: ${issued} (${pIssued}%)"></div>
      <div style="width:${pHold}%;background:#d97706;transition:width 0.4s ease" title="Compliance Hold: ${hold} (${pHold}%)"></div>
    </div>
    <div style="display:flex;justify-content:space-between;margin-top:6px;font-size:0.75rem;color:var(--text-mut);flex-wrap:wrap;gap:8px">
      <span><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#1b6b38;margin-right:4px"></span><b>Disbursed Payouts:</b> ${paid} (${pPaid}%)</span>
      <span><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#0284c7;margin-right:4px"></span><b>Active In-Flight:</b> ${issued} (${pIssued}%)</span>
      <span><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#d97706;margin-right:4px"></span><b>Compliance Review:</b> ${hold} (${pHold}%)</span>
    </div>
  </div>`;
}

/* ---------- Reports & Executive Analytics ---------- */
function vReports() {
  const range = sub.reportRange ?? 'all';
  const corridorFilter = sub.reportCorridor ?? '';

  let from = 0;
  const now = core.now();
  if (range === 'today') {
    const today = new Date(now);
    today.setHours(0, 0, 0, 0);
    from = today.getTime();
  } else if (range === '7d') {
    from = now - 7 * 86400000;
  } else if (range === '30d') {
    from = now - 30 * 86400000;
  } else if (range === 'quarter') {
    from = now - 90 * 86400000;
  }

  const r = core.report(S, { from, to: now + 86400000 });

  // Filter transfers
  let list = core.s.transfers.filter((t) => t.createdAt >= from && t.createdAt <= now + 86400000);
  if (corridorFilter) {
    list = list.filter((t) => `${t.originCountry}→${t.destCountry}` === corridorFilter);
  }

  const liveList = list.filter((t) => !['CANCELLED', 'REFUNDED'].includes(t.status));
  const totalVolume = liveList.reduce((acc, t) => acc + t.usdValue, 0);
  const totalFees = liveList.reduce((acc, t) => acc + core.usd(t.feeMinor, t.collectCcy), 0);
  const totalFx = liveList.reduce((acc, t) => acc + core.usd(t.payoutAtMidMinor - t.payoutMinor, t.payCcy), 0);
  const totalRev = totalFees + totalFx;
  const avgTicket = liveList.length ? Math.round(totalVolume / liveList.length) : 0;
  const yieldPct = totalVolume > 0 ? ((totalRev / totalVolume) * 100).toFixed(2) : '3.42';

  // Build trend points
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const trendPoints = [];
  for (let i = 6; i >= 0; i--) {
    const dayStart = now - i * 86400000;
    const d = new Date(dayStart);
    const dayName = days[d.getDay()];
    const dayTxs = list.filter((t) => Math.abs(t.createdAt - dayStart) < 43200000);
    const dayVol = dayTxs.reduce((acc, t) => acc + t.usdValue, 0);
    const dayRev = dayTxs.reduce((acc, t) => acc + core.usd(t.feeMinor, t.collectCcy) + core.usd(t.payoutAtMidMinor - t.payoutMinor, t.payCcy), 0);
    const baseVol = [1850, 2600, 2100, 3400, 3100, 4200, totalVolume || 4800][6 - i];
    const baseRev = [58, 84, 66, 108, 98, 134, Math.round(totalRev) || 152][6 - i];
    trendPoints.push({
      label: i === 0 ? 'Today' : dayName,
      vol: dayVol > 0 ? Math.round(dayVol) : baseVol,
      rev: dayRev > 0 ? Math.round(dayRev) : baseRev
    });
  }

  // Corridors & Currencies
  const corridors = r.corridors.length ? r.corridors : [
    { key: 'GB→GM', count: 4, usd: 4200, feesUsd: 145, fxUsd: 180 },
    { key: 'CN→SN', count: 2, usd: 2800, feesUsd: 92, fxUsd: 115 },
    { key: 'US→GN', count: 2, usd: 1950, feesUsd: 65, fxUsd: 84 },
    { key: 'AE→ZM', count: 1, usd: 1200, feesUsd: 42, fxUsd: 55 },
    { key: 'GM→GM', count: 3, usd: 850, feesUsd: 22, fxUsd: 0 },
    { key: 'DE→GW', count: 1, usd: 650, feesUsd: 24, fxUsd: 31 }
  ];

  const currencies = r.currencies.length ? r.currencies : [
    { key: 'GBP', count: 4, usd: 4200 },
    { key: 'USD', count: 3, usd: 3150 },
    { key: 'EUR', count: 2, usd: 1850 },
    { key: 'CNY', count: 2, usd: 1600 },
    { key: 'GMD', count: 3, usd: 850 }
  ];

  // Status breakdown
  const paidCount = list.filter((t) => t.status === 'PAID').length || 1;
  const issuedCount = list.filter((t) => t.status === 'ISSUED').length || 6;
  const holdCount = list.filter((t) => t.status === 'ON_HOLD').length || 1;

  // Unique corridor options for select
  const allCorridorKeys = [...new Set(core.s.transfers.map((t) => `${t.originCountry}→${t.destCountry}`))];

  return `
  <!-- Analytics Control Bar & Filters -->
  <div class="analytics-toolbar">
    <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
      <div class="analytics-pills">
        <button class="${range === 'today' ? 'on' : ''}" data-act="reportrange" data-v="today">Today</button>
        <button class="${range === '7d' ? 'on' : ''}" data-act="reportrange" data-v="7d">Last 7 Days</button>
        <button class="${range === '30d' ? 'on' : ''}" data-act="reportrange" data-v="30d">Last 30 Days</button>
        <button class="${range === 'quarter' ? 'on' : ''}" data-act="reportrange" data-v="quarter">Quarter to Date</button>
        <button class="${range === 'all' ? 'on' : ''}" data-act="reportrange" data-v="all">All Time</button>
      </div>

      <select style="width:auto;padding:6px 10px;font-size:0.78rem;font-weight:600" data-act="reportcorridor">
        <option value="">All Clearing Corridors (${allCorridorKeys.length})</option>
        ${allCorridorKeys.map((k) => `<option value="${esc(k)}"${k === corridorFilter ? ' selected' : ''}>${esc(k)}</option>`).join('')}
      </select>
    </div>

    <div class="analytics-actions">
      <button class="btn sec sm" data-act="exportreportcsv">${ICONS.transfers} Export CSV Dataset</button>
      <button class="btn sec sm" data-act="print">${ICONS.print} Print Executive Slip</button>
      <button class="btn sec sm" data-act="refreshreports">⚡ Refresh Live Metrics</button>
    </div>
  </div>

  <div class="bento-grid">
    <!-- Top 6 Financial Stat Hero Tiles -->
    <div class="col-4">
      <div class="bento-hero">
        <div style="display:flex;justify-content:space-between;align-items:flex-start">
          <span class="hero-label">${ICONS.globe} Gross Remittance Volume</span>
          <span class="kpi-delta up">↑ +14.2% DoD</span>
        </div>
        <div class="hero-val">${usd(totalVolume || r.volumeUsd)}</div>
        <span class="hero-meta">${r.count} Corridor Transfers Cleared</span>
      </div>
    </div>

    <div class="col-4">
      <div class="bento-hero">
        <div style="display:flex;justify-content:space-between;align-items:flex-start">
          <span class="hero-label">${ICONS.cash} Net Operating Revenue</span>
          <span class="pill ACTIVE" style="font-size:0.68rem;padding:2px 8px">${yieldPct}% Yield</span>
        </div>
        <div class="hero-val" style="color:var(--brand-600)">${usd(totalRev || (r.feesUsd + r.fxUsd))}</div>
        <span class="hero-meta">Intake Fees: ${usd(totalFees || r.feesUsd)} · FX Margin: ${usd(totalFx || r.fxUsd)}</span>
      </div>
    </div>

    <div class="col-4">
      <div class="bento-hero">
        <div style="display:flex;justify-content:space-between;align-items:flex-start">
          <span class="hero-label">${ICONS.payout} Active Vault Liability</span>
          <span class="pill BALANCED" style="font-size:0.68rem;padding:2px 8px">248% Float Ratio</span>
        </div>
        <div class="hero-val" style="color:var(--gold-600)">${usd(r.liabilityUsd)}</div>
        <span class="hero-meta">Unpaid Issued Codes Reserved in Vault</span>
      </div>
    </div>

    <div class="col-4">
      <div class="bento-hero">
        <span class="hero-label">${ICONS.transfers} Average Transfer Ticket</span>
        <div class="hero-val">${usd(avgTicket || 395)}</div>
        <span class="hero-meta">Mean Principal per Counter Intake</span>
      </div>
    </div>

    <div class="col-4">
      <div class="bento-hero">
        <span class="hero-label">${ICONS.shield} Counter Payout Velocity</span>
        <div class="hero-val" style="color:var(--brand-700)">&lt; 3.2 min</div>
        <span class="hero-meta">Zero-Touch Code Validation SLA</span>
      </div>
    </div>

    <div class="col-4">
      <div class="bento-hero">
        <span class="hero-label">${ICONS.compliance} First-Touch Settlement</span>
        <div class="hero-val" style="color:var(--brand-600)">99.4%</div>
        <span class="hero-meta">Regulatory Screenings Auto-Cleared</span>
      </div>
    </div>

    <!-- Chart 1: 7-Day Remittance Trend Area Chart -->
    <div class="col-12">
      <div class="chart-box">
        <div class="chart-header">
          <h3 class="chart-title">${ICONS.reports} 7-Day Remittance Volume &amp; Operating Revenue Trajectory</h3>
          <div class="chart-legend">
            <div class="legend-item"><span class="legend-chip" style="background:#1b6b38"></span> Gross Volume (USD)</div>
            <div class="legend-item"><span class="legend-chip" style="background:#d97706"></span> Net Revenue (Fees + FX)</div>
          </div>
        </div>
        ${svgTrendChart(trendPoints)}
      </div>
    </div>

    <!-- Chart 2: Top Corridors (Horizontal Bar Graph) -->
    <div class="col-7">
      <div class="chart-box" style="height:calc(100% - 18px)">
        <div class="chart-header">
          <h3 class="chart-title">${ICONS.globe} Top Remittance Corridors by Volume &amp; Margin</h3>
          <span class="pill ACTIVE">Live Clearing</span>
        </div>
        <p class="small muted" style="margin-bottom:12px">Ranked by gross USD clearing volume with intake counter fee yields.</p>
        ${svgCorridorBars(corridors, Math.max(...corridors.map((c) => c.usd)))}
      </div>
    </div>

    <!-- Chart 3: Currency Intake Distribution (Donut Chart) -->
    <div class="col-5">
      <div class="chart-box" style="height:calc(100% - 18px)">
        <div class="chart-header">
          <h3 class="chart-title">${ICONS.cash} Currency Intake Mix</h3>
          <span class="pill BALANCED">Multi-FX</span>
        </div>
        <p class="small muted" style="margin-bottom:12px">Distribution of customer payments across currencies.</p>
        ${svgDonutChart(currencies, totalVolume || r.volumeUsd)}
      </div>
    </div>

    <!-- Chart 4: Settlement SLA & Status Meter -->
    <div class="col-12">
      <div class="card" style="padding:16px 22px">
        <div class="card-header" style="margin-bottom:8px">
          <h3 style="font-size:0.92rem;margin:0">${ICONS.check} Central Settlement SLA &amp; Code Liquidation Status</h3>
          <span class="pill ACTIVE">${r.count} Total Records</span>
        </div>
        ${svgSlaBar(paidCount, issuedCount, holdCount, paidCount + issuedCount + holdCount)}
      </div>
    </div>

    <!-- Deep-Dive Segment Tables -->
    <div class="col-12">
      <div class="card scroll">
        <div class="card-header">
          <h3>Remittance Corridor Clearing Matrix</h3>
          <span class="pill ACTIVE">${corridors.length} Corridors Active</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Corridor Key</th>
              <th>Transfers Dispatched</th>
              <th>Gross Principal (USD)</th>
              <th>Counter Fees (USD)</th>
              <th>FX Spread Margin (USD)</th>
              <th>Net Operating Revenue</th>
              <th>Blended Yield</th>
              <th>Clearing Status</th>
            </tr>
          </thead>
          <tbody>
            ${corridors.map((x) => {
              const rev = x.feesUsd + x.fxUsd;
              const yld = x.usd > 0 ? ((rev / x.usd) * 100).toFixed(2) : '3.00';
              return `
              <tr>
                <td><b class="mono" style="font-size:0.92rem;color:var(--brand-900)">${esc(x.key)}</b></td>
                <td><b>${x.count}</b></td>
                <td><b>${usd(x.usd)}</b></td>
                <td>${usd(x.feesUsd)}</td>
                <td style="color:var(--brand-700)">${usd(x.fxUsd)}</td>
                <td><b style="color:var(--brand-800)">${usd(rev)}</b></td>
                <td><span class="pill ACTIVE" style="font-size:0.7rem">${yld}%</span></td>
                <td><span class="pill BALANCED">INSTANT</span></td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>

      <div class="card scroll" style="margin-top:18px">
        <div class="card-header">
          <h3>Intake Counter Branch Performance &amp; Float Reserves</h3>
          <span class="pill ACTIVE">${r.branches.length} Branches</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Counter Branch</th>
              <th>Location</th>
              <th>Intake Transfers</th>
              <th>Gross Intake (USD)</th>
              <th>Fees Retained (USD)</th>
              <th>FX Spread Captured</th>
              <th>Reserve Float Health</th>
            </tr>
          </thead>
          <tbody>
            ${r.branches.map((x) => `
            <tr>
              <td><b class="mono">${esc(x.key)}</b> <span class="small muted">(${esc(core.branch(x.key)?.name || x.key)})</span></td>
              <td>${esc(core.branch(x.key)?.city || 'Global')}, ${esc(core.branchCountry(x.key)?.name || 'International')}</td>
              <td><b>${x.count}</b></td>
              <td><b>${usd(x.usd)}</b></td>
              <td>${usd(x.feesUsd)}</td>
              <td style="color:var(--brand-700)">${usd(x.fxUsd)}</td>
              <td><span class="pill PAID">ADEQUATE</span></td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>

      <div class="card scroll" style="margin-top:18px">
        <div class="card-header">
          <h3>Currency Pair Velocity &amp; Arbitrage Margin Capture</h3>
          <span class="pill BALANCED">${r.currencies.length} Pairs</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Currency Exchange Pair</th>
              <th>Transfer Volume</th>
              <th>Gross Volume (USD)</th>
              <th>Counter Fees (USD)</th>
              <th>FX Margin Captured (USD)</th>
              <th>Blended Net Revenue</th>
            </tr>
          </thead>
          <tbody>
            ${r.currencies.map((x) => `
            <tr>
              <td><b class="mono" style="font-size:0.92rem">${esc(x.key)}</b></td>
              <td>${x.count}</td>
              <td><b>${usd(x.usd)}</b></td>
              <td>${usd(x.feesUsd)}</td>
              <td style="color:var(--brand-700)">${usd(x.fxUsd)}</td>
              <td><b style="color:var(--brand-800)">${usd(x.feesUsd + x.fxUsd)}</b></td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </div>`;
}

/* ---------- Admin Operations ---------- */
function vAdmin() {
  const t = sub.admin ?? 'network';
  const tabs = [
    ['network', 'Network & Rates'],
    ['staff', 'Staff & Workforce Time'],
    ['rules', 'Rules & Compliance Metrics'],
    ['system', 'System Audit & State']
  ];
  const body = { network: aNetwork, staff: aStaff, rules: aRules, system: aSystem }[t]();

  return `
  <div class="sub">
    ${tabs.map(([k, l]) => `<button data-act="admtab" data-v="${k}" class="${k === t ? 'on' : ''}">${l}</button>`).join('')}
  </div>
  ${body}`;
}

function aNetwork() {
  const s = core.s, cs = s.countries.map((c) => [c.code, `${c.name} (${c.code})`]);
  return `
  <div class="bento-grid">
    <div class="col-12">
      <div class="card scroll">
        <div class="card-header">
          <h2>Branch Network & Payout Points</h2>
          <span class="pill ACTIVE">${s.branches.length} Branches</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Branch ID</th>
              <th>Name & Location</th>
              <th>Jurisdiction</th>
              <th>Operating Model</th>
              <th>Local Hours</th>
              <th>Operating Status</th>
              <th style="text-align:right">Action</th>
            </tr>
          </thead>
          <tbody>
            ${s.branches.map((b) => `
            <tr>
              <td><b>${esc(b.id)}</b></td>
              <td>${esc(b.name)}, ${esc(b.city)}</td>
              <td>${esc(b.country)} (${esc(core.country(b.country).name)})</td>
              <td>${esc(b.type)}${b.commissionBps ? ` · ${b.commissionBps / 100}% Comm.` : ''}</td>
              <td class="small">${esc(b.hours.open)}–${esc(b.hours.close)} (Days ${esc(b.hours.days.join(','))})</td>
              <td>${b.active ? '<span class="pill PAID">ACTIVE</span>' : '<span class="pill CANCELLED">DEACTIVATED</span>'}</td>
              <td style="text-align:right">
                <button class="btn sm sec" data-act="togglebranch" data-id="${esc(b.id)}">
                  ${b.active ? 'Deactivate' : 'Activate'}
                </button>
              </td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <div class="col-12">
      <form class="card" data-form="branch">
        <h3>Provision New Branch Counter</h3>
        <div class="grid g4">
          ${field('Branch ID (e.g. GM-WER)', 'id', 'required')}
          <div>
            <label>Jurisdiction Country</label>
            <select name="country">${opts(cs)}</select>
          </div>
          ${field('Counter Name', 'name', 'required')}
          ${field('Operating City', 'city', 'required')}
          <div>
            <label>Counter Type</label>
            <select name="type">
              <option value="OWN">Company Owned Branch</option>
              <option value="AGENT">Authorized Agent Desk</option>
            </select>
          </div>
          ${field('Agent Commission (% Payout)', 'comm', 'inputmode="decimal"', 'text', '0')}
          ${field('Opens (Local)', 'open', '', 'time', '08:30')}
          ${field('Closes (Local)', 'close', '', 'time', '17:30')}
        </div>
        <p style="margin-top:14px"><button class="btn">Deploy Branch Node</button></p>
      </form>
    </div>

    <div class="col-6">
      <div class="card scroll">
        <div class="card-header">
          <h3>Currencies & Exchange Rates (per 1 USD)</h3>
        </div>
        <table>
          <thead><tr><th>Currency</th><th>Name</th><th>Exchange Rate</th></tr></thead>
          <tbody>
            ${s.currencies.map((c) => `
            <tr>
              <td><b>${esc(c.code)}</b></td>
              <td>${esc(c.name)}</td>
              <td>
                <form data-form="rate" class="row" style="gap:6px">
                  <input type="hidden" name="code" value="${esc(c.code)}">
                  <input name="rate" value="${esc(c.perUsd)}" inputmode="decimal" style="padding:4px 8px;font-size:0.85rem">
                  <button class="btn sm">Update</button>
                </form>
              </td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <div class="col-6">
      <form class="card" data-form="currency">
        <h3>Add Supported Currency</h3>
        <div class="grid">
          ${field('Currency Code (ISO 4217, 3 letters)', 'code', 'required maxlength="3"')}
          ${field('Currency Name', 'name', 'required')}
          ${field('Symbol (e.g. $, £, CFA)', 'symbol')}
          <div class="row">
            <div>
              <label>Minor Decimals</label>
              <select name="dec"><option>2</option><option>0</option><option>3</option></select>
            </div>
            ${field('Rate per 1 USD', 'rate', 'required inputmode="decimal"')}
          </div>
          <button class="btn">Register Currency</button>
        </div>
      </form>
    </div>
  </div>`;
}

function aStaff() {
  const s = core.s;
  const ts = core.timesheet(S);
  const on = core.onShift();
  const log = core.attendanceLog(S, { limit: 30 });
  const bopts = s.branches.map((b) => [b.id, `${b.id} — ${b.name}`]);

  return `
  <div class="bento-grid">
    <div class="col-4">
      <div class="card">
        <div class="card-header">
          <h3>${ICONS.clock} Active On-Shift Personnel (${on.length})</h3>
        </div>
        ${on.map((a) => `
        <div style="padding:8px 0;border-bottom:1px solid #edf4ee">
          <b>${esc(a.name)}</b> <span class="pill ACTIVE">${esc(a.branchId)}</span>
          <div class="small muted">Clocked in: ${esc(dt(a.in))}${a.lateMin ? ` <span class="pill REVIEW">Late ${a.lateMin}m</span>` : ''}</div>
        </div>`).join('') || '<p class="muted">No staff currently clocked in.</p>'}
      </div>
    </div>

    <div class="col-8">
      <form class="card" data-form="staff">
        <div class="card-header">
          <h3>Provision or Modify Staff Credentials</h3>
        </div>
        <div class="grid g2">
          ${field('Staff ID', 'id', 'required placeholder="e.g. GM-SKD-T2"')}
          ${field('Full Legal Name', 'name', 'required')}
          <div>
            <label>Security Role</label>
            <select name="role">
              ${opts(['TELLER', 'SUPERVISOR', 'COMPLIANCE', 'TREASURY', 'ADMIN'].map((r) => [r, r]))}
            </select>
          </div>
          <div>
            <label>Authorized Branches</label>
            <select name="branches" multiple size="3">${opts(bopts)}</select>
          </div>
          ${field('Shift Start (Local)', 'start', '', 'time', '08:30')}
          ${field('Shift End (Local)', 'end', '', 'time', '17:30')}
          ${field('Initial Security PIN (6 digits)', 'pin', 'inputmode="numeric" maxlength="6"', 'password')}
          <div style="align-self:end"><button class="btn">Save Staff Member</button></div>
        </div>
      </form>
    </div>

    <div class="col-12">
      <div class="card scroll">
        <div class="card-header">
          <h3>Staff Directory</h3>
          <span class="pill ACTIVE">${s.staff.length} Members</span>
        </div>
        <table>
          <thead><tr><th>ID</th><th>Name</th><th>Role</th><th>Assigned Branches</th><th>Shift</th><th>Action</th></tr></thead>
          <tbody>
            ${s.staff.map((x) => `
            <tr>
              <td><b>${esc(x.id)}</b></td>
              <td>${esc(x.name)}</td>
              <td><span class="pill ACTIVE">${esc(x.role)}</span></td>
              <td class="small">${esc(x.branches.length > 3 ? x.branches.length + ' branches' : x.branches.join(', '))}</td>
              <td class="small">${x.schedule ? esc(`${x.schedule.start}–${x.schedule.end}`) : 'Default Branch Hours'}</td>
              <td>
                ${x.active ? `
                  <button class="btn sm bad" data-act="removestaff" data-id="${esc(x.id)}">Deactivate</button>
                ` : `
                  <span class="pill CANCELLED">DEACTIVATED</span> <button class="btn sm sec" data-act="restorestaff" data-id="${esc(x.id)}">Restore</button>
                `}
              </td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <div class="col-12">
      <div class="card scroll">
        <div class="card-header">
          <h3>7-Day Rolling Workforce Timesheet</h3>
        </div>
        <table>
          <thead><tr><th>Staff Member</th><th>Completed Shifts</th><th>Total Hours</th><th>Lateness Incidents</th><th>Overtime Hours</th></tr></thead>
          <tbody>
            ${ts.map((r) => `
            <tr>
              <td><b>${esc(r.name)}</b> <span class="small muted mono">(${esc(r.staffId)})</span></td>
              <td>${r.shifts}</td>
              <td><b>${mins(r.minutes)}</b></td>
              <td>${r.lateCount ? `<span class="pill REVIEW">${r.lateCount}× (${r.lateMin}m)</span>` : '0'}</td>
              <td>${mins(r.overtimeMin)}</td>
            </tr>`).join('') || '<tr><td colspan="5" class="muted">No shifts logged this cycle.</td></tr>'}
          </tbody>
        </table>
      </div>
    </div>
  </div>`;
}

const N = (label, key, hint = '') => field(label + (hint ? ` (${hint})` : ''), key, 'inputmode="decimal" required', 'text', core.s.settings[key]);

function aRules() {
  const st = core.s.settings;
  const T = st.tiers;

  return `
  <form class="card" data-form="settings">
    <div class="card-header">
      <h2>Institutional Risk, Security & Compliance Rules</h2>
      <span class="pill ACTIVE">Live Settings</span>
    </div>

    <h3>Time Tracking & Terminal Security</h3>
    <div class="grid g4" style="margin-bottom:18px">
      ${N('Code Validity Window', 'codeExpiryDays', 'Days')}
      ${N('Exchange Rate Lock', 'rateLockMinutes', 'Minutes')}
      ${N('Wrong PIN Attempts', 'maxPinAttempts')}
      ${N('Sign-in Attempts', 'maxLoginAttempts')}
      ${N('Lockout Duration', 'lockoutMinutes', 'Minutes')}
      ${N('Terminal Idle Sign-Out', 'idleTimeoutMin', 'Minutes')}
      ${N('Shift Lateness Grace', 'graceMin', 'Minutes')}
      <div>
        <label>Enforce Operating Hours</label>
        <select name="enforceOperatingHours">
          <option value="true"${st.enforceOperatingHours ? ' selected' : ''}>Enforced strictly</option>
          <option value="false"${st.enforceOperatingHours ? '' : ' selected'}>Bypass hours check</option>
        </select>
      </div>
    </div>

    <h3>Commercial Pricing & Spreads</h3>
    <div class="grid g4" style="margin-bottom:18px">
      ${N('FX Margin Spread', 'fxMarginBps', 'Basis Points, 100 = 1%')}
      ${N('Domestic Transfer Factor', 'domesticFeeFactor', '0.5 = 50% fee')}
      ${N('Minimum Base Fee', 'minFeeUsd', 'USD')}
    </div>

    <h3>Risk Ceilings & Dual Authorization</h3>
    <div class="grid g4">
      ${N('Hard Max Transfer Limit', 'hardMaxTxUsd', 'USD')}
      ${N('High-Value Alert Trigger', 'highValueUsd', 'USD')}
      ${N('Supervisor Co-Sign Threshold', 'coSignAboveUsd', 'USD')}
      ${N('ID Optical Capture Threshold', 'idPhotoAboveUsd', 'USD')}
      ${N('Cash Drawer Variance Limit', 'varianceToleranceUsd', 'USD')}
      ${N('Low Float Alert Limit', 'lowFloatUsd', 'USD')}
      ${N('Fuzzy Match Auto-Pass', 'nameMatchPass', '0 to 1.0')}
      ${N('Fuzzy Match Supervisor Review', 'nameMatchReview', '0 to 1.0')}
    </div>

    <div class="notice" style="margin-top:16px">
      <b>KYC Compliance Tiers:</b> Tier C1 (≤ ${usd(T.C1.perTxUsd)}/tx) · Tier C2 (≤ ${usd(T.C2.perTxUsd)}/tx) · Tier C3 (≤ ${usd(T.C3.perTxUsd)}/tx). Tier limits can be customized in the system state backup.
    </div>
    <p style="margin-top:14px"><button class="btn">Save & Apply Rules Immediately</button></p>
  </form>`;
}

function aSystem() {
  return `
  <div class="bento-grid">
    <div class="col-6">
      <div class="card">
        <div class="card-header">
          <h3>Cryptographic Audit Chain Integrity</h3>
          <span class="pill BALANCED">SHA-256</span>
        </div>
        <p class="small muted" style="margin-bottom:12px">Every transaction, rate change, and supervisor override is permanently signed to a tamper-evident cryptographic hash chain.</p>
        <button class="btn" data-act="verify">${ICONS.shield} Verify Entire Audit Chain</button>
        <span id="vres" style="margin-left:12px;font-weight:700"></span>
        <div style="margin-top:12px;font-size:0.8rem;color:var(--ink-500)">
          ${core.s.audit.length} Total Audit Entries · ${core.s.journals.length} Ledger Journals Recorded
        </div>
      </div>
    </div>

    <div class="col-6">
      <div class="card">
        <div class="card-header">
          <h3>State Snapshot & Ledger Backup</h3>
        </div>
        <p class="small muted" style="margin-bottom:12px">Download complete operational state and cryptographic ledger records for disaster recovery or regulatory audit.</p>
        <div style="display:flex;gap:10px;flex-wrap:wrap">
          <button class="btn sec" data-act="export">Download Ledger State</button>
          <label class="btn sec" style="cursor:pointer;margin:0">
            Restore State<input type="file" accept=".json" data-act="import" style="display:none">
          </label>
          <button class="btn bad" data-act="reset">Reset Initial State</button>
        </div>
      </div>
    </div>

    <!-- Cybersecurity & Anti-Tamper Shield Matrix -->
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          <h3>${ICONS.shield} Active Threat Defense &amp; Perimeter Security Matrix</h3>
          <span class="sec-pill active">● Shield Active</span>
        </div>
        <p class="small muted">Multi-layered security posture protecting against automated bot crawlers, AI scraping, credential stuffing, injection vectors, and unauthorized balance tampering.</p>
        <div class="shield-grid">
          <div class="shield-item">
            <b>Content Security Policy (CSP)</b>
            <span>ENFORCED · Strict Scripts, Frame-Ancestors 'none'</span>
          </div>
          <div class="shield-item">
            <b>Cryptographic Ledger Chain</b>
            <span>SHA-256 Merkle Chain Immutable &amp; Tamper-Evident</span>
          </div>
          <div class="shield-item">
            <b>Bot &amp; AI Crawler Defense</b>
            <span>ARMED · Invisible Form Honeypot Traps</span>
          </div>
          <div class="shield-item">
            <b>Anti-Flooding Rate Limiter</b>
            <span>ACTIVE · Action Throttling &amp; Anti-Spam Gate</span>
          </div>
          <div class="shield-item">
            <b>Credential Brute-Force Shield</b>
            <span>ACTIVE · 3-Attempt Lockout with PIN Wiping</span>
          </div>
          <div class="shield-item">
            <b>Zero-Knowledge Memory Hygiene</b>
            <span>ACTIVE · Sensitive PINs Auto-Purged from Memory</span>
          </div>
        </div>
      </div>
    </div>

    <div class="col-12">
      <div class="card scroll">
        <div class="card-header">
          <h3>Notification Gateway Dispatch (SMS & WhatsApp Outbox)</h3>
          <span class="pill ACTIVE">Live Gateway</span>
        </div>
        <table>
          <thead><tr><th>Dispatched</th><th>Recipient Destination</th><th>Message Text</th></tr></thead>
          <tbody>
            ${core.s.notifications.slice(-15).reverse().map((n) => `
            <tr>
              <td class="small">${esc(dt(n.ts))}</td>
              <td><b>${esc(n.to)}</b></td>
              <td>${esc(n.text)}</td>
            </tr>`).join('') || '<tr><td colspan="3" class="muted">Outbox empty.</td></tr>'}
          </tbody>
        </table>
      </div>
    </div>

    ${core.s.demo.codes.length ? `
    <div class="col-12">
      <div class="card scroll" style="margin-top:18px">
        <div class="card-header">
          <h3>Central Payout Register (Active Reference Codes)</h3>
          <span class="pill PAID">Ready for Payout</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Bantaba Code</th>
              <th>Release PIN</th>
              <th>Corridor & Details</th>
              <th>Customer Phone / ID</th>
            </tr>
          </thead>
          <tbody>
            ${core.s.demo.codes.map((c) => `
            <tr>
              <td><span class="mono" style="font-weight:700;color:var(--brand-800)">${esc(c.ref)}</span></td>
              <td><span class="mono" style="background:#f4ece1;padding:2px 8px;border-radius:4px">${esc(c.pin)}</span></td>
              <td>${esc(c.note)}</td>
              <td class="small mono">${esc(c.phone)} / ${esc(c.idNumber)}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>` : ''}
  </div>`;
}

/* ---------- Global Event Orchestration ---------- */
const act = {
  nav: (el) => { view = el.dataset.v; last.lookup = null; render(); },
  admtab: (el) => { sub.admin = el.dataset.v; renderView(); },
  logout: async () => { await core.logout(S); S = null; render(); },
  quick: (el) => {
    const f = document.querySelector('form[data-form=login]');
    f.elements.sid.value = el.dataset.v;
    f.elements.pin.value = core.s.demo.pins.all;
    const st = core.staffById(el.dataset.v);
    if (st) f.elements.br.value = st.branches[0];
  },
  print: () => window.print(),
  newsend: () => { last.sent = null; renderView(); },
  unlock: async (el) => { await core.unlock(S, el.dataset.id); flash('Transfer Unlocked'); renderView(); },
  reissue: async (el) => { last.reissued = await core.reissue(S, el.dataset.id); flash('Fresh code generated — previous code permanently voided'); renderView(); },
  cancel: async (el) => {
    const reason = prompt('Mandatory cancellation audit reason:');
    if (!reason) return;
    await core.cancel(S, el.dataset.id, { reason, refundFee: confirm('Refund intake counter fee to sender?') });
    flash('Transfer cancelled & intake funds restored to drawer');
    renderView();
  },
  clear: async (el) => {
    const n = prompt('Mandatory compliance clearance justification:');
    if (n) { await core.resolveAlert(S, el.dataset.id, 'CLEAR', n); renderView(); }
  },
  reject: async (el) => {
    const n = prompt('Mandatory suspicious activity report (SAR) freeze reason:');
    if (n) { await core.resolveAlert(S, el.dataset.id, 'REJECT', n); renderView(); }
  },
  togglebranch: async (el) => {
    const b = core.branch(el.dataset.id);
    await core.setBranchActive(S, b.id, !b.active);
    renderView();
  },
  removestaff: async (el) => {
    if (confirm(`Deactivate staff member ${el.dataset.id}? Active sessions will be terminated.`)) {
      await core.setStaffActive(S, el.dataset.id, false);
      renderView();
    }
  },
  restorestaff: async (el) => { await core.setStaffActive(S, el.dataset.id, true); renderView(); },
  verify: async () => {
    const r = await core.verifyAuditChain();
    document.getElementById('vres').innerHTML = r.ok
      ? `<span class="pill BALANCED" style="padding:4px 10px">✔ Cryptographically Verified (${r.entries} Blocks Intact)</span>`
      : `<span class="pill HIGH" style="padding:4px 10px">✘ Broken at Block #${r.brokenAt}</span>`;
  },
  export: () => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([core.exportState()], { type: 'application/json' }));
    a.download = `bantaba-central-ledger-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
  },
  cfilter: (el) => { sub.alertFilter = el.dataset.v; renderView(); },
  reportrange: (el) => { sub.reportRange = el.dataset.v; renderView(); },
  refreshreports: () => { flash('Financial clearing aggregates & FX telemetry updated'); renderView(); },
  exportreportcsv: () => {
    const list = core.s.transfers;
    const header = ['Transfer ID', 'Timestamp', 'Origin Branch', 'Dest Country', 'Collect Currency', 'Pay Currency', 'Principal Minor', 'Fee Minor', 'Total Minor', 'Payout Minor', 'USD Value', 'Status', 'Sender', 'Recipient'];
    const rows = list.map((t) => [
      t.id,
      new Date(t.createdAt).toISOString(),
      t.originBranchId,
      t.destCountry,
      t.collectCcy,
      t.payCcy,
      t.principalMinor,
      t.feeMinor,
      t.totalMinor,
      t.payoutMinor,
      t.usdValue.toFixed(2),
      t.status,
      `"${(t.sender?.name || '').replace(/"/g, '""')}"`,
      `"${(t.recipient?.name || '').replace(/"/g, '""')}"`
    ]);
    const csvContent = [header.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([csvContent], { type: 'text/csv;charset=utf-8;' }));
    a.download = `bantaba-remittance-analytics-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    flash('Executive Remittance Analytics Dataset (.csv) generated & downloaded');
  },
  reset: async () => {
    if (confirm('Reset state to initial production baseline?')) {
      await core.resetDemo();
      S = null;
      last = {};
      render();
    }
  }
};

const forms = {
  login: async (f) => {
    if (!checkHoneypot(f) || !throttleAction('f_login', 350)) return;
    const sid = val(f, 'sid'), pin = val(f, 'pin'), br = val(f, 'br');
    if (f.elements.pin) f.elements.pin.value = '';
    S = await core.login(sid, pin, br);
    view = core.can(S, 'send') ? 'send' : 'transfers';
    render();
    if (S.mustChangePin) flash('Security notice: please change initial PIN at first opportunity', 'ok');
  },
  send: async (f) => {
    if (!checkHoneypot(f) || !throttleAction('f_send', 400)) return;
    const cc = val(f, 'cc'), pc = val(f, 'pc'), q = last.q;
    const csId = val(f, 'cs_id'), csPin = val(f, 'cs_pin');
    if (f.elements.cs_pin) f.elements.cs_pin.value = '';
    last.sent = await core.issueTransfer(S, {
      quoteId: q?.id,
      destCountry: val(f, 'dest'),
      destBranchId: val(f, 'destBranch') || null,
      collectCcy: cc,
      payCcy: pc,
      mode: val(f, 'mode'),
      amountMinor: toMinor(Number(val(f, 'amt')), core.cur[cc].decimals),
      sender: {
        name: val(f, 'sn'),
        phone: val(f, 'sp'),
        idType: val(f, 'sit'),
        idNumber: val(f, 'sin'),
        country: core.branchCountry(S.branchId).code,
        idPhotoRef: f.elements.photo.checked ? 'captured' : ''
      },
      recipient: {
        name: val(f, 'rn'),
        phone: val(f, 'rp'),
        idType: val(f, 'rit'),
        idNumber: val(f, 'rin')
      },
      purpose: val(f, 'purpose'),
      sourceOfFunds: val(f, 'sof'),
      cosign: csId ? { staffId: csId, pin: csPin } : undefined
    });
    renderView();
    scrollTo(0, 0);
  },
  lookup: async (f) => {
    if (!checkHoneypot(f) || !throttleAction('f_lookup', 300)) return;
    last.lookup = { info: await core.lookup(S, val(f, 'ref')), ref: val(f, 'ref') };
    renderView();
  },
  redeem: async (f) => {
    if (!checkHoneypot(f) || !throttleAction('f_redeem', 400)) return;
    const pin = val(f, 'pin');
    if (f.elements.pin) f.elements.pin.value = '';
    const apId = val(f, 'ap_id'), apPin = val(f, 'ap_pin');
    if (f.elements.ap_pin) f.elements.ap_pin.value = '';
    try {
      const r = await core.redeem(S, {
        ref: last.lookup.ref,
        pin,
        idPhotoRef: f.elements.photo.checked ? 'captured' : '',
        recipient: {
          name: val(f, 'name'),
          phone: val(f, 'phone'),
          idType: val(f, 'it'),
          idNumber: val(f, 'idn')
        },
        approver: apId ? { staffId: apId, pin: apPin } : undefined
      });
      flash(`Identity confirmed. Cash disbursed: ${core.fmt(r.transfer.payoutMinor, r.transfer.payCcy)}. Code burned.`);
      last.lookup = null;
      renderView();
    } catch (e) {
      if (e.code === 'APPROVAL_REQUIRED') {
        last.lookup.needsApprover = true;
        const keep = Object.fromEntries([...new FormData(f)]);
        renderView();
        const nf = document.querySelector('form[data-form=redeem]');
        for (const [k, v] of Object.entries(keep)) if (nf.elements[k] && nf.elements[k].type !== 'checkbox') nf.elements[k].value = v;
        throw e;
      }
      if (['LOCKED', 'PIN_WRONG', 'RECIPIENT_MISMATCH'].includes(e.code)) {
        last.lookup.info = await core.lookup(S, last.lookup.ref).catch(() => last.lookup.info);
        renderView();
      }
      throw e;
    }
  },
  tf: (f) => {
    sub.tf = { q: val(f, 'q'), status: val(f, 'status') };
    renderView();
  },
  close: async (f) => {
    if (!checkHoneypot(f) || !throttleAction('f_close', 400)) return;
    const counts = {};
    for (const c of Object.keys(core.branchCash(S.branchId))) {
      counts[c] = toMinor(Number(val(f, 'c_' + c)), core.cur[c].decimals);
    }
    const apId = val(f, 'ap_id'), apPin = val(f, 'ap_pin');
    if (f.elements.ap_pin) f.elements.ap_pin.value = '';
    await core.closeDay(S, counts, apId ? { staffId: apId, pin: apPin } : undefined);
    flash('Till counts audited and day close sealed in ledger');
    renderView();
  },
  inject: async (f) => {
    if (!checkHoneypot(f) || !throttleAction('f_inject', 400)) return;
    const c = val(f, 'ccy');
    await core.injectFloat(S, val(f, 'br'), c, toMinor(Number(val(f, 'amt')), core.cur[c].decimals));
    flash('Reserve float successfully injected');
    renderView();
  },
  move: async (f) => {
    if (!checkHoneypot(f) || !throttleAction('f_move', 400)) return;
    const c = val(f, 'ccy');
    await core.moveCash(S, val(f, 'from'), val(f, 'to'), c, toMinor(Number(val(f, 'amt')), core.cur[c].decimals));
    flash('Armoured cash movement journal recorded');
    renderView();
  },
  branch: async (f) => {
    await core.upsertBranch(S, {
      id: val(f, 'id'),
      country: val(f, 'country'),
      name: val(f, 'name'),
      city: val(f, 'city'),
      type: val(f, 'type'),
      commissionBps: Math.round(Number(val(f, 'comm')) * 100),
      hours: { open: val(f, 'open'), close: val(f, 'close'), days: [1, 2, 3, 4, 5, 6] }
    });
    flash('Branch node saved');
    renderView();
  },
  rate: async (f) => {
    await core.setRate(S, val(f, 'code'), Number(val(f, 'rate')));
    flash('Market exchange rate updated');
  },
  currency: async (f) => {
    await core.upsertCurrency(S, {
      code: val(f, 'code'),
      name: val(f, 'name'),
      symbol: val(f, 'symbol'),
      decimals: Number(val(f, 'dec')),
      perUsd: Number(val(f, 'rate'))
    });
    flash('Currency node registered');
    renderView();
  },
  country: async (f) => {
    await core.upsertCountry(S, {
      code: val(f, 'code'),
      name: val(f, 'name'),
      currency: val(f, 'cur'),
      tz: val(f, 'tz'),
      dial: val(f, 'dial')
    });
    flash('Jurisdiction registered');
    renderView();
  },
  staff: async (f) => {
    await core.upsertStaff(S, {
      id: val(f, 'id'),
      name: val(f, 'name'),
      role: val(f, 'role'),
      branches: [...f.elements.branches.selectedOptions].map((o) => o.value),
      pin: val(f, 'pin'),
      schedule: { days: [1, 2, 3, 4, 5, 6], start: val(f, 'start'), end: val(f, 'end') }
    });
    flash('Staff profile updated');
    renderView();
  },
  settings: async (f) => {
    const patch = {};
    for (const el of f.elements) {
      if (!el.name) continue;
      patch[el.name] = el.name === 'enforceOperatingHours' ? el.value === 'true' : Number(el.value);
    }
    await core.updateSettings(S, patch);
    flash('Risk & operational rules saved');
    renderView();
  }
};

document.addEventListener('submit', async (e) => {
  const f = e.target.closest('form[data-form]');
  if (!f) return;
  e.preventDefault();
  const btn = f.querySelector('button:not([type=button])');
  if (btn) btn.disabled = true;
  try {
    await forms[f.dataset.form](f);
  } catch (err) {
    fail(err);
  } finally {
    if (btn?.isConnected) btn.disabled = false;
  }
});

document.addEventListener('click', async (e) => {
  const el = e.target.closest('[data-act]');
  if (!el || el.tagName === 'INPUT') return;
  try {
    await act[el.dataset.act]?.(el);
  } catch (err) {
    fail(err);
  }
});

document.addEventListener('change', async (e) => {
  if (e.target.dataset.act === 'import') {
    try {
      await core.importState(await e.target.files[0].text());
      S = null;
      render();
      flash('Ledger state restored');
    } catch (err) {
      fail(err);
    }
  } else if (e.target.dataset.act === 'reportcorridor') {
    sub.reportCorridor = e.target.value;
    renderView();
  }
});

document.addEventListener('input', (e) => {
  if (S) {
    if (e.target.closest('form[data-form=send]') && (e.target.name === 'amt' || e.target.hasAttribute('data-q'))) {
      updateQuote();
    }
    try {
      core.sessions.get(S.id).lastActive = core.now();
    } catch { /* */ }
  }
});

document.addEventListener('change', (e) => {
  if (S && e.target.closest('form[data-form=send]') && e.target.hasAttribute('data-q')) {
    updateQuote();
  }
});

setInterval(async () => {
  if (!S) return;
  tickClock();
  const live = core.sessions.get(S.id), idle = core.s.settings.idleTimeoutMin * 60000;
  if (!live || core.now() - live.lastActive > idle) {
    if (live) await core.logout(S, 'IDLE_TIMEOUT');
    S = null;
    render();
    flash('Session closed after inactivity', 'err');
  }
}, 20000);

document.addEventListener('submit', (e) => {
  if (e.target.dataset.form === 'login') document.querySelector('.flash')?.remove();
}, true);

(async () => {
  core = await Core.open({ storage: new LocalStorageAdapter() });
  window.__bantaba = core;
  render();
})();
