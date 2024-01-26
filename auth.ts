import NextAuth, { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { UserRole } from '@prisma/client';

import { db } from '@/lib/db';
import authConfig from '@/auth.config';
import { getUserById } from './utils/user';

declare module 'next-auth' {
  interface User {
    firstName?: string;
    lastName?: string;
    role?: UserRole;
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
  },
  callbacks: {
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(Number(token.sub));

      if (!existingUser) return token;

      return {
        ...token,
        role: existingUser.role,
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
      };
    },
    async session({ token, session }: { token?: JWT; session: Session }) {
      return {
        ...session,
        user: {
          ...session.user,
          role: token?.role as UserRole,
          firstName: token?.firstName as string,
          lastName: token?.lastName as string,
        },
      };
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
});
