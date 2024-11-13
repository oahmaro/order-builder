'use server';

import { revalidatePath } from 'next/cache';

import { auth } from '@/auth';
import { db } from '@/lib/db';
import {
  adhesionFormContent,
  AdhesionFormContentPhrases,
} from '../_components/adhesion-form/adhesion-form.content';

export type DeleteAdhesionFormState = {
  message: string;
};

export async function deleteAdhesionAction(adhesionId: number): Promise<DeleteAdhesionFormState> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      message: 'Unauthorized',
    };
  }

  try {
    // Get the adhesion data before deletion (for audit)
    const adhesion = await db.adhesion.findUnique({
      where: { id: adhesionId },
    });

    if (!adhesion) {
      return {
        message: 'Adhesion not found',
      };
    }

    // Delete the adhesion
    await db.adhesion.delete({
      where: { id: adhesionId },
    });

    // Create audit entry for deletion
    await db.audit.create({
      data: {
        entityId: adhesionId,
        entityType: 'Adhesion',
        action: 'DELETE',
        userId: Number(session.user.id),
        changes: JSON.parse(JSON.stringify(adhesion)),
      },
    });

    revalidatePath('/adhesions');

    return {
      message: adhesionFormContent.t(AdhesionFormContentPhrases.ADHESION_DELETED),
    };
  } catch (error) {
    return {
      message: adhesionFormContent.t(AdhesionFormContentPhrases.ERROR_WHILE_DELETING),
    };
  }
}
