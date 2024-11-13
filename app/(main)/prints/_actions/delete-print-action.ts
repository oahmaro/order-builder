'use server';

import { revalidatePath } from 'next/cache';

import { auth } from '@/auth';
import { db } from '@/lib/db';
import {
  printFormContent,
  PrintFormContentPhrases,
} from '../_components/print-form/print-form.content';

export type DeletePrintFormState = {
  message: string;
};

export async function deletePrintAction(printId: number): Promise<DeletePrintFormState> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      message: 'Unauthorized',
    };
  }

  try {
    // Get the print data before deletion (for audit)
    const print = await db.print.findUnique({
      where: { id: printId },
    });

    if (!print) {
      return {
        message: 'Print not found',
      };
    }

    // Delete the print
    await db.print.delete({
      where: { id: printId },
    });

    // Create audit entry for deletion
    await db.audit.create({
      data: {
        entityId: printId,
        entityType: 'Print',
        action: 'DELETE',
        userId: Number(session.user.id),
        changes: JSON.parse(JSON.stringify(print)),
      },
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
