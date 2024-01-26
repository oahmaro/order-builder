import NextAuth from 'next-auth';
import { NextAuthRequest } from 'next-auth/lib';

import authConfig from '@/auth.config';
import { defaultLoginRedirect, apiAuthPrefix, authRoutes } from '@/routes';

const { auth } = NextAuth(authConfig);

export default auth(async (req: NextAuthRequest) => {
  const { nextUrl } = req;
  const isAuthenticated = !!req.auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAuthRoutes = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoutes) {
    if (isAuthenticated) {
      return Response.redirect(new URL(defaultLoginRedirect, nextUrl));
    }

    return null;
  }

  if (!isAuthenticated) {
    return Response.redirect(new URL('/login', nextUrl));
  }

  return null;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
