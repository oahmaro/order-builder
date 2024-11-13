'use server';

import { revalidatePath } from 'next/cache';

import { auth } from '@/auth';
import { db } from '@/lib/db';
import { userFormSchema } from '../_components/user-form/user-form.schema';

import {
  userFormContent,
  UserFormContentPhrases,
} from '../_components/user-form/user-form.content';

export async function createUserAction(data: FormData) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      message: 'Unauthorized',
      errors: ['User must be logged in'],
    };
  }

  const formData = Object.fromEntries(data);
  const parsed = userFormSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      message: userFormContent.t(UserFormContentPhrases.FORM_DATA_INVALID),
      errors: parsed.error.errors,
    };
  }

  const { username, firstName, lastName, email, role } = parsed.data;

  try {
    // Create the user
    const user = await db.user.create({
      data: {
        username,
        firstName,
        lastName,
        email,
        role,
      },
    });

    // Create audit entry
    await db.audit.create({
      data: {
        entityId: user.id,
        entityType: 'User',
        action: 'CREATE',
        userId: Number(session.user.id),
        changes: JSON.parse(JSON.stringify({ username, firstName, lastName, email, role })),
      },
    });

    revalidatePath('/users');

    return {
      message: userFormContent.t(UserFormContentPhrases.USER_CREATED),
    };
  } catch (error) {
    return {
      message: userFormContent.t(UserFormContentPhrases.ERROR_WHILE_CREATING),
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
