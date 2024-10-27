'use server';

import { revalidatePath } from 'next/cache';

import { db } from '@/lib/db';

import {
  descriptionFormContent,
  DescriptionFormContentPhrases,
} from '../_components/description-form/description-form.content';

export type DeleteDescriptionFormState = {
  message: string;
};

export async function deleteDescriptionAction(
  descriptionId: number
): Promise<DeleteDescriptionFormState> {
  try {
    await db.description.delete({
      where: { id: descriptionId },
    });

    revalidatePath('/descriptions');

    return {
      message: descriptionFormContent.t(DescriptionFormContentPhrases.DESCRIPTION_DELETED),
    };
  } catch (error) {
    return {
      message: descriptionFormContent.t(DescriptionFormContentPhrases.ERROR_WHILE_DELETING),
    };
  }
}
