/* =============================================
   BANTABA REMITTANCE OPERATING SYSTEM
   Core Application Logic
   ============================================= */

// --------------- GLOBAL CONSTANTS ---------------
const CURRENCIES = [
  { code: 'CNY', name: 'Chinese Yuan', symbol: '\u00a5', flag: '\ud83c\udde8\ud83c\uddf3' },
  { code: 'GBP', name: 'British Pound', symbol: '\u00a3', flag: '\ud83c\uddec\ud83c\udde7' },
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '\ud83c\uddfa\ud83c\uddf8' },
  { code: 'EUR', name: 'Euro', symbol: '\u20ac', flag: '\ud83c\uddea\ud83c\uddfa' },
  { code: 'AED', name: 'UAE Dirham', symbol: 'AED', flag: '\ud83c\udde6\ud83c\uddea' },
  { code: 'GMD', name: 'Gambian Dalasi', symbol: 'D', flag: '\ud83c\uddec\ud83c\uddf2' },
  { code: 'XOF', name: 'CFA Franc', symbol: 'CFA', flag: '\ud83c\uddf8\ud83c\uddf3' },
  { code: 'GNF', name: 'Guinean Franc', symbol: 'FG', flag: '\ud83c\uddec\ud83c\uddf3' },
  { code: 'ZMW', name: 'Zambian Kwacha', symbol: 'ZK', flag: '\ud83c\uddff\ud83c\uddf2' },
  { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM', flag: '\ud83c\uddf2\ud83c\uddfe' }
];

const BRANCHES = {
  CANTON_GZ: { name: 'Guangzhou, China', currency: 'CNY' },
  YIWU_CN: { name: 'Yiwu, China', currency: 'CNY' },
  UK_LDN: { name: 'London, UK', currency: 'GBP' },
  UK_MCR: { name: 'Manchester, UK', currency: 'GBP' },
  US_NYC: { name: 'New York, USA', currency: 'USD' },
  US_ATL: { name: 'Atlanta, USA', currency: 'USD' },
  DE_BER: { name: 'Berlin, Germany', currency: 'EUR' },
  FR_PAR: { name: 'Paris, France', currency: 'EUR' },
  AE_DXB: { name: 'Dubai, UAE', currency: 'AED' },
  GM_BJL: { name: 'Banjul, Gambia', currency: 'GMD' },
  GM_SKD: { name: 'Serrekunda, Gambia', currency: 'GMD' },
  SN_DKR: { name: 'Dakar, Senegal', currency: 'XOF' },
  SN_ZIG: { name: 'Ziguinchor, Senegal', currency: 'XOF' },
  ML_BMK: { name: 'Bamako, Mali', currency: 'XOF' },
  GW_BSU: { name: 'Bissau, Guinea-Bissau', currency: 'XOF' },
  GN_CKY: { name: 'Conakry, Guinea', currency: 'GNF' },
  ZM_LSK: { name: 'Lusaka, Zambia', currency: 'ZMW' }
};

// --------------- STATE ---------------
let currentSession = null;
let sessionTimer = null;
let selectedSendCurrency = 'CNY';

// Persistent stores (localStorage backed)
let transactions = [];
let auditLogs = [];
let vaults = {};
let staffList = [];
let sessionLogs = [];
let sysMetrics = {};
let rates = {};
let fees = {};

// --------------- PERSISTENCE ---------------
function saveState() {
  localStorage.setItem('bnt_transactions', JSON.stringify(transactions));
  localStorage.setItem('bnt_auditLogs', JSON.stringify(auditLogs));
  localStorage.setItem('bnt_vaults', JSON.stringify(vaults));
  localStorage.setItem('bnt_staffList', JSON.stringify(staffList));
  localStorage.setItem('bnt_sessionLogs', JSON.stringify(sessionLogs));
  localStorage.setItem('bnt_sysMetrics', JSON.stringify(sysMetrics));
  localStorage.setItem('bnt_rates', JSON.stringify(rates));
  localStorage.setItem('bnt_fees', JSON.stringify(fees));
}

function loadState() {
  try { transactions = JSON.parse(localStorage.getItem('bnt_transactions')) || []; } catch(e) { transactions = []; }
  try { auditLogs = JSON.parse(localStorage.getItem('bnt_auditLogs')) || []; } catch(e) { auditLogs = []; }
  try { vaults = JSON.parse(localStorage.getItem('bnt_vaults')) || {}; } catch(e) { vaults = {}; }
  try { staffList = JSON.parse(localStorage.getItem('bnt_staffList')) || []; } catch(e) { staffList = []; }
  try { sessionLogs = JSON.parse(localStorage.getItem('bnt_sessionLogs')) || []; } catch(e) { sessionLogs = []; }
  try { sysMetrics = JSON.parse(localStorage.getItem('bnt_sysMetrics')) || {}; } catch(e) { sysMetrics = {}; }
  try { rates = JSON.parse(localStorage.getItem('bnt_rates')) || {}; } catch(e) { rates = {}; }
  try { fees = JSON.parse(localStorage.getItem('bnt_fees')) || {}; } catch(e) { fees = {}; }
}

