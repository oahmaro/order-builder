'use server';

import { revalidatePath } from 'next/cache';

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
  try {
    await db.passepartout.delete({ where: { id: passepartoutId } });

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
