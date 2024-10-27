'use server';

import { revalidatePath } from 'next/cache';

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
    await db.adhesion.update({
      where: { id: adhesionId },
      data: { name, description },
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
