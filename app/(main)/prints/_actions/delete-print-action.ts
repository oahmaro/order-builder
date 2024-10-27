'use server';

import { revalidatePath } from 'next/cache';

import { db } from '@/lib/db';

import {
  printFormContent,
  PrintFormContentPhrases,
} from '../_components/print-form/print-form.content';

export type DeletePrintFormState = {
  message: string;
};

export async function deletePrintAction(printId: number): Promise<DeletePrintFormState> {
  try {
    await db.print.delete({
      where: { id: printId },
    });

    revalidatePath('/prints');

    return {
      message: printFormContent.t(PrintFormContentPhrases.PRINT_DELETED),
    };
  } catch (error) {
    return {
      message: printFormContent.t(PrintFormContentPhrases.ERROR_WHILE_DELETING),
    };
  }
}
