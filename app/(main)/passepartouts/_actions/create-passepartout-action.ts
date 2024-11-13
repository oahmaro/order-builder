'use server';

import { revalidatePath } from 'next/cache';

import { auth } from '@/auth';
import { db } from '@/lib/db';
import { passepartoutFormSchema } from '../_components/passepartout-form/passepartout-form.schema';

import {
  passepartoutFormContent,
  PassepartoutFormContentPhrases,
} from '../_components/passepartout-form/passepartout-form.content';

export async function createPassepartoutAction(data: FormData) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      message: 'Unauthorized',
      errors: ['User must be logged in'],
    };
  }

  const formData = Object.fromEntries(data);
  const parsed = passepartoutFormSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      message: passepartoutFormContent.t(PassepartoutFormContentPhrases.FORM_DATA_INVALID),
      errors: parsed.error.errors,
    };
  }

  const { name, description } = parsed.data;

  try {
    // Create the passepartout
    const passepartout = await db.passepartout.create({
      data: {
        name,
        description,
      },
    });

    // Create audit entry
    await db.audit.create({
      data: {
        entityId: passepartout.id,
        entityType: 'Passepartout',
        action: 'CREATE',
        userId: Number(session.user.id),
        changes: JSON.parse(JSON.stringify({ name, description })),
      },
    });

    revalidatePath('/passepartout');

    return {
      message: passepartoutFormContent.t(PassepartoutFormContentPhrases.PASSEPARTOUT_CREATED),
    };
  } catch (error) {
    return {
      message: passepartoutFormContent.t(PassepartoutFormContentPhrases.ERROR_WHILE_CREATING),
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
