'use server';

import bcrypt from 'bcryptjs';
import * as z from 'zod';
import { User } from '@prisma/client';

import { ProfileFormSchema } from '@/schemas';
import { db } from '@/lib/db';
import { getUserById } from '@/utils/user';
import { errorMessages } from '@/utils';

export async function updateProfile(
  userId: number,
  values: z.infer<typeof ProfileFormSchema>
): Promise<{ message: string; status: number; updatedUser: User | null }> {
  const validatedFields = ProfileFormSchema.safeParse(values);
  const haveRequestedToChangePassword = !!values.password.password;
  let user;
  let shouldUpdatePassword;

  if (!validatedFields.success) {
    return { message: errorMessages['fields-invalid'], status: 422, updatedUser: null };
  }

  if (haveRequestedToChangePassword) {
    user = await getUserById(userId);
    shouldUpdatePassword = await bcrypt.compare(values.password.currentPassword!, user?.password!);
  }

  if (haveRequestedToChangePassword && !shouldUpdatePassword) {
    return { message: 'Invalid password', status: 403, updatedUser: null };
  }

  const updatedUser = await db.user.update({
    where: { id: userId },
    data: {
      firstName: values.profile.firstName,
      lastName: values.profile.lastName,
      email: values.profile.email,
      username: values.profile.username,
      ...(shouldUpdatePassword
        ? { password: await bcrypt.hash(values.password.password!, 10) }
        : {}),
    },
  });

  return { message: 'שמור', updatedUser, status: 200 };
}
