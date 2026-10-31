// Money is always an integer number of minor units. Never floats in the ledger.
export function toMinor(amount, decimals) {
  const n = typeof amount === 'string' ? Number(amount.replace(/,/g, '')) : amount;
  if (!Number.isFinite(n)) throw new RangeError('Invalid amount');
  return Math.round(+(n * 10 ** decimals).toFixed(6));
}
export const toMajor = (minor, decimals) => minor / 10 ** decimals;

export function fmt(minor, cur) {
  const d = cur?.decimals ?? 2;
  const v = toMajor(minor, d);
  return v.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
}
export const fmtCur = (minor, cur) => `${fmt(minor, cur)} ${cur?.code ?? ''}`.trim();