function initDefaultData() {
  // Default FX rates (base: 1 unit of source = X units of destination)
  if (Object.keys(rates).length === 0) {
    rates = {
      CNY_GMD: 9.85, CNY_XOF: 83.50, CNY_GNF: 1185.0, CNY_GBP: 0.11, CNY_USD: 0.14, CNY_EUR: 0.13, CNY_AED: 0.50, CNY_ZMW: 3.85, CNY_MYR: 0.65,
      GBP_GMD: 87.50, GBP_XOF: 740.0, GBP_GNF: 10800.0, GBP_CNY: 9.10, GBP_USD: 1.27, GBP_EUR: 1.17, GBP_AED: 4.66, GBP_ZMW: 34.50, GBP_MYR: 5.85,
      USD_GMD: 69.00, USD_XOF: 585.0, USD_GNF: 8600.0, USD_CNY: 7.24, USD_GBP: 0.79, USD_EUR: 0.92, USD_AED: 3.67, USD_ZMW: 27.20, USD_MYR: 4.62,
      EUR_GMD: 75.00, EUR_XOF: 655.96, EUR_GNF: 9350.0, EUR_CNY: 7.85, EUR_GBP: 0.86, EUR_USD: 1.09, EUR_AED: 3.99, EUR_ZMW: 29.50, EUR_MYR: 5.01,
      AED_GMD: 18.80, AED_XOF: 159.0, AED_GNF: 2340.0, AED_CNY: 1.97, AED_GBP: 0.21, AED_USD: 0.27, AED_EUR: 0.25, AED_ZMW: 7.40, AED_MYR: 1.26,
      GMD_CNY: 0.10, GMD_GBP: 0.011, GMD_USD: 0.014, GMD_EUR: 0.013, GMD_AED: 0.053, GMD_XOF: 8.48, GMD_GNF: 124.0, GMD_ZMW: 0.39, GMD_MYR: 0.066,
      XOF_CNY: 0.012, XOF_GBP: 0.0014, XOF_USD: 0.0017, XOF_EUR: 0.0015, XOF_AED: 0.0063, XOF_GMD: 0.118, XOF_GNF: 14.62, XOF_ZMW: 0.046, XOF_MYR: 0.0079,
      GNF_CNY: 0.00084, GNF_GBP: 0.000093, GNF_USD: 0.00012, GNF_EUR: 0.00011, GNF_AED: 0.00043, GNF_GMD: 0.0081, GNF_XOF: 0.068, GNF_ZMW: 0.0032, GNF_MYR: 0.00054,
      ZMW_CNY: 0.26, ZMW_GBP: 0.029, ZMW_USD: 0.037, ZMW_EUR: 0.034, ZMW_AED: 0.135, ZMW_GMD: 2.54, ZMW_XOF: 21.50, ZMW_GNF: 316.0, ZMW_MYR: 0.17,
      MYR_CNY: 1.54, MYR_GBP: 0.171, MYR_USD: 0.216, MYR_EUR: 0.20, MYR_AED: 0.794, MYR_GMD: 15.10, MYR_XOF: 126.5, MYR_GNF: 1862.0, MYR_ZMW: 5.88
    };
  }
  // Default fees (flat fee in source currency per transaction)
  if (Object.keys(fees).length === 0) {
    fees = { CNY: 50, GBP: 5, USD: 7, EUR: 6, AED: 25, GMD: 150, XOF: 1500, GNF: 25000, ZMW: 50, MYR: 15 };
  }
  // Default vaults (initial float per branch)
  if (Object.keys(vaults).length === 0) {
    Object.entries(BRANCHES).forEach(function(entry) {
      var code = entry[0], info = entry[1];
      vaults[code] = {};
      CURRENCIES.forEach(function(c) { vaults[code][c.code] = (c.code === info.currency) ? 5000000 : 0; });
    });
  }
  // Default staff
  if (staffList.length === 0) {
    staffList = [
      { id: 'TEL-8842', name: 'Abdoulie Jallow', role: 'ADMIN', branch: 'CANTON_GZ', pin: '1234', active: true, totalHours: 0, lastLogin: null },
      { id: 'TEL-3391', name: 'Fatou Ceesay', role: 'CASHIER', branch: 'GM_BJL', pin: '1234', active: true, totalHours: 0, lastLogin: null },
      { id: 'TEL-7720', name: 'Lamin Darboe', role: 'SUPERVISOR', branch: 'UK_LDN', pin: '1234', active: true, totalHours: 0, lastLogin: null }
    ];
  }
  // Default metrics
  if (Object.keys(sysMetrics).length === 0) {
    sysMetrics = { lowVaultThreshold: 500000, maxTxAmount: 50000, kycLimit: 10000, sessionTimeout: 480 };
  }
  saveState();
}

// --------------- INIT ---------------
function initSystem() {
  loadState();
  initDefaultData();
  buildCurrencyGrid();
  buildDestCurrencySelect();
  calculateRates();
}

// --------------- AUTH ---------------
function handleLogin(event) {
  event.preventDefault();
  var staffId = document.getElementById('staffId').value.trim();
  var pin = document.getElementById('terminalPin').value.trim();
  var branch = document.getElementById('branchSelect').value;
  var role = document.getElementById('roleSelect').value;

  var staff = staffList.find(function(s) { return s.id === staffId; });
  if (!staff) { alert('Staff ID not found in register.'); return; }
  if (staff.pin !== pin) { alert('Incorrect PIN.'); return; }
  if (!staff.active) { alert('This staff account has been deactivated. Contact your administrator.'); return; }

  currentSession = { staffId: staffId, staffName: staff.name, branch: branch, role: role, loginTime: Date.now() };
  staff.lastLogin = new Date().toISOString();
  sessionLogs.push({ time: new Date().toISOString(), staffId: staffId, branch: branch, role: role, event: 'LOGIN', duration: null });
  saveState();

  document.getElementById('loginOverlay').classList.add('hidden');
  document.getElementById('mainApp').classList.remove('hidden');
  document.getElementById('activeBranchDisplay').textContent = (BRANCHES[branch] || {}).name || branch;
  document.getElementById('activeStaffDisplay').textContent = staffId + ' / ' + staff.name;
  document.getElementById('roleBadge').textContent = role;

  // Role based tab visibility
  document.querySelectorAll('.role-admin').forEach(function(el) { el.style.display = (role === 'ADMIN') ? '' : 'none'; });
  document.querySelectorAll('.role-supervisor').forEach(function(el) { el.style.display = (role === 'ADMIN' || role === 'SUPERVISOR') ? '' : 'none'; });
  document.querySelectorAll('.role-compliance').forEach(function(el) { el.style.display = (role === 'ADMIN' || role === 'COMPLIANCE') ? '' : 'none'; });

  logAudit('SESSION_OPEN', 'Staff ' + staffId + ' authenticated at ' + branch + ' as ' + role);

  sessionTimer = setInterval(updateSessionClock, 1000);
  switchTab('send');
}

function handleLogout() {
  if (!currentSession) return;
  var dur = Math.round((Date.now() - currentSession.loginTime) / 60000);
  var staff = staffList.find(function(s) { return s.id === currentSession.staffId; });
  if (staff) staff.totalHours = (staff.totalHours || 0) + dur / 60;

  sessionLogs.push({ time: new Date().toISOString(), staffId: currentSession.staffId, branch: currentSession.branch, role: currentSession.role, event: 'LOGOUT', duration: dur + ' min' });
  logAudit('SESSION_CLOSE', 'Staff ' + currentSession.staffId + ' logged out after ' + dur + ' minutes');
  saveState();

  clearInterval(sessionTimer);
  currentSession = null;
  document.getElementById('mainApp').classList.add('hidden');
  document.getElementById('loginOverlay').classList.remove('hidden');
}

function updateSessionClock() {
  if (!currentSession) return;
  var elapsed = Math.floor((Date.now() - currentSession.loginTime) / 1000);
  var h = String(Math.floor(elapsed / 3600)).padStart(2, '0');
  var m = String(Math.floor((elapsed % 3600) / 60)).padStart(2, '0');
  var s = String(elapsed % 60).padStart(2, '0');
  document.getElementById('sessionClockDisplay').textContent = h + ':' + m + ':' + s;
}

