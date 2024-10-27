'use server';

import bcrypt from 'bcryptjs';
import { revalidatePath } from 'next/cache';

import { db } from '@/lib/db';
import { userFormSchema } from '../_components/user-form/user-form.schema';

import {
  userFormContent,
  UserFormContentPhrases,
} from '../_components/user-form/user-form.content';

type FormState = {
  message: string;
  errors?: any[];
};

export async function updateUserAction(data: FormData): Promise<FormState> {
  const formData = Object.fromEntries(data);
  const userId = parseInt(formData.userId as string, 10);

  const parsed = userFormSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      message: userFormContent.t(UserFormContentPhrases.FORM_DATA_INVALID),
      errors: parsed.error.errors,
    };
  }

  const { firstName, lastName, username, email, password, role } = parsed.data;

  try {
    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

    await db.user.update({
      where: { id: userId },
      data: {
        firstName,
        lastName,
        username,
        email,
        role,
        ...(hashedPassword ? { password: hashedPassword } : {}),
      },
    });

    revalidatePath('/users');

    return {
      message: userFormContent.t(UserFormContentPhrases.USER_UPDATED),
    };
  } catch (error) {
    return {
      message: userFormContent.t(UserFormContentPhrases.ERROR_WHILE_UPDATING),
    };
  }
}
