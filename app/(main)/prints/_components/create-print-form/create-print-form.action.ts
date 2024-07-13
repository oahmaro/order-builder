'use server';

import { revalidatePath } from 'next/cache';

import { db } from '@/lib/db';
import { createPrintFormContent, CreatePrintFormContentPhrases } from './create-print-form.content';
import { createPrintFormSchema } from './create-print-form.schema';

export type FormState = {
  message: string;
};

export async function createPrintFormAction(data: FormData): Promise<FormState> {
  const formData = Object.entries(data);
  const parsed = createPrintFormSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      message: createPrintFormContent.t(CreatePrintFormContentPhrases.FORM_DATA_INVALID),
    };
  }

  const { name } = parsed.data;

  try {
    await db.description.create({ data: { name } });

    revalidatePath('/prints');

    return {
      message: createPrintFormContent.t(CreatePrintFormContentPhrases.RECORD_CREATED),
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error creating description', error);
    return {
      message: createPrintFormContent.t(CreatePrintFormContentPhrases.ERROR_WHILE_CREATING),
    };
  }
}
