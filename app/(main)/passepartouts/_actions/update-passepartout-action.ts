'use server';

import { revalidatePath } from 'next/cache';

import { auth } from '@/auth';
import { db } from '@/lib/db';
import { passepartoutFormSchema } from '../_components/passepartout-form/passepartout-form.schema';

import {
  passepartoutFormContent,
  PassepartoutFormContentPhrases,
} from '../_components/passepartout-form/passepartout-form.content';

type FormState = {
  message: string;
  errors?: any[];
};

export async function updatePassepartoutAction(data: FormData): Promise<FormState> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      message: 'Unauthorized',
      errors: ['User must be logged in'],
    };
  }

  const formData = Object.fromEntries(data);
  const passepartoutId = parseInt(formData.passepartoutId as string, 10);

  const parsed = passepartoutFormSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      message: passepartoutFormContent.t(PassepartoutFormContentPhrases.FORM_DATA_INVALID),
      errors: parsed.error.errors,
    };
  }

  const { name, description } = parsed.data;

  try {
    // Get the old data for audit
    const oldPassepartout = await db.passepartout.findUnique({
      where: { id: passepartoutId },
    });

    if (!oldPassepartout) {
      return {
        message: 'Passepartout not found',
      };
    }

    // Update the passepartout
    const updatedPassepartout = await db.passepartout.update({
      where: { id: passepartoutId },
      data: { name, description },
    });

    // Create audit entry
    await db.audit.create({
      data: {
        entityId: passepartoutId,
        entityType: 'Passepartout',
        action: 'UPDATE',
        userId: Number(session.user.id),
        changes: JSON.parse(
          JSON.stringify({
            before: oldPassepartout,
            after: updatedPassepartout,
          })
        ),
      },
    });

    revalidatePath('/passepartout');

    return {
      message: passepartoutFormContent.t(PassepartoutFormContentPhrases.PASSEPARTOUT_UPDATED),
    };
  } catch (error) {
    return {
      message: passepartoutFormContent.t(PassepartoutFormContentPhrases.ERROR_WHILE_UPDATING),
    };
  }
}
