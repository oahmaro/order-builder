'use server';

import { revalidatePath } from 'next/cache';

import {
  createDescriptionFormContent,
  CreateDescriptionFormContentPhrases,
} from './create-description-form.content';
import { db } from '@/lib/db';
import { createDescriptionFormSchema } from './create-description-form.schema';

export type FormState = {
  message: string;
};

export async function createDescriptionFormAction(data: FormData): Promise<FormState> {
  const formData = Object.fromEntries(data);
  const parsed = createDescriptionFormSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      message: createDescriptionFormContent.t(
        CreateDescriptionFormContentPhrases.FORM_DATA_INVALID
      ),
    };
  }

  const { name } = parsed.data;

  try {
    await db.description.create({ data: { name } });

    revalidatePath('/descriptions');

    return {
      message: createDescriptionFormContent.t(CreateDescriptionFormContentPhrases.RECORD_CREATED),
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error creating description', error);
    return {
      message: createDescriptionFormContent.t(
        CreateDescriptionFormContentPhrases.ERROR_WHILE_CREATING
      ),
    };
  }
}
