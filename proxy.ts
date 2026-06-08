import { auth } from '@/auth';
import type { NextRequest } from 'next/server';

export default auth((req: NextRequest & { auth: unknown }) => {
  const reqWithAuth = req as NextRequest & { auth: { user?: unknown } | null };
  const isLoggedIn = !!reqWithAuth.auth?.user;
  const isAdminLoginPage = req.nextUrl.pathname === '/admin/login';

  if (!isLoggedIn && !isAdminLoginPage) {
    const loginUrl = new URL('/admin/login', req.url);
    return Response.redirect(loginUrl);
  }
});

export const config = {
  matcher: ['/admin', '/admin/((?!login).*)'],
};
