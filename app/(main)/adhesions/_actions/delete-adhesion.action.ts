'use server';

import { revalidatePath } from 'next/cache';

import { db } from '@/lib/db';

import {
  adhesionFormContent,
  AdhesionFormContentPhrases,
} from '../_components/adhesion-form/adhesion-form.content';

export type DeleteAdhesionFormState = {
  message: string;
};

export async function deleteAdhesionAction(adhesionId: number): Promise<DeleteAdhesionFormState> {
  try {
    await db.adhesion.delete({
      where: { id: adhesionId },
    });

    revalidatePath('/adhesions');

    return {
      message: adhesionFormContent.t(AdhesionFormContentPhrases.ADHESION_DELETED),
    };
  } catch (error) {
    return {
      message: adhesionFormContent.t(AdhesionFormContentPhrases.ERROR_WHILE_DELETING),
    };
  }
}
