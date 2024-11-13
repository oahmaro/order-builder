'use server';

import { revalidatePath } from 'next/cache';

import { auth } from '@/auth';
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
  const session = await auth();

  if (!session?.user?.id) {
    return {
      message: 'Unauthorized',
      errors: ['User must be logged in'],
    };
  }

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
    // Get the old data for audit
    const oldPrint = await db.print.findUnique({
      where: { id: printId },
    });

    if (!oldPrint) {
      return {
        message: 'Print not found',
      };
    }

    // Update the print
    const updatedPrint = await db.print.update({
      where: { id: printId },
      data: { name, description },
    });

    // Create audit entry
    await db.audit.create({
      data: {
        entityId: printId,
        entityType: 'Print',
        action: 'UPDATE',
        userId: Number(session.user.id),
        changes: JSON.parse(
          JSON.stringify({
            before: oldPrint,
            after: updatedPrint,
          })
        ),
      },
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
