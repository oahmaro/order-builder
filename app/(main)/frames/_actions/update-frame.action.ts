'use server';

import { revalidatePath } from 'next/cache';

import { db } from '@/lib/db';
import { frameFormSchema } from '../_components/frame-form/frame-form.schema';

import {
  frameFormContent,
  FrameFormContentPhrases,
} from '../_components/frame-form/frame-form.content';

type FormState = {
  message: string;
  errors?: any[];
};

export async function updateFrameAction(data: FormData): Promise<FormState> {
  const formData = Object.fromEntries(data);
  const frameId = parseInt(formData.frameId as string, 10);

  const parsed = frameFormSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      message: frameFormContent.t(FrameFormContentPhrases.FORM_DATA_INVALID),
      errors: parsed.error.errors,
    };
  }

  const { name, description } = parsed.data;

  try {
    await db.frame.update({
      where: { id: frameId },
      data: { name, description },
    });

    revalidatePath('/frames');

    return {
      message: frameFormContent.t(FrameFormContentPhrases.FRAME_UPDATED),
    };
  } catch (error) {
    return {
      message: frameFormContent.t(FrameFormContentPhrases.ERROR_WHILE_UPDATING),
    };
  }
}