// --------------- TAB NAV ---------------
function switchTab(tab) {
  var views = ['send', 'payout', 'analytics', 'ledger', 'treasury', 'audit', 'admin'];
  views.forEach(function(v) {
    var el = document.getElementById('view-' + v);
    var btn = document.getElementById('tab-' + v);
    if (el) el.classList.toggle('hidden', v !== tab);
    if (btn) btn.classList.toggle('active-tab', v === tab);
  });
  if (tab === 'analytics') refreshAnalytics();
  if (tab === 'ledger') updateLedgerTable();
  if (tab === 'treasury') renderVaultGrid();
  if (tab === 'audit') renderAuditTable();
  if (tab === 'admin') refreshAdminPanel();
  if (tab === 'payout') renderPendingQueue();
}

// --------------- CURRENCY GRID ---------------
function buildCurrencyGrid() {
  var grid = document.getElementById('sendCurrencyGrid');
  grid.innerHTML = '';
  CURRENCIES.forEach(function(c) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'currency-key rounded-xl py-3 px-2 text-center' + (c.code === selectedSendCurrency ? ' active' : '');
    btn.innerHTML = '<span class="text-lg block">' + c.flag + '</span><span class="text-[10px] font-mono font-bold block mt-0.5">' + c.code + '</span>';
    btn.onclick = function() { selectSendCurrency(c.code); };
    grid.appendChild(btn);
  });
}

function selectSendCurrency(code) {
  selectedSendCurrency = code;
  buildCurrencyGrid();
  buildDestCurrencySelect();
  calculateRates();
}

function buildDestCurrencySelect() {
  var sel = document.getElementById('destCurrency');
  sel.innerHTML = '';
  CURRENCIES.forEach(function(c) {
    if (c.code === selectedSendCurrency) return;
    var opt = document.createElement('option');
    opt.value = c.code;
    opt.textContent = c.flag + ' ' + c.code + ' - ' + c.name;
    sel.appendChild(opt);
  });
}

// --------------- FX CALCULATION ---------------
function getExchangeRate(src, dst) {
  if (!src || !dst) return 1;
  if (src === dst) return 1;
  var key = src + '_' + dst;
  if (rates[key] !== undefined && rates[key] !== null && rates[key] > 0) {
    return rates[key];
  }
  var invKey = dst + '_' + src;
  if (rates[invKey] !== undefined && rates[invKey] > 0) {
    return 1 / rates[invKey];
  }
  // Anchor rates to 1 USD
  var USD_BASE = {
    USD: 1.0,
    CNY: 7.24,
    GBP: 0.79,
    EUR: 0.92,
    AED: 3.67,
    GMD: 69.00,
    XOF: 585.00,
    GNF: 8600.00,
    ZMW: 27.20,
    MYR: 4.62
  };
  var srcPerUsd = USD_BASE[src] || 1;
  var dstPerUsd = USD_BASE[dst] || 1;
  return dstPerUsd / srcPerUsd;
}

function calculateRates() {
  var src = selectedSendCurrency;
  var dst = document.getElementById('destCurrency').value;
  var amount = parseFloat(document.getElementById('sendAmount').value) || 0;
  if (!dst || !src) return;

  var rate = getExchangeRate(src, dst);
  var fee = fees[src] || 0;
  var payout = (amount - fee) * rate;
  if (payout < 0) payout = 0;

  var srcInfo = CURRENCIES.find(function(c) { return c.code === src; }) || {};
  var dstInfo = CURRENCIES.find(function(c) { return c.code === dst; }) || {};

  document.getElementById('fxRateDisplay').textContent = '1 ' + src + ' = ' + rate.toFixed(4) + ' ' + dst;
  document.getElementById('feeDisplay').textContent = (srcInfo.symbol || '') + ' ' + fee.toLocaleString() + ' ' + src;
  document.getElementById('payoutTotalDisplay').textContent = (dstInfo.symbol || '') + ' ' + payout.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' ' + dst;
}

// --------------- ISSUE REMITTANCE ---------------
function issueRemittance() {
  if (!currentSession) { alert('You must be logged in.'); return; }

  var src = selectedSendCurrency;
  var dst = document.getElementById('destCurrency').value;
  var amount = parseFloat(document.getElementById('sendAmount').value) || 0;
  var senderName = document.getElementById('senderName').value.trim();
  var senderPhone = document.getElementById('senderPhone').value.trim();
  var recipientName = document.getElementById('recipientName').value.trim();
  var recipientPhone = document.getElementById('recipientPhone').value.trim();
  var senderIdNumber = document.getElementById('senderIdNumber').value.trim();

  if (!senderName || !recipientName) { alert('Sender and recipient names are required.'); return; }
  if (!senderIdNumber) { alert('Sender ID or passport number is required for KYC compliance.'); return; }
  if (amount <= 0) { alert('Amount must be greater than zero.'); return; }
  if (amount > (sysMetrics.maxTxAmount || 50000)) { alert('Amount exceeds the single transaction limit of ' + (sysMetrics.maxTxAmount || 50000) + '. Contact your supervisor.'); return; }

  var rate = getExchangeRate(src, dst);
  var fee = fees[src] || 0;
  var payout = (amount - fee) * rate;
  if (payout <= 0) { alert('After fees, payout amount is zero or negative. Increase the send amount.'); return; }

  // Generate redemption code
  var code = 'BNT-' + randomHex(4).toUpperCase() + '-' + randomHex(2).toUpperCase();

  var tx = {
    id: 'TX-' + Date.now(),
    code: code,
    timestamp: new Date().toISOString(),
    sendBranch: currentSession.branch,
    staffId: currentSession.staffId,
    srcCurrency: src,
    dstCurrency: dst,
    sendAmount: amount,
    fee: fee,
    rate: rate,
    payoutAmount: payout,
    sender: { name: senderName, phone: senderPhone, idNumber: senderIdNumber },
    recipient: { name: recipientName, phone: recipientPhone },
    status: 'UNREDEEMED',
    redeemBranch: null,
    redeemStaff: null,
    redeemTime: null,
    recipientVerification: null
  };

  transactions.push(tx);

  // Double entry: debit vault (cash in), credit customer payable
  var vault = vaults[currentSession.branch] || {};
  vault[src] = (vault[src] || 0) + amount;
  vaults[currentSession.branch] = vault;

  logAudit('REMITTANCE_ISSUED', code + ' | ' + amount + ' ' + src + ' -> ' + payout.toFixed(2) + ' ' + dst + ' | Sender: ' + senderName + ' | Recipient: ' + recipientName);
  saveState();

  renderReceipt(tx);
  calculateRates();
}

