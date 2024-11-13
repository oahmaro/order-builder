'use server';

import { revalidatePath } from 'next/cache';

import { auth } from '@/auth';
import { db } from '@/lib/db';
import { descriptionFormSchema } from '../_components/description-form/description-form.schema';

import {
  descriptionFormContent,
  DescriptionFormContentPhrases,
} from '../_components/description-form/description-form.content';

type FormState = {
  message: string;
  errors?: any[];
};

export async function updateDescriptionAction(data: FormData): Promise<FormState> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      message: 'Unauthorized',
      errors: ['User must be logged in'],
    };
  }

  const formData = Object.fromEntries(data);
  const descriptionId = parseInt(formData.descriptionId as string, 10);

  const parsed = descriptionFormSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      message: descriptionFormContent.t(DescriptionFormContentPhrases.FORM_DATA_INVALID),
      errors: parsed.error.errors,
    };
  }

  const { name, description } = parsed.data;

  try {
    // Get the old data for audit
    const oldDescription = await db.description.findUnique({
      where: { id: descriptionId },
    });

    if (!oldDescription) {
      return {
        message: 'Description not found',
      };
    }

    // Update the description
    const updatedDescription = await db.description.update({
      where: { id: descriptionId },
      data: { name, description },
    });

    // Create audit entry
    await db.audit.create({
      data: {
        entityId: descriptionId,
        entityType: 'Description',
        action: 'UPDATE',
        userId: Number(session.user.id),
        changes: JSON.parse(
          JSON.stringify({
            before: oldDescription,
            after: updatedDescription,
          })
        ),
      },
    });

    revalidatePath('/descriptions');

    return {
      message: descriptionFormContent.t(DescriptionFormContentPhrases.DESCRIPTION_UPDATED),
    };
  } catch (error) {
    return {
      message: descriptionFormContent.t(DescriptionFormContentPhrases.ERROR_WHILE_UPDATING),
    };
  }
}
