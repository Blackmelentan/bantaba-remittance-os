// Append-only double-entry ledger. Every journal balances per currency; amounts are integers.
export class LedgerError extends Error {}

export function validateJournal(j) {
  if (!j.ccy || !Array.isArray(j.lines) || j.lines.length < 2) throw new LedgerError('Journal needs a currency and at least two lines');
  let dr = 0, cr = 0;
  for (const l of j.lines) {
    if (!l.account) throw new LedgerError('Line without account');
    for (const k of ['dr', 'cr']) {
      const v = l[k] ?? 0;
      if (!Number.isInteger(v) || v < 0) throw new LedgerError('Amounts must be non-negative integers (minor units)');
    }
    if ((l.dr ?? 0) > 0 && (l.cr ?? 0) > 0) throw new LedgerError('A line is either debit or credit');
    dr += l.dr ?? 0; cr += l.cr ?? 0;
  }
  if (dr !== cr) throw new LedgerError(`Unbalanced journal: Dr ${dr} != Cr ${cr}`);
  if (dr === 0) throw new LedgerError('Empty journal');
}

/** Account normal side so balances read naturally. */
export function accountKind(account) {
  const k = account.split(':')[0];
  if (['CASH', 'FX_POS'].includes(k)) return 'DEBIT';
  return 'CREDIT'; // PAYABLE, REV_*, COMM_PAYABLE, HQ_FUNDING, EXP_* handled below
}

export function balances(journals) {
  const bal = {}; // account -> signed (dr - cr)
  for (const j of journals) for (const l of j.lines) bal[l.account] = (bal[l.account] ?? 0) + (l.dr ?? 0) - (l.cr ?? 0);
  return bal;
}

/** Trial balance per currency: total debits must equal total credits. */
export function trialBalance(journals) {
  const t = {};
  for (const j of journals) {
    t[j.ccy] ??= { dr: 0, cr: 0 };
    for (const l of j.lines) { t[j.ccy].dr += l.dr ?? 0; t[j.ccy].cr += l.cr ?? 0; }
  }
  return Object.fromEntries(Object.entries(t).map(([c, v]) => [c, { ...v, balanced: v.dr === v.cr }]));
}

export const cashAccount = (branch, ccy) => `CASH:${branch}:${ccy}`;