function randomHex(len) {
  var result = '';
  var chars = '0123456789ABCDEF';
  for (var i = 0; i < len; i++) result += chars.charAt(Math.floor(Math.random() * chars.length));
  return result;
}

// --------------- RECEIPT ---------------
function renderReceipt(tx) {
  var srcInfo = CURRENCIES.find(function(c) { return c.code === tx.srcCurrency; }) || {};
  var dstInfo = CURRENCIES.find(function(c) { return c.code === tx.dstCurrency; }) || {};
  var branchName = (BRANCHES[tx.sendBranch] || {}).name || tx.sendBranch;

  var html = '<div id="printableReceipt" class="p-5 bg-sand-50 border border-sand-200 rounded-xl font-mono text-xs space-y-3 text-gray-700">';
  html += '<div class="text-center pb-2 border-b border-sand-200 flex flex-col items-center">';
  html += '<img src="assets/images/logo.png" alt="Bantaba Logo" class="h-10 w-auto object-contain mix-blend-multiply mb-1" onerror="this.style.display=\'none\'"/>';
  html += '<p class="text-sm font-bold text-brand-700">BANTABA</p>';
  html += '<p class="text-[9px] text-gray-500">Home, within reach.</p>';
  html += '<p class="text-[9px] text-gray-400">' + branchName + '</p>';
  html += '</div>';

  html += '<div class="text-center py-3"><p class="text-[10px] text-gray-500 uppercase font-bold">Redemption Code</p>';
  html += '<p class="text-2xl font-bold text-brand-700 tracking-widest">' + tx.code + '</p></div>';

  html += '<div class="space-y-1.5">';
  html += receiptRow('Date', new Date(tx.timestamp).toLocaleString());
  html += receiptRow('Transaction', tx.id);
  html += receiptRow('Sender', tx.sender.name);
  html += receiptRow('Sender Phone', tx.sender.phone || 'N/A');
  html += receiptRow('Sender ID', tx.sender.idNumber);
  html += receiptRow('Recipient', tx.recipient.name);
  html += receiptRow('Recipient Phone', tx.recipient.phone || 'N/A');
  html += receiptRow('Collected', (srcInfo.symbol || '') + ' ' + tx.sendAmount.toLocaleString() + ' ' + tx.srcCurrency);
  html += receiptRow('Fee', (srcInfo.symbol || '') + ' ' + tx.fee.toLocaleString() + ' ' + tx.srcCurrency);
  html += receiptRow('Rate', '1 ' + tx.srcCurrency + ' = ' + tx.rate.toFixed(4) + ' ' + tx.dstCurrency);
  html += '<div class="h-px bg-sand-200 my-1"></div>';
  html += '<div class="flex justify-between items-center font-bold text-sm text-brand-700"><span>Payout</span><span>' + (dstInfo.symbol || '') + ' ' + tx.payoutAmount.toLocaleString(undefined, { minimumFractionDigits: 2 }) + ' ' + tx.dstCurrency + '</span></div>';
  html += '</div>';

  html += '<div class="text-center pt-2 border-t border-sand-200 space-y-1">';
  html += '<p class="text-[9px] text-gray-500">Present this receipt and a valid government ID to collect your funds at any Bantaba counter worldwide.</p>';
  html += '<p class="text-[9px] text-gray-400">Served by ' + tx.staffId + ' at ' + branchName + '</p>';
  html += '</div>';

  html += '<div class="text-center no-print"><button onclick="window.print()" class="mt-2 px-4 py-1.5 bg-brand-600 text-white rounded-lg text-[10px] font-bold uppercase hover:bg-brand-700 transition">Print Receipt</button></div>';
  html += '</div>';

  document.getElementById('receiptContainer').innerHTML = html;
}

function receiptRow(label, value) {
  return '<div class="flex justify-between"><span class="text-gray-500">' + label + '</span><span class="font-semibold text-gray-800 text-right">' + value + '</span></div>';
}

// --------------- PAYOUT ---------------
function renderPendingQueue() {
  var container = document.getElementById('pendingCodesQueue');
  var pending = transactions.filter(function(t) { return t.status === 'UNREDEEMED'; });
  if (pending.length === 0) {
    container.innerHTML = '<span class="text-xs text-gray-400 italic">No pending redemptions in queue.</span>';
    return;
  }
  container.innerHTML = '';
  pending.forEach(function(tx) {
    var badge = document.createElement('button');
    badge.className = 'px-3 py-1.5 bg-amber-50 text-amber-800 border border-amber-200 rounded-lg text-xs font-mono font-bold hover:bg-amber-100 transition';
    badge.textContent = tx.code;
    badge.onclick = function() {
      document.getElementById('redemptionCodeInput').value = tx.code;
      verifyCode();
    };
    container.appendChild(badge);
  });
}

function verifyCode() {
  var code = document.getElementById('redemptionCodeInput').value.trim().toUpperCase();
  var resultDiv = document.getElementById('verificationResult');
  var recipientForm = document.getElementById('recipientVerifyForm');
  recipientForm.classList.add('hidden');

  var tx = transactions.find(function(t) { return t.code === code; });
  if (!tx) {
    resultDiv.className = 'p-5 rounded-xl border border-red-300 bg-red-50 space-y-4';
    resultDiv.innerHTML = '<p class="text-sm font-bold text-red-700">Code Not Found</p><p class="text-xs text-red-600">The redemption code "' + code + '" does not exist in the system.</p>';
    resultDiv.classList.remove('hidden');
    return;
  }
  if (tx.status === 'REDEEMED') {
    resultDiv.className = 'p-5 rounded-xl border border-gray-300 bg-gray-50 space-y-4';
    resultDiv.innerHTML = '<p class="text-sm font-bold text-gray-700">Already Disbursed</p><p class="text-xs text-gray-600">This code was redeemed on ' + new Date(tx.redeemTime).toLocaleString() + ' at ' + ((BRANCHES[tx.redeemBranch] || {}).name || tx.redeemBranch) + ' by ' + tx.redeemStaff + '</p>';
    resultDiv.classList.remove('hidden');
    return;
  }

  var dstInfo = CURRENCIES.find(function(c) { return c.code === tx.dstCurrency; }) || {};
  resultDiv.className = 'p-5 rounded-xl border border-emerald-300 bg-emerald-50 space-y-4';
  var h = '<p class="text-sm font-bold text-emerald-700">Valid Redemption Code</p>';
  h += '<div class="grid grid-cols-2 gap-2 text-xs">';
  h += '<div><span class="text-gray-500 block">Sender</span><span class="font-semibold">' + tx.sender.name + '</span></div>';
  h += '<div><span class="text-gray-500 block">Recipient</span><span class="font-semibold">' + tx.recipient.name + '</span></div>';
  h += '<div><span class="text-gray-500 block">Payout Amount</span><span class="font-bold text-lg text-brand-700">' + (dstInfo.symbol || '') + ' ' + tx.payoutAmount.toLocaleString(undefined, { minimumFractionDigits: 2 }) + ' ' + tx.dstCurrency + '</span></div>';
  h += '<div><span class="text-gray-500 block">Issued</span><span class="font-semibold">' + new Date(tx.timestamp).toLocaleString() + '</span></div>';
  h += '</div>';
  resultDiv.innerHTML = h;
  resultDiv.classList.remove('hidden');

  // Show recipient verification form
  recipientForm.classList.remove('hidden');
  document.getElementById('verifyRecipientName').value = '';
  document.getElementById('verifyRecipientPhone').value = '';
  document.getElementById('verifyRecipientId').value = '';
}

