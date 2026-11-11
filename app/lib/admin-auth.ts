// Admin login for the TRIFHAT dashboard, hardcoded on request (no env vars).
// Change these values to rotate the login; every existing session is signed out.
export const ADMIN_EMAIL = 'contact@trifhat.shop';
export const ADMIN_PASSWORD = 'Trifhat!Admin2026';
const SESSION_SECRET = 'trifhat-admin-session-7d4f2b9e1c6a8053';

export const ADMIN_COOKIE = 'trifhat_admin';
export const SESSION_MAX_AGE = 60 * 60 * 24 * 14; // 14 days

const encoder = new TextEncoder();

async function hmac(value: string): Promise<string> {
  const key = await crypto.subtle.importKey('raw', encoder.encode(SESSION_SECRET), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(value));
  return Array.from(new Uint8Array(signature), b => b.toString(16).padStart(2, '0')).join('');
}

/** Token format: "<expiresAtMs>.<hmac>". Works in both the Edge middleware and Node routes. */
export async function createSessionToken(): Promise<string> {
  const expires = Date.now() + SESSION_MAX_AGE * 1000;
  return `${expires}.${await hmac(`${ADMIN_EMAIL}:${expires}`)}`;
}

export async function isValidSessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const [expires, signature] = token.split('.');
  if (!expires || !signature || Number(expires) < Date.now()) return false;
  const expected = await hmac(`${ADMIN_EMAIL}:${expires}`);
  if (expected.length !== signature.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) diff |= expected.charCodeAt(i) ^ signature.charCodeAt(i);
  return diff === 0;
}
