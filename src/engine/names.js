// Name normalisation and fuzzy matching (Jaro-Winkler + token logic) for recipient
// confirmation and sanctions screening. Handles accents, order, common West-African variants.
const ALIAS = {
  mohammed: 'muhammad', mohamed: 'muhammad', mohammad: 'muhammad', muhammed: 'muhammad', mamadou: 'muhammad', mamadu: 'muhammad',
  ousman: 'usman', ousmane: 'usman', othman: 'usman', osman: 'usman',
  lamin: 'lamin', lamine: 'lamin',
  abdoulie: 'abdul', abdoulaye: 'abdul', abdou: 'abdul', abdoul: 'abdul', abdul: 'abdul',
  fatou: 'fatou', fatoumata: 'fatou', fatumata: 'fatou', fatima: 'fatou',
  ibrahima: 'ibrahim', brahima: 'ibrahim', ibrahim: 'ibrahim',
  jallow: 'jalo', diallo: 'jalo', jalloh: 'jalo', jallo: 'jalo',
  ceesay: 'cisse', cisse: 'cisse', sisay: 'cisse',
  sanneh: 'sane', sane: 'sane', darboe: 'darbo', darbo: 'darbo', touray: 'toure', toure: 'toure'
};

export function normalize(s) {
  return String(s ?? '')
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}
export const tokens = (s) => normalize(s).split(' ').filter(Boolean).map((t) => ALIAS[t] || t).sort();

export function jaroWinkler(a, b) {
  if (a === b) return 1;
  if (!a.length || !b.length) return 0;
  const range = Math.max(0, Math.floor(Math.max(a.length, b.length) / 2) - 1);
  const am = new Array(a.length).fill(false), bm = new Array(b.length).fill(false);
  let m = 0;
  for (let i = 0; i < a.length; i++) {
    for (let j = Math.max(0, i - range); j < Math.min(b.length, i + range + 1); j++) {
      if (!bm[j] && a[i] === b[j]) { am[i] = bm[j] = true; m++; break; }
    }
  }
  if (!m) return 0;
  let t = 0, k = 0;
  for (let i = 0; i < a.length; i++) {
    if (!am[i]) continue;
    while (!bm[k]) k++;
    if (a[i] !== b[k]) t++;
    k++;
  }
  const jaro = (m / a.length + m / b.length + (m - t / 2) / m) / 3;
  let l = 0;
  while (l < 4 && a[l] === b[l]) l++;
  return jaro + l * 0.1 * (1 - jaro);
}

/** Score 0..1: order-insensitive full-name similarity. */
export function nameScore(a, b) {
  const ta = tokens(a), tb = tokens(b);
  if (!ta.length || !tb.length) return 0;
  const sa = ta.join(' '), sb = tb.join(' ');
  const whole = jaroWinkler(sa, sb);
  // Token-set containment (e.g. "Ousman Jallow" vs "Ousman Bakary Jallow")
  const small = ta.length <= tb.length ? ta : tb, big = ta.length <= tb.length ? tb : ta;
  let contained = 0;
  for (const t of small) contained += Math.max(...big.map((u) => jaroWinkler(t, u)));
  const containment = small.length >= 2 ? (contained / small.length) * 0.97 : 0;
  return Math.max(whole, containment);
}

export const maskName = (n) =>
  String(n).trim().split(/\s+/).map((w) => (w.length <= 2 ? w[0] + '*' : w.slice(0, 2) + '*'.repeat(Math.min(5, w.length - 2)))).join(' ');

export const digits = (s) => String(s ?? '').replace(/\D/g, '');
/** Phones match if equal digit strings or one ends with the other's last 7+ digits. */
export function phoneMatch(a, b) {
  const x = digits(a), y = digits(b);
  if (!x || !y) return false;
  if (x === y) return true;
  const n = Math.min(x.length, y.length);
  return n >= 7 && x.slice(-n) === y.slice(-n);
}
