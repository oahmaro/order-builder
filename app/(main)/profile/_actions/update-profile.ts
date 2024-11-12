'use server';

import * as z from 'zod';
import bcrypt from 'bcryptjs';
import { User } from '@prisma/client';

import { db } from '@/lib/db';
import { errorMessages } from '@/utils';
import { getUserById } from '@/utils/user';
import { profileFormSchema } from '@/app/(main)/profile/_components/profile-form/profile-form.schema';

import {
  profileFormContent,
  ProfileFormPhrases,
} from '@/app/(main)/profile/_components/profile-form/profile-form.content';

export async function updateProfile(
  userId: number,
  values: z.infer<typeof profileFormSchema>
): Promise<{ message: string; status: number; updatedUser: User | null }> {
  const validatedFields = profileFormSchema.safeParse(values);
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

  return {
    message: profileFormContent.t(ProfileFormPhrases.SAVE_SUCCESS),
    updatedUser,
    status: 200,
  };
}
