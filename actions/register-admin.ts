'use server';

import * as z from 'zod';
import bcrypt from 'bcrypt';

import { RegisterAdminSchema } from '@/schemas';
import { ResponseObject } from './types';
import { db } from '@/lib/db';
import { getUserByEmail } from '@/utils/user';

export async function registerAdmin(
  values: z.infer<typeof RegisterAdminSchema>
): Promise<ResponseObject> {
  const validatedFields = RegisterAdminSchema.safeParse(values);

  if (!validatedFields.success) {
    return { message: 'Invalid fields!', status: 422 };
  }

  const { firstName, lastName, email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser) return { message: 'Email already in use', status: 409 };

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.create({
    data: { firstName, lastName: lastName || '', email, password: hashedPassword },
  });

  return { message: 'Registered successfully', status: 200 };
}
