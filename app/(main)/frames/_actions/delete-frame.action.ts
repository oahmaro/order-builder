'use server';

import { revalidatePath } from 'next/cache';

import { auth } from '@/auth';
import { db } from '@/lib/db';
import {
  frameFormContent,
  FrameFormContentPhrases,
} from '../_components/frame-form/frame-form.content';

export type DeleteFrameFormState = {
  message: string;
};

export async function deleteFrameAction(frameId: number): Promise<DeleteFrameFormState> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      message: 'Unauthorized',
    };
  }

  try {
    // Get the frame data before deletion (for audit)
    const frame = await db.frame.findUnique({
      where: { id: frameId },
    });

    if (!frame) {
      return {
        message: 'Frame not found',
      };
    }

    // Delete the frame
    await db.frame.delete({
      where: { id: frameId },
    });

    // Create audit entry for deletion
    await db.audit.create({
      data: {
        entityId: frameId,
        entityType: 'Frame',
        action: 'DELETE',
        userId: Number(session.user.id),
        changes: JSON.parse(JSON.stringify(frame)),
      },
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
