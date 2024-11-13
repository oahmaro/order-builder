'use server';

import { revalidatePath } from 'next/cache';

import { auth } from '@/auth';
import { db } from '@/lib/db';
import { adhesionFormSchema } from '../_components/adhesion-form/adhesion-form.schema';

import {
  adhesionFormContent,
  AdhesionFormContentPhrases,
} from '../_components/adhesion-form/adhesion-form.content';

type FormState = {
  message: string;
  errors?: any[];
};

export async function updateAdhesionAction(data: FormData): Promise<FormState> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      message: 'Unauthorized',
      errors: ['User must be logged in'],
    };
  }

  const formData = Object.fromEntries(data);
  const adhesionId = parseInt(formData.adhesionId as string, 10);

  const parsed = adhesionFormSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      message: adhesionFormContent.t(AdhesionFormContentPhrases.FORM_DATA_INVALID),
      errors: parsed.error.errors,
    };
  }

  const { name, description } = parsed.data;

  try {
    // Get the old data for audit
    const oldAdhesion = await db.adhesion.findUnique({
      where: { id: adhesionId },
    });

    if (!oldAdhesion) {
      return {
        message: 'Adhesion not found',
      };
    }

    // Update the adhesion
    const updatedAdhesion = await db.adhesion.update({
      where: { id: adhesionId },
      data: { name, description },
    });

    // Create audit entry
    await db.audit.create({
      data: {
        entityId: adhesionId,
        entityType: 'Adhesion',
        action: 'UPDATE',
        userId: Number(session.user.id),
        changes: JSON.parse(
          JSON.stringify({
            before: oldAdhesion,
            after: updatedAdhesion,
          })
        ),
      },
    });

    revalidatePath('/adhesions');

    return {
      message: adhesionFormContent.t(AdhesionFormContentPhrases.ADHESION_UPDATED),
    };
  } catch (error) {
    return {
      message: adhesionFormContent.t(AdhesionFormContentPhrases.ERROR_WHILE_UPDATING),
    };
  }
}
