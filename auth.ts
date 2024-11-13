import NextAuth, { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { UserRole } from '@prisma/client';

import { db } from '@/lib/db';
import authConfig from '@/auth.config';
import { getUserById } from './utils/user';

declare module 'next-auth' {
  interface User {
    id?: string;
    firstName?: string;
    lastName?: string;
    role?: UserRole;
    username?: string;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: '/login',
    signOut: '/login',
  },
  useSecureCookies: process.env.NODE_ENV === 'production',
  cookies: {
    sessionToken: {
      name: `${process.env.NODE_ENV === 'production' ? '__Secure-' : ''}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  callbacks: {
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(Number(token.sub));

      if (!existingUser) return token;

      return {
        ...token,
        username: existingUser?.username,
        firstName: existingUser?.firstName,
        lastName: existingUser?.lastName,
        role: existingUser?.role,
      };
    },
    async session({ token, session }: { token?: JWT; session: Session }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token?.sub as string,
          role: token?.role as UserRole,
          firstName: token?.firstName as string,
          lastName: token?.lastName as string,
          username: token?.username as string,
        },
      };
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
});
