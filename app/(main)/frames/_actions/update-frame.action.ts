'use server';

import { revalidatePath } from 'next/cache';

import { auth } from '@/auth';
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
  const session = await auth();

  if (!session?.user?.id) {
    return {
      message: 'Unauthorized',
      errors: ['User must be logged in'],
    };
  }

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
    // Get the old data for audit
    const oldFrame = await db.frame.findUnique({
      where: { id: frameId },
    });

    if (!oldFrame) {
      return {
        message: 'Frame not found',
      };
    }

    // Update the frame
    const updatedFrame = await db.frame.update({
      where: { id: frameId },
      data: { name, description },
    });

    // Create audit entry
    await db.audit.create({
      data: {
        entityId: frameId,
        entityType: 'Frame',
        action: 'UPDATE',
        userId: Number(session.user.id),
        changes: JSON.parse(
          JSON.stringify({
            before: oldFrame,
            after: updatedFrame,
          })
        ),
      },
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
