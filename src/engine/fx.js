import { toMajor } from './money.js';

export const curMap = (list) => Object.fromEntries(list.map((c) => [c.code, c]));

/** Mid-market rate from → to using a USD pivot (units per 1 USD). */
export function midRate(from, to, cur) {
  const a = cur[from], b = cur[to];
  if (!a || !b) throw new Error(`Unknown currency ${!a ? from : to}`);
  return b.perUsd / a.perUsd;
}

export const toUsd = (minor, code, cur) => toMajor(minor, cur[code].decimals) / cur[code].perUsd;

export function marginBps(from, to, settings) {
  if (from === to) return 0;
  const o = settings.marginOverridesBps || {};
  return o[`${from}>${to}`] ?? o[`*>${to}`] ?? o[`${from}>*`] ?? settings.fxMarginBps;
}

/** Fee (in sending-currency minor units) from the USD-equivalent band table. */
export function feeFor(principalMinor, from, domestic, settings, cur) {
  const usd = toUsd(principalMinor, from, cur);
  const band = settings.feeBandsUsd.find((x) => x.upTo == null || usd <= x.upTo) || settings.feeBandsUsd.at(-1);
  let feeUsd = Math.max(band.fee * (domestic ? settings.domesticFeeFactor : 1), settings.minFeeUsd);
  const c = cur[from];
  const major = feeUsd * c.perUsd;
  // round to a sensible till denomination: 0.05 for 2dp currencies, 5 for 0dp, 50 for large 0dp
  const step = c.decimals === 0 ? (c.perUsd > 2000 ? 500 : 5) : 0.05;
  const rounded = Math.max(step, Math.ceil(major / step - 1e-9) * step);
  return Math.round(rounded * 10 ** c.decimals);
}

/**
 * Price a transfer. mode 'send': amountMinor is principal in `from`.
 * mode 'receive': amountMinor is the exact payout in `to`; principal is solved.
 */
export function price({ mode = 'send', amountMinor, from, to, domestic, settings, cur }) {
  if (!(amountMinor > 0)) throw new RangeError('Amount must be positive');
  const mid = midRate(from, to, cur);
  const bps = marginBps(from, to, settings);
  const rate = mid * (1 - bps / 10000);
  const df = cur[from].decimals, dt = cur[to].decimals;
  const payoutFor = (pMinor) => Math.floor(+(toMajor(pMinor, df) * rate * 10 ** dt).toFixed(6));
  let principalMinor;
  if (mode === 'receive') {
    principalMinor = Math.ceil(+((toMajor(amountMinor, dt) / rate) * 10 ** df).toFixed(6));
    while (payoutFor(principalMinor) < amountMinor) principalMinor += 1;
  } else principalMinor = amountMinor;
  const payoutMinor = payoutFor(principalMinor);
  const payoutAtMidMinor = Math.floor(+(toMajor(principalMinor, df) * mid * 10 ** dt).toFixed(6));
  const feeMinor = feeFor(principalMinor, from, domestic, settings, cur);
  return {
    from, to, mid, rate, marginBps: bps, principalMinor, feeMinor, totalMinor: principalMinor + feeMinor,
    payoutMinor, payoutAtMidMinor, fxMarginMinor: Math.max(0, payoutAtMidMinor - payoutMinor)
  };
}
