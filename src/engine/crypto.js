// Thin wrapper over WebCrypto (browser + Node 20+). All functions are async.
const subtle = () => globalThis.crypto.subtle;
const enc = new TextEncoder();

export const toHex = (buf) => [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
export const fromHex = (hex) => new Uint8Array(hex.match(/.{2}/g).map((h) => parseInt(h, 16)));

export function randomBytes(n) {
  const a = new Uint8Array(n);
  globalThis.crypto.getRandomValues(a);
  return a;
}

/** Uniform random integer in [0, max) using rejection sampling (no modulo bias). */
export function randomInt(max) {
  if (!Number.isInteger(max) || max <= 0 || max > 2 ** 32) throw new RangeError('max out of range');
  const limit = Math.floor(2 ** 32 / max) * max;
  const buf = new Uint32Array(1);
  for (;;) {
    globalThis.crypto.getRandomValues(buf);
    if (buf[0] < limit) return buf[0] % max;
  }
}

export async function sha256Hex(text) {
  return toHex(await subtle().digest('SHA-256', enc.encode(text)));
}

export async function hmacHex(keyHex, message) {
  const key = await subtle().importKey('raw', fromHex(keyHex), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return toHex(await subtle().sign('HMAC', key, enc.encode(message)));
}

export async function pbkdf2Hex(secret, saltHex, iterations) {
  const key = await subtle().importKey('raw', enc.encode(secret), 'PBKDF2', false, ['deriveBits']);
  const bits = await subtle().deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt: fromHex(saltHex), iterations }, key, 256);
  return toHex(bits);
}

/** Constant-time string comparison (equal length hex strings expected). */
export function safeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
