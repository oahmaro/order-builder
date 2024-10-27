'use server';

import { revalidatePath } from 'next/cache';

import { db } from '@/lib/db';
import { printFormSchema } from '../_components/print-form/print-form.schema';

import {
  printFormContent,
  PrintFormContentPhrases,
} from '../_components/print-form/print-form.content';

type FormState = {
  message: string;
  errors?: any[];
};

export async function updatePrintAction(data: FormData): Promise<FormState> {
  const formData = Object.fromEntries(data);
  const printId = parseInt(formData.printId as string, 10);

  const parsed = printFormSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      message: printFormContent.t(PrintFormContentPhrases.FORM_DATA_INVALID),
      errors: parsed.error.errors,
    };
  }

  const { name, description } = parsed.data;

  try {
    await db.print.update({
      where: { id: printId },
      data: { name, description },
    });

    revalidatePath('/prints');

    return {
      message: printFormContent.t(PrintFormContentPhrases.PRINT_UPDATED),
    };
  } catch (error) {
    return {
      message: printFormContent.t(PrintFormContentPhrases.ERROR_WHILE_UPDATING),
    };
  }
}
