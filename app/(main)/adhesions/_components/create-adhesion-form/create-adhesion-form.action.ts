'use server';

import { revalidatePath } from 'next/cache';

import { db } from '@/lib/db';
import {
  createAdhesionFormContent,
  CreateAdhesionFormContentPhrases,
} from './create-adhesion-form.content';
import { createAdhesionFormSchema } from './create-adhesion-from.schema';

export type FormState = {
  message: string;
};

export async function createAdhesionFormAction(data: FormData): Promise<FormState> {
  const formData = Object.fromEntries(data);
  const parsed = createAdhesionFormSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      message: createAdhesionFormContent.t(CreateAdhesionFormContentPhrases.FORM_DATA_INVALID),
    };
  }

  const { name } = parsed.data;

  try {
    await db.adhesion.create({ data: { name } });

    revalidatePath('/adhesions');

    return {
      message: createAdhesionFormContent.t(CreateAdhesionFormContentPhrases.RECORD_CREATED),
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error creating description', error);
    return {
      message: createAdhesionFormContent.t(CreateAdhesionFormContentPhrases.ERROR_WHILE_CREATING),
    };
  }
}
