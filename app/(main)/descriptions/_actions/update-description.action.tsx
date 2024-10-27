'use server';

import { revalidatePath } from 'next/cache';

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
  const formData = Object.fromEntries(data);
  const descriptionId = parseInt(formData.descriptionId as string, 10);

  const parsed = descriptionFormSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      message: descriptionFormContent.t(DescriptionFormContentPhrases.ERROR_WHILE_UPDATING),
      errors: parsed.error.errors,
    };
  }

  const { name, description } = parsed.data;

  try {
    await db.description.update({
      where: { id: descriptionId },
      data: { name, description },
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
