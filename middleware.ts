import { NextResponse, type NextRequest } from 'next/server';
import { ADMIN_COOKIE, isValidSessionToken } from './app/lib/admin-auth';

// Protect the admin dashboard and its APIs. The login page and login API stay public.
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === '/admin/login' || pathname === '/api/admin/login') return NextResponse.next();

  const ok = await isValidSessionToken(request.cookies.get(ADMIN_COOKIE)?.value);
  if (ok) return NextResponse.next();

  if (pathname.startsWith('/api/')) return NextResponse.json({ error: 'Not signed in.' }, { status: 401 });
  const url = request.nextUrl.clone();
  url.pathname = '/admin/login';
  url.searchParams.set('next', pathname);
  return NextResponse.redirect(url);
}

export const config = { matcher: ['/admin/:path*', '/api/admin/:path*'] };
