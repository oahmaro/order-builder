'use server';

import { revalidatePath } from 'next/cache';

import { db } from '@/lib/db';
import { printFormSchema } from '../_components/print-form/print-form.schema';

import {
  printFormContent,
  PrintFormContentPhrases,
} from '../_components/print-form/print-form.content';

export async function createPrintAction(data: FormData) {
  const formData = Object.fromEntries(data);
  const parsed = printFormSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      message: printFormContent.t(PrintFormContentPhrases.FORM_DATA_INVALID),
      errors: parsed.error.errors,
    };
  }

  const { name, description } = parsed.data;

  try {
    await db.print.create({ data: { name, description } });

    revalidatePath('/prints');

    return {
      message: printFormContent.t(PrintFormContentPhrases.PRINT_CREATED),
    };
  } catch (error) {
    return {
      message: printFormContent.t(PrintFormContentPhrases.ERROR_WHILE_CREATING),
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
