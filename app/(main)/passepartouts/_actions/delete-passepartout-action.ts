'use server';

import { revalidatePath } from 'next/cache';

import { auth } from '@/auth';
import { db } from '@/lib/db';
import {
  passepartoutFormContent,
  PassepartoutFormContentPhrases,
} from '../_components/passepartout-form/passepartout-form.content';

export type DeletePassepartoutFormState = {
  message: string;
};

export async function deletePassepartoutAction(
  passepartoutId: number
): Promise<DeletePassepartoutFormState> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      message: 'Unauthorized',
    };
  }

  try {
    // Get the passepartout data before deletion (for audit)
    const passepartout = await db.passepartout.findUnique({
      where: { id: passepartoutId },
    });

    if (!passepartout) {
      return {
        message: 'Passepartout not found',
      };
    }

    // Delete the passepartout
    await db.passepartout.delete({
      where: { id: passepartoutId },
    });

    // Create audit entry for deletion
    await db.audit.create({
      data: {
        entityId: passepartoutId,
        entityType: 'Passepartout',
        action: 'DELETE',
        userId: Number(session.user.id),
        changes: JSON.parse(JSON.stringify(passepartout)),
      },
    });

    revalidatePath('/passepartout');

    return {
      message: passepartoutFormContent.t(PassepartoutFormContentPhrases.PASSEPARTOUT_DELETED),
    };
  } catch (error) {
    return {
      message: passepartoutFormContent.t(PassepartoutFormContentPhrases.ERROR_WHILE_DELETING),
    };
  }
}
