'use server';

import { revalidatePath } from 'next/cache';

import { auth } from '@/auth';
import { db } from '@/lib/db';
import { printFormSchema } from '../_components/print-form/print-form.schema';

import {
  printFormContent,
  PrintFormContentPhrases,
} from '../_components/print-form/print-form.content';

export async function createPrintAction(data: FormData) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      message: 'Unauthorized',
      errors: ['User must be logged in'],
    };
  }

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
    // Create the print
    const print = await db.print.create({
      data: { name, description },
    });

    // Create audit entry
    await db.audit.create({
      data: {
        entityId: print.id,
        entityType: 'Print',
        action: 'CREATE',
        userId: Number(session.user.id),
        changes: JSON.parse(JSON.stringify({ name, description })),
      },
    });

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