function confirmAndDisburse() {
  var code = document.getElementById('redemptionCodeInput').value.trim().toUpperCase();
  var tx = transactions.find(function(t) { return t.code === code && t.status === 'UNREDEEMED'; });
  if (!tx) { alert('Transaction not found or already redeemed.'); return; }
  if (!currentSession) { alert('You must be logged in.'); return; }

  var vName = document.getElementById('verifyRecipientName').value.trim();
  var vPhone = document.getElementById('verifyRecipientPhone').value.trim();
  var vId = document.getElementById('verifyRecipientId').value.trim();

  if (!vName || !vId) { alert('Recipient name and government ID number are required for verification.'); return; }

  tx.status = 'REDEEMED';
  tx.redeemBranch = currentSession.branch;
  tx.redeemStaff = currentSession.staffId;
  tx.redeemTime = new Date().toISOString();
  tx.recipientVerification = { name: vName, phone: vPhone, idNumber: vId, verifiedBy: currentSession.staffId, verifiedAt: new Date().toISOString() };

  // Debit payout vault
  var vault = vaults[currentSession.branch] || {};
  vault[tx.dstCurrency] = (vault[tx.dstCurrency] || 0) - tx.payoutAmount;
  vaults[currentSession.branch] = vault;

  logAudit('CASH_DISBURSED', tx.code + ' | ' + tx.payoutAmount.toFixed(2) + ' ' + tx.dstCurrency + ' paid to ' + vName + ' (ID: ' + vId + ') at ' + currentSession.branch);
  saveState();

  document.getElementById('recipientVerifyForm').classList.add('hidden');
  var resultDiv = document.getElementById('verificationResult');
  resultDiv.className = 'p-5 rounded-xl border border-brand-300 bg-brand-50 space-y-2';
  resultDiv.innerHTML = '<p class="text-sm font-bold text-brand-700">Cash Released Successfully</p><p class="text-xs text-gray-600">Code ' + tx.code + ' has been fully redeemed and closed. ' + tx.payoutAmount.toFixed(2) + ' ' + tx.dstCurrency + ' disbursed to ' + vName + '.</p>';

  renderPendingQueue();
}

// --------------- ANALYTICS ---------------
function refreshAnalytics() {
  var totalUSD = 0;
  var corridors = {};
  transactions.forEach(function(tx) {
    var usdRate = rates['USD_' + tx.srcCurrency] || rates[tx.srcCurrency + '_USD'] || 1;
    var usdEquiv = (rates[tx.srcCurrency + '_USD']) ? tx.sendAmount * rates[tx.srcCurrency + '_USD'] : tx.sendAmount / (usdRate || 1);
    totalUSD += usdEquiv;
    var corridor = tx.srcCurrency + ' \u2192 ' + tx.dstCurrency;
    corridors[corridor] = (corridors[corridor] || 0) + 1;
  });

  document.getElementById('analyticsTotalVolume').innerHTML = '$' + totalUSD.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' <span class="text-xs font-sans text-brand-100 font-normal">USD Equivalent</span>';

  var corridorGrid = document.getElementById('corridorBreakdownGrid');
  corridorGrid.innerHTML = '';
  Object.entries(corridors).sort(function(a, b) { return b[1] - a[1]; }).slice(0, 10).forEach(function(entry) {
    var d = document.createElement('div');
    d.className = 'text-center';
    d.innerHTML = '<span class="block text-brand-100 text-[9px] uppercase">' + entry[0] + '</span><span class="block text-white font-bold text-lg">' + entry[1] + '</span>';
    corridorGrid.appendChild(d);
  });

  var unredeemed = transactions.filter(function(t) { return t.status === 'UNREDEEMED'; }).length;
  var redeemed = transactions.filter(function(t) { return t.status === 'REDEEMED'; }).length;
  document.getElementById('statTotalTx').textContent = transactions.length;
  document.getElementById('statUnredeemedTx').textContent = unredeemed;
  document.getElementById('statRedeemedTx').textContent = redeemed;
  document.getElementById('statActiveStaff').textContent = staffList.filter(function(s) { return s.active; }).length;
}

