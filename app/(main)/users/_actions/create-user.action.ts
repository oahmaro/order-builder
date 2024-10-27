'use server';

import bcrypt from 'bcryptjs';
import { revalidatePath } from 'next/cache';

import { db } from '@/lib/db';
import { userFormSchema } from '../_components/user-form/user-form.schema';

import {
  userFormContent,
  UserFormContentPhrases,
} from '../_components/user-form/user-form.content';

export async function createUserAction(data: FormData) {
  const formData = Object.fromEntries(data);
  const parsed = userFormSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      message: userFormContent.t(UserFormContentPhrases.FORM_DATA_INVALID),
      errors: parsed.error.errors,
    };
  }

  const { firstName, lastName, username, email, password, role } = parsed.data;

  try {
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return {
        message: userFormContent.t(UserFormContentPhrases.EMAIL_ALREADY_EXISTS),
        error: 'Email already exists',
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.create({
      data: {
        firstName,
        lastName,
        username,
        email,
        password: hashedPassword,
        role,
      },
    });

    revalidatePath('/users');

    return {
      message: userFormContent.t(UserFormContentPhrases.USER_CREATED),
    };
  } catch (error) {
    // You can also specifically handle the P2002 error if you prefer
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
      return {
        message: userFormContent.t(UserFormContentPhrases.EMAIL_ALREADY_EXISTS),
        error: 'Email already exists',
      };
    }

    console.log({ error: JSON.stringify(error) });
    return {
      message: userFormContent.t(UserFormContentPhrases.ERROR_WHILE_CREATING),
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
