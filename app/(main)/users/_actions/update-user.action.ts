'use server';

import { revalidatePath } from 'next/cache';

import { auth } from '@/auth';
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
  const session = await auth();

  if (!session?.user?.id) {
    return {
      message: 'Unauthorized',
      errors: ['User must be logged in'],
    };
  }

  const formData = Object.fromEntries(data);
  const userId = parseInt(formData.userId as string, 10);

  const parsed = userFormSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      message: userFormContent.t(UserFormContentPhrases.FORM_DATA_INVALID),
      errors: parsed.error.errors,
    };
  }

  const { username, firstName, lastName, email, role } = parsed.data;

  try {
    // Get the old data for audit
    const oldUser = await db.user.findUnique({
      where: { id: userId },
    });

    if (!oldUser) {
      return {
        message: 'User not found',
      };
    }

    // Update the user
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: { username, firstName, lastName, email, role },
    });

    // Create audit entry
    await db.audit.create({
      data: {
        entityId: userId,
        entityType: 'User',
        action: 'UPDATE',
        userId: Number(session.user.id),
        changes: JSON.parse(
          JSON.stringify({
            before: oldUser,
            after: updatedUser,
          })
        ),
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
