import bcrypt from 'bcryptjs';
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { LoginSchema } from './schemas';
import { getUserByEmailOrUsername } from './utils/user';

export default {
  providers: [
    Credentials({
      async authorize(credentials): Promise<any> {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { usernameOrEmail, password } = validatedFields.data;

          const user = await getUserByEmailOrUsername(usernameOrEmail);

          if (!user || !user.password) return null;

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (passwordMatch) return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
