'use server';

import * as z from 'zod';
import bcrypt from 'bcryptjs';

import { RegisterSchema } from '@/schemas';
import { db } from '@/lib/db';
import { getUserByEmail } from '@/utils/user';

export async function register(values: z.infer<typeof RegisterSchema>) {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { message: 'Invalid fields!', status: 422 };
  }

  const { firstName, lastName, email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser) return { message: 'Email already in use', status: 409 };

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashedPassword,
    },
  });

  return { message: 'Registered successfully', status: 200 };
}
