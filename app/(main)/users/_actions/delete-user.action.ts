'use server';

import { revalidatePath } from 'next/cache';

import { auth } from '@/auth';
import { db } from '@/lib/db';
import {
  userFormContent,
  UserFormContentPhrases,
} from '../_components/user-form/user-form.content';

export type DeleteUserFormState = {
  message: string;
};

export async function deleteUserAction(userId: number): Promise<DeleteUserFormState> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      message: 'Unauthorized',
    };
  }

  try {
    // Get the user data before deletion (for audit)
    const user = await db.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return {
        message: 'User not found',
      };
    }

    // Delete the user
    await db.user.delete({
      where: { id: userId },
    });

    // Create audit entry for deletion
    await db.audit.create({
      data: {
        entityId: userId,
        entityType: 'User',
        action: 'DELETE',
        userId: Number(session.user.id),
        changes: JSON.parse(JSON.stringify(user)),
      },
    });

    revalidatePath('/users');

    return {
      message: userFormContent.t(UserFormContentPhrases.USER_DELETED),
    };
  } catch (error) {
    return {
      message: userFormContent.t(UserFormContentPhrases.ERROR_WHILE_DELETING),
    };
  }
}
