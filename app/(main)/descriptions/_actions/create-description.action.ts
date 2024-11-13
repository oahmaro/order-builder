'use server';

import { revalidatePath } from 'next/cache';

import { auth } from '@/auth';
import { db } from '@/lib/db';
import { descriptionFormSchema } from '../_components/description-form/description-form.schema';

import {
  descriptionFormContent,
  DescriptionFormContentPhrases,
} from '../_components/description-form/description-form.content';

export async function createDescriptionAction(data: FormData) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      message: 'Unauthorized',
      errors: ['User must be logged in'],
    };
  }

  const formData = Object.fromEntries(data);
  const parsed = descriptionFormSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      message: descriptionFormContent.t(DescriptionFormContentPhrases.FORM_DATA_INVALID),
      errors: parsed.error.errors,
    };
  }

  const { name, description } = parsed.data;

  try {
    // Create the description
    const createdDescription = await db.description.create({
      data: {
        name,
        description,
      },
    });

    // Create audit entry
    await db.audit.create({
      data: {
        entityId: createdDescription.id,
        entityType: 'Description',
        action: 'CREATE',
        userId: Number(session.user.id),
        changes: JSON.parse(JSON.stringify({ name, description })),
      },
    });

    revalidatePath('/descriptions');

    return {
      message: descriptionFormContent.t(DescriptionFormContentPhrases.DESCRIPTION_CREATED),
    };
  } catch (error) {
    return {
      message: descriptionFormContent.t(DescriptionFormContentPhrases.ERROR_WHILE_CREATING),
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
