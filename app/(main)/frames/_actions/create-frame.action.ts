'use server';

import { revalidatePath } from 'next/cache';

import { auth } from '@/auth';
import { db } from '@/lib/db';
import { frameFormSchema } from '../_components/frame-form/frame-form.schema';

import {
  frameFormContent,
  FrameFormContentPhrases,
} from '../_components/frame-form/frame-form.content';

export async function createFrameAction(data: FormData) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      message: 'Unauthorized',
      errors: ['User must be logged in'],
    };
  }

  const formData = Object.fromEntries(data);
  const parsed = frameFormSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      message: frameFormContent.t(FrameFormContentPhrases.FORM_DATA_INVALID),
      errors: parsed.error.errors,
    };
  }

  const { name, description } = parsed.data;

  try {
    // Create the frame
    const frame = await db.frame.create({
      data: {
        name,
        description,
      },
    });

    // Create audit entry
    await db.audit.create({
      data: {
        entityId: frame.id,
        entityType: 'Frame',
        action: 'CREATE',
        userId: Number(session.user.id),
        changes: JSON.parse(JSON.stringify({ name, description })),
      },
    });

    revalidatePath('/frames');

    return {
      message: frameFormContent.t(FrameFormContentPhrases.FRAME_CREATED),
    };
  } catch (error) {
    return {
      message: frameFormContent.t(FrameFormContentPhrases.ERROR_WHILE_CREATING),
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
