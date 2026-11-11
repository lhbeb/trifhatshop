import { NextResponse } from 'next/server';
import { ADMIN_COOKIE, ADMIN_EMAIL, ADMIN_PASSWORD, SESSION_MAX_AGE, createSessionToken } from '../../../lib/admin-auth';

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const password = typeof body.password === 'string' ? body.password : '';
  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    await new Promise(resolve => setTimeout(resolve, 600));
    return NextResponse.json({ error: 'Wrong email or password.' }, { status: 401 });
  }
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, await createSessionToken(), {
    httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: SESSION_MAX_AGE,
  });
  return response;
}
