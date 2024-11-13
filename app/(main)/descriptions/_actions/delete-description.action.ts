'use server';

import { revalidatePath } from 'next/cache';

import { auth } from '@/auth';
import { db } from '@/lib/db';
import {
  descriptionFormContent,
  DescriptionFormContentPhrases,
} from '../_components/description-form/description-form.content';

export type DeleteDescriptionFormState = {
  message: string;
};

export async function deleteDescriptionAction(
  descriptionId: number
): Promise<DeleteDescriptionFormState> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      message: 'Unauthorized',
    };
  }

  try {
    // Get the description data before deletion (for audit)
    const description = await db.description.findUnique({
      where: { id: descriptionId },
    });

    if (!description) {
      return {
        message: 'Description not found',
      };
    }

    // Delete the description
    await db.description.delete({
      where: { id: descriptionId },
    });

    // Create audit entry for deletion
    await db.audit.create({
      data: {
        entityId: descriptionId,
        entityType: 'Description',
        action: 'DELETE',
        userId: Number(session.user.id),
        changes: JSON.parse(JSON.stringify(description)),
      },
    });

    revalidatePath('/descriptions');

    return {
      message: descriptionFormContent.t(DescriptionFormContentPhrases.DESCRIPTION_DELETED),
    };
  } catch (error) {
    return {
      message: descriptionFormContent.t(DescriptionFormContentPhrases.ERROR_WHILE_DELETING),
    };
  }
}
