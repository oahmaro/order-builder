'use server';

import bcrypt from 'bcryptjs';
import * as z from 'zod';
import { User } from '@prisma/client';

import { ProfileSchema } from '@/schemas';
import { db } from '@/lib/db';

export async function updateProfile(
  userId: number,
  values: z.infer<typeof ProfileSchema>
): Promise<{ message: string; status: number; updatedUser: User | null }> {
  const validatedFields = ProfileSchema.safeParse(values);

  if (!validatedFields.success) {
    return { message: 'שדות לא חוקיים!', status: 422, updatedUser: null };
  }

  const updatedUser = await db.user.update({
    where: { id: userId }, // Replace 'userId' with the actual user ID
    data: {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      username: values.username,
      ...(values.password ? { password: await bcrypt.hash(values.password!, 10) } : {}),
    },
  });

  return { message: 'שמור', updatedUser, status: 200 };
}
