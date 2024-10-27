'use server';

import { revalidatePath } from 'next/cache';

import { db } from '@/lib/db';
import { descriptionFormSchema } from '../_components/description-form/description-form.schema';

import {
  descriptionFormContent,
  DescriptionFormContentPhrases,
} from '../_components/description-form/description-form.content';

export async function createDescriptionAction(data: FormData) {
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
    await db.description.create({ data: { name, description } });

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