// --------------- LEDGER ---------------
function updateLedgerTable() {
  var filter = document.getElementById('ledgerFilterSelect').value;
  var filtered = transactions;
  if (filter !== 'ALL') filtered = transactions.filter(function(t) { return t.status === filter; });

  var tbody = document.getElementById('ledgerTableBody');
  tbody.innerHTML = '';
  filtered.slice().reverse().forEach(function(tx) {
    var srcInfo = CURRENCIES.find(function(c) { return c.code === tx.srcCurrency; }) || {};
    var dstInfo = CURRENCIES.find(function(c) { return c.code === tx.dstCurrency; }) || {};
    var branchName = (BRANCHES[tx.sendBranch] || {}).name || tx.sendBranch;

    // Debit row (cash received)
    var row1 = document.createElement('tr');
    row1.innerHTML = '<td class="py-2 px-3 text-gray-500">' + new Date(tx.timestamp).toLocaleString() + '</td>'
      + '<td class="py-2 px-3 font-bold text-brand-700">' + tx.code + '</td>'
      + '<td class="py-2 px-3">' + branchName + '</td>'
      + '<td class="py-2 px-3">1010 CASH_VAULT (' + tx.srcCurrency + ')</td>'
      + '<td class="py-2 px-3 text-right font-bold text-emerald-700">' + tx.sendAmount.toLocaleString() + '</td>'
      + '<td class="py-2 px-3 text-right">-</td>'
      + '<td class="py-2 px-3 text-center"><span class="px-2 py-0.5 rounded text-[10px] font-bold ' + statusClass(tx.status) + '">' + tx.status + '</span></td>'
      + '<td class="py-2 px-3 text-center">' + (tx.status === 'UNREDEEMED' ? '<button onclick="cancelTx(\'' + tx.id + '\')" class="text-red-500 hover:text-red-700 text-[10px] font-bold">Cancel</button>' : '-') + '</td>';
    tbody.appendChild(row1);

    // Credit row (customer payable)
    var row2 = document.createElement('tr');
    row2.className = 'bg-gray-50/60';
    row2.innerHTML = '<td class="py-2 px-3"></td><td class="py-2 px-3"></td><td class="py-2 px-3"></td>'
      + '<td class="py-2 px-3">2010 CUST_PAYABLE (' + tx.dstCurrency + ')</td>'
      + '<td class="py-2 px-3 text-right">-</td>'
      + '<td class="py-2 px-3 text-right font-bold text-red-600">' + tx.payoutAmount.toLocaleString(undefined, { minimumFractionDigits: 2 }) + '</td>'
      + '<td class="py-2 px-3"></td><td class="py-2 px-3"></td>';
    tbody.appendChild(row2);

    // Fee revenue row
    if (tx.fee > 0) {
      var row3 = document.createElement('tr');
      row3.className = 'bg-gray-50/30';
      row3.innerHTML = '<td class="py-2 px-3"></td><td class="py-2 px-3"></td><td class="py-2 px-3"></td>'
        + '<td class="py-2 px-3">4020 COUNTER_FEE_REV (' + tx.srcCurrency + ')</td>'
        + '<td class="py-2 px-3 text-right">-</td>'
        + '<td class="py-2 px-3 text-right font-semibold text-blue-600">' + tx.fee.toLocaleString() + '</td>'
        + '<td class="py-2 px-3"></td><td class="py-2 px-3"></td>';
      tbody.appendChild(row3);
    }
  });
}

function statusClass(s) {
  if (s === 'UNREDEEMED') return 'bg-amber-100 text-amber-800';
  if (s === 'REDEEMED') return 'bg-emerald-100 text-emerald-800';
  if (s === 'CANCELLED') return 'bg-red-100 text-red-800';
  return 'bg-gray-100 text-gray-600';
}

function cancelTx(id) {
  var tx = transactions.find(function(t) { return t.id === id; });
  if (!tx || tx.status !== 'UNREDEEMED') return;
  if (!confirm('Cancel transaction ' + tx.code + '? This will reverse the journal entry.')) return;

  tx.status = 'CANCELLED';
  // Reverse vault entry
  var vault = vaults[tx.sendBranch] || {};
  vault[tx.srcCurrency] = (vault[tx.srcCurrency] || 0) - tx.sendAmount;
  vaults[tx.sendBranch] = vault;

  logAudit('TX_CANCELLED', tx.code + ' cancelled by ' + (currentSession ? currentSession.staffId : 'SYSTEM'));
  saveState();
  updateLedgerTable();
}

function exportLedgerCSV() {
  var rows = [['Timestamp', 'Code', 'Branch', 'Source', 'Destination', 'Amount', 'Fee', 'Rate', 'Payout', 'Status', 'Sender', 'Recipient']];
  transactions.forEach(function(tx) {
    rows.push([tx.timestamp, tx.code, tx.sendBranch, tx.srcCurrency, tx.dstCurrency, tx.sendAmount, tx.fee, tx.rate, tx.payoutAmount, tx.status, tx.sender.name, tx.recipient.name]);
  });
  downloadCSV(rows, 'bantaba_ledger_' + new Date().toISOString().slice(0, 10) + '.csv');
}

// --------------- TREASURY / VAULTS ---------------
function renderVaultGrid() {
  var grid = document.getElementById('vaultGrid');
  grid.innerHTML = '';
  Object.entries(vaults).forEach(function(entry) {
    var branchCode = entry[0], currencies = entry[1];
    var branchInfo = BRANCHES[branchCode] || { name: branchCode };
    var card = document.createElement('div');
    card.className = 'tactile-card p-5 space-y-3';

    var header = '<div class="flex items-center justify-between"><span class="text-xs font-bold text-gray-800">' + branchInfo.name + '</span><span class="text-[10px] font-mono text-gray-400">' + branchCode + '</span></div>';
    var balances = '';
    Object.entries(currencies).forEach(function(ce) {
      var cur = ce[0], bal = ce[1];
      if (bal === 0) return;
      var info = CURRENCIES.find(function(c) { return c.code === cur; }) || {};
      var isLow = bal > 0 && bal < (sysMetrics.lowVaultThreshold || 500000);
      balances += '<div class="flex justify-between items-center text-xs"><span class="text-gray-600">' + (info.flag || '') + ' ' + cur + '</span><span class="font-mono font-bold ' + (isLow ? 'text-red-600' : 'text-gray-800') + '">' + (info.symbol || '') + ' ' + bal.toLocaleString(undefined, { minimumFractionDigits: 2 }) + (isLow ? ' LOW' : '') + '</span></div>';
    });
    card.innerHTML = header + '<div class="space-y-1">' + balances + '</div>';
    grid.appendChild(card);
  });
}

function openTopUpModal() {
  var sel = document.getElementById('topUpVaultSelect');
  sel.innerHTML = '';
  Object.entries(BRANCHES).forEach(function(entry) {
    CURRENCIES.forEach(function(c) {
      var opt = document.createElement('option');
      opt.value = entry[0] + '|' + c.code;
      opt.textContent = entry[1].name + ' - ' + c.code;
      sel.appendChild(opt);
    });
  });
  document.getElementById('topUpModal').classList.remove('hidden');
}
function closeTopUpModal() { document.getElementById('topUpModal').classList.add('hidden'); }

function executeVaultTopUp() {
  var parts = document.getElementById('topUpVaultSelect').value.split('|');
  var branch = parts[0], cur = parts[1];
  var amount = parseFloat(document.getElementById('topUpAmountInput').value) || 0;
  if (amount <= 0) return;

  if (!vaults[branch]) vaults[branch] = {};
  vaults[branch][cur] = (vaults[branch][cur] || 0) + amount;
  logAudit('VAULT_TOPUP', branch + ' ' + cur + ' +' + amount.toLocaleString() + ' by ' + (currentSession ? currentSession.staffId : 'SYSTEM'));
  saveState();
  closeTopUpModal();
  renderVaultGrid();
}

