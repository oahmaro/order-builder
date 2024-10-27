'use server';

import { revalidatePath } from 'next/cache';

import { db } from '@/lib/db';
import { adhesionFormSchema } from '../_components/adhesion-form/adhesion-form.schema';

import {
  adhesionFormContent,
  AdhesionFormContentPhrases,
} from '../_components/adhesion-form/adhesion-form.content';

export async function createAdhesionAction(data: FormData) {
  const formData = Object.fromEntries(data);
  const parsed = adhesionFormSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      message: adhesionFormContent.t(AdhesionFormContentPhrases.FORM_DATA_INVALID),
      errors: parsed.error.errors,
    };
  }

  const { name, description } = parsed.data;

  try {
    await db.adhesion.create({ data: { name, description } });

    revalidatePath('/adhesions');

    return {
      message: adhesionFormContent.t(AdhesionFormContentPhrases.ADHESION_CREATED),
    };
  } catch (error) {
    return {
      message: adhesionFormContent.t(AdhesionFormContentPhrases.ERROR_WHILE_CREATING),
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
