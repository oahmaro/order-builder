'use server';

import * as z from 'zod';
import { AuthError } from 'next-auth';

import { signIn } from '@/auth';
import { LoginSchema } from '@/schemas';
import { defaultLoginRedirect } from '@/routes';

export async function login(values: z.infer<typeof LoginSchema>) {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { message: 'Invalid fields!', status: 422 };
  }

  const { usernameOrEmail, password } = validatedFields.data;

  try {
    await signIn('credentials', { usernameOrEmail, password, redirectTo: defaultLoginRedirect });
    return { message: 'Success', status: 200 };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);

    if (error instanceof AuthError) {
      if (error.type === 'CredentialsSignin') {
        return { message: 'אישורים לא חוקיים', status: 422 };
      }

      return { message: 'משהו השתבש', status: 400 };
    }

    throw error;
  }
}