// --------------- AUDIT ---------------
function logAudit(action, detail) {
  auditLogs.push({
    timestamp: new Date().toISOString(),
    staffId: currentSession ? currentSession.staffId : 'SYSTEM',
    branch: currentSession ? currentSession.branch : 'N/A',
    action: action + ': ' + detail
  });
}

function renderAuditTable() {
  var tbody = document.getElementById('auditTableBody');
  tbody.innerHTML = '';
  auditLogs.slice().reverse().forEach(function(log) {
    var row = document.createElement('tr');
    row.innerHTML = '<td class="py-2 px-3 text-gray-500">' + new Date(log.timestamp).toLocaleString() + '</td>'
      + '<td class="py-2 px-3 font-bold text-brand-700">' + log.staffId + '</td>'
      + '<td class="py-2 px-3">' + ((BRANCHES[log.branch] || {}).name || log.branch) + '</td>'
      + '<td class="py-2 px-3">' + log.action + '</td>';
    tbody.appendChild(row);
  });
}

function exportAuditCSV() {
  var rows = [['Timestamp', 'Staff', 'Branch', 'Action']];
  auditLogs.forEach(function(log) {
    rows.push([log.timestamp, log.staffId, (BRANCHES[log.branch] || {}).name || log.branch, log.action]);
  });
  downloadCSV(rows, 'bantaba_audit_' + new Date().toISOString().slice(0, 10) + '.csv');
}

// --------------- ADMIN PANEL ---------------
function refreshAdminPanel() {
  renderFxRateEditor();
  renderStaffTable();
  renderBranchNetwork();
  renderSessionLogTable();
  // Load metric values into inputs
  document.getElementById('metricLowVaultThreshold').value = sysMetrics.lowVaultThreshold || 500000;
  document.getElementById('metricMaxTxAmount').value = sysMetrics.maxTxAmount || 50000;
  document.getElementById('metricKycLimit').value = sysMetrics.kycLimit || 10000;
  document.getElementById('metricSessionTimeout').value = sysMetrics.sessionTimeout || 480;
}

// FX Rate Editor
function renderFxRateEditor() {
  var grid = document.getElementById('fxRateEditorGrid');
  grid.innerHTML = '';
  CURRENCIES.forEach(function(src) {
    var section = document.createElement('div');
    section.className = 'p-4 bg-sand-50 rounded-xl space-y-2';
    var title = document.createElement('p');
    title.className = 'text-xs font-bold text-gray-700';
    title.textContent = src.flag + ' ' + src.code + ' (' + src.name + ')';
    section.appendChild(title);

    var pairsDiv = document.createElement('div');
    pairsDiv.className = 'grid grid-cols-3 md:grid-cols-5 gap-2';
    CURRENCIES.forEach(function(dst) {
      if (dst.code === src.code) return;
      var key = src.code + '_' + dst.code;
      var d = document.createElement('div');
      d.innerHTML = '<label class="block text-[9px] font-mono text-gray-500 mb-0.5">' + key + '</label>'
        + '<input type="number" step="0.0001" value="' + (rates[key] || 0) + '" onchange="updateRate(\'' + key + '\', this.value)" class="w-full px-2 py-1.5 inset-input rounded-lg font-mono text-xs font-bold">';
      pairsDiv.appendChild(d);
    });
    section.appendChild(pairsDiv);

    // Fee for this currency
    var feeDiv = document.createElement('div');
    feeDiv.className = 'flex items-center space-x-2 mt-2';
    feeDiv.innerHTML = '<label class="text-[9px] font-mono text-gray-500">FEE (' + src.code + '):</label>'
      + '<input type="number" step="1" value="' + (fees[src.code] || 0) + '" onchange="updateFee(\'' + src.code + '\', this.value)" class="w-24 px-2 py-1.5 inset-input rounded-lg font-mono text-xs font-bold">';
    section.appendChild(feeDiv);

    grid.appendChild(section);
  });
}

function updateRate(key, val) { rates[key] = parseFloat(val) || 0; saveState(); calculateRates(); }
function updateFee(cur, val) { fees[cur] = parseFloat(val) || 0; saveState(); calculateRates(); }

