'use server';

import { revalidatePath } from 'next/cache';

import { db } from '@/lib/db';
import {
  frameFormContent,
  FrameFormContentPhrases,
} from '../_components/frame-form/frame-form.content';

export type DeleteFrameFormState = {
  message: string;
};

export async function deleteFrameAction(frameId: number): Promise<DeleteFrameFormState> {
  try {
    await db.frame.delete({
      where: { id: frameId },
    });

    revalidatePath('/frames');

    return {
      message: frameFormContent.t(FrameFormContentPhrases.FRAME_DELETED),
    };
  } catch (error) {
    return {
      message: frameFormContent.t(FrameFormContentPhrases.ERROR_WHILE_DELETING),
    };
  }
}
