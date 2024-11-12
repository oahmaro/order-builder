'use server';

import { revalidatePath } from 'next/cache';

import { db } from '@/lib/db';
import { passepartoutFormSchema } from '../_components/passepartout-form/passepartout-form.schema';

import {
  passepartoutFormContent,
  PassepartoutFormContentPhrases,
} from '../_components/passepartout-form/passepartout-form.content';

export async function createPassepartoutAction(data: FormData) {
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
    await db.passepartout.create({ data: { name, description } });

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