// Staff Management
function renderStaffTable() {
  var tbody = document.getElementById('staffTableBody');
  tbody.innerHTML = '';
  staffList.forEach(function(s) {
    var row = document.createElement('tr');
    var branchName = (BRANCHES[s.branch] || {}).name || s.branch;
    row.innerHTML = '<td class="py-2 px-3 font-mono font-bold text-brand-700">' + s.id + '</td>'
      + '<td class="py-2 px-3 font-semibold">' + s.name + '</td>'
      + '<td class="py-2 px-3"><span class="px-2 py-0.5 rounded text-[10px] font-bold bg-brand-50 text-brand-700">' + s.role + '</span></td>'
      + '<td class="py-2 px-3 text-xs">' + branchName + '</td>'
      + '<td class="py-2 px-3"><span class="px-2 py-0.5 rounded text-[10px] font-bold ' + (s.active ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800') + '">' + (s.active ? 'Active' : 'Inactive') + '</span></td>'
      + '<td class="py-2 px-3 font-mono">' + (s.totalHours || 0).toFixed(1) + 'h</td>'
      + '<td class="py-2 px-3 font-mono text-[10px]">' + (s.lastLogin ? new Date(s.lastLogin).toLocaleString() : 'Never') + '</td>'
      + '<td class="py-2 px-3 text-center"><button onclick="toggleStaff(\'' + s.id + '\')" class="text-xs font-bold ' + (s.active ? 'text-red-600 hover:text-red-800' : 'text-emerald-600 hover:text-emerald-800') + '">' + (s.active ? 'Deactivate' : 'Activate') + '</button></td>';
    tbody.appendChild(row);
  });
}

function toggleStaff(id) {
  var s = staffList.find(function(st) { return st.id === id; });
  if (!s) return;
  s.active = !s.active;
  logAudit('STAFF_STATUS', s.id + ' ' + (s.active ? 'activated' : 'deactivated') + ' by ' + (currentSession ? currentSession.staffId : 'SYSTEM'));
  saveState();
  renderStaffTable();
}

function openAddStaffModal() {
  // Populate branch select
  var sel = document.getElementById('newStaffBranch');
  sel.innerHTML = '';
  Object.entries(BRANCHES).forEach(function(e) {
    var opt = document.createElement('option');
    opt.value = e[0];
    opt.textContent = e[1].name;
    sel.appendChild(opt);
  });
  document.getElementById('addStaffModal').classList.remove('hidden');
}
function closeAddStaffModal() { document.getElementById('addStaffModal').classList.add('hidden'); }

function addStaffMember() {
  var id = document.getElementById('newStaffId').value.trim();
  var name = document.getElementById('newStaffName').value.trim();
  var role = document.getElementById('newStaffRole').value;
  var branch = document.getElementById('newStaffBranch').value;
  var pin = document.getElementById('newStaffPin').value.trim();

  if (!id || !name || !pin) { alert('All fields are required.'); return; }
  if (staffList.find(function(s) { return s.id === id; })) { alert('Staff ID already exists.'); return; }

  staffList.push({ id: id, name: name, role: role, branch: branch, pin: pin, active: true, totalHours: 0, lastLogin: null });
  logAudit('STAFF_ADDED', id + ' (' + name + ') added as ' + role + ' at ' + branch);
  saveState();
  closeAddStaffModal();
  renderStaffTable();
}

// Branch Network
function renderBranchNetwork() {
  var grid = document.getElementById('branchNetworkGrid');
  grid.innerHTML = '';
  Object.entries(BRANCHES).forEach(function(entry) {
    var code = entry[0], info = entry[1];
    var card = document.createElement('div');
    card.className = 'p-4 bg-sand-50 border border-sand-200 rounded-xl flex items-center justify-between';
    card.innerHTML = '<div><span class="text-xs font-bold text-gray-800 block">' + info.name + '</span><span class="text-[10px] font-mono text-gray-500">' + code + ' | ' + info.currency + ' | Send + Receive</span></div>'
      + '<span class="w-2 h-2 rounded-full bg-emerald-500"></span>';
    grid.appendChild(card);
  });
}

function openAddBranchModal() {
  var sel = document.getElementById('newBranchCurrency');
  sel.innerHTML = '';
  CURRENCIES.forEach(function(c) {
    var opt = document.createElement('option');
    opt.value = c.code;
    opt.textContent = c.flag + ' ' + c.code;
    sel.appendChild(opt);
  });
  document.getElementById('addBranchModal').classList.remove('hidden');
}
function closeAddBranchModal() { document.getElementById('addBranchModal').classList.add('hidden'); }

function addBranchLocation() {
  var code = document.getElementById('newBranchCode').value.trim().toUpperCase();
  var name = document.getElementById('newBranchName').value.trim();
  var currency = document.getElementById('newBranchCurrency').value;
  var float_amount = parseFloat(document.getElementById('newBranchFloat').value) || 0;

  if (!code || !name) { alert('Location code and name are required.'); return; }
  if (BRANCHES[code]) { alert('Branch code already exists.'); return; }

  BRANCHES[code] = { name: name, currency: currency };
  vaults[code] = {};
  CURRENCIES.forEach(function(c) { vaults[code][c.code] = (c.code === currency) ? float_amount : 0; });

  logAudit('BRANCH_ADDED', code + ' (' + name + ') with ' + currency + ' float ' + float_amount.toLocaleString());
  saveState();
  closeAddBranchModal();
  renderBranchNetwork();
}

// Metrics
function saveMetrics() {
  sysMetrics.lowVaultThreshold = parseFloat(document.getElementById('metricLowVaultThreshold').value) || 500000;
  sysMetrics.maxTxAmount = parseFloat(document.getElementById('metricMaxTxAmount').value) || 50000;
  sysMetrics.kycLimit = parseFloat(document.getElementById('metricKycLimit').value) || 10000;
  sysMetrics.sessionTimeout = parseFloat(document.getElementById('metricSessionTimeout').value) || 480;
  logAudit('METRICS_UPDATED', 'System thresholds updated by ' + (currentSession ? currentSession.staffId : 'SYSTEM'));
  saveState();
  alert('Configuration saved.');
}

// Session Log
function renderSessionLogTable() {
  var tbody = document.getElementById('sessionLogBody');
  tbody.innerHTML = '';
  sessionLogs.slice().reverse().forEach(function(log) {
    var row = document.createElement('tr');
    row.innerHTML = '<td class="py-2 px-3 text-gray-500">' + new Date(log.time).toLocaleString() + '</td>'
      + '<td class="py-2 px-3 font-mono font-bold text-brand-700">' + log.staffId + '</td>'
      + '<td class="py-2 px-3">' + ((BRANCHES[log.branch] || {}).name || log.branch) + '</td>'
      + '<td class="py-2 px-3"><span class="px-2 py-0.5 rounded text-[10px] font-bold bg-brand-50 text-brand-700">' + log.role + '</span></td>'
      + '<td class="py-2 px-3 font-semibold ' + (log.event === 'LOGIN' ? 'text-emerald-700' : 'text-gray-500') + '">' + log.event + '</td>'
      + '<td class="py-2 px-3 font-mono">' + (log.duration || 'Active') + '</td>';
    tbody.appendChild(row);
  });
}

// --------------- UTILITIES ---------------
function downloadCSV(rows, filename) {
  var csv = rows.map(function(r) { return r.map(function(v) { return '"' + String(v).replace(/"/g, '""') + '"'; }).join(','); }).join('\n');
  var blob = new Blob([csv], { type: 'text/csv' });
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
}

// --------------- GLOBAL WINDOW EXPORTS ---------------
window.initSystem = initSystem;
window.handleLogin = handleLogin;
window.handleLogout = handleLogout;
window.switchTab = switchTab;
window.selectSendCurrency = selectSendCurrency;
window.calculateRates = calculateRates;
window.issueRemittance = issueRemittance;
window.verifyCode = verifyCode;
window.confirmAndDisburse = confirmAndDisburse;
window.cancelTx = cancelTx;
window.exportLedgerCSV = exportLedgerCSV;
window.exportAuditCSV = exportAuditCSV;
window.openTopUpModal = openTopUpModal;
window.closeTopUpModal = closeTopUpModal;
window.executeVaultTopUp = executeVaultTopUp;
window.updateRate = updateRate;
window.updateFee = updateFee;
window.toggleStaff = toggleStaff;
window.openAddStaffModal = openAddStaffModal;
window.closeAddStaffModal = closeAddStaffModal;
window.addStaffMember = addStaffMember;
window.openAddBranchModal = openAddBranchModal;
window.closeAddBranchModal = closeAddBranchModal;
window.addBranchLocation = addBranchLocation;
window.saveMetrics = saveMetrics;
window.updateLedgerTable = updateLedgerTable;

// Auto-initialize when loaded
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSystem);
  } else {
    initSystem();
  }
}

