'user server';

import * as z from 'zod';

import { InviteNewUserSchema } from '@/schemas';
import { getUserByEmail } from '@/utils/user';
import { db } from '@/lib/db';

export async function inviteNewUser(values: z.infer<typeof InviteNewUserSchema>) {
  const validatedFields = InviteNewUserSchema.safeParse(values);

  if (!validatedFields.success) {
    return { message: 'Invalid fields!', status: 422 };
  }

  const { email, firstName, lastName, role } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser) return { message: 'Email already in use', status: 409 };

  await db.user.create({
    data: { firstName, lastName: lastName || '', email, role },
  });

  return { message: 'Successfully invited new user', status: 200 };
}
