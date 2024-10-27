'use server';

import { revalidatePath } from 'next/cache';

import { db } from '@/lib/db';
import {
  userFormContent,
  UserFormContentPhrases,
} from '../_components/user-form/user-form.content';

export type DeleteUserFormState = {
  message: string;
};

export async function deleteUserAction(userId: number): Promise<DeleteUserFormState> {
  try {
    await db.user.delete({
      where: { id: userId },
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
