'use server';

import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import { auth } from '@/auth';
import { spacesClient, SPACES_BUCKET } from '@/lib/spaces-client';

type DeleteImageResponse = {
  success: boolean;
  error?: string;
};

export async function deleteImageAction(imageUrl: string): Promise<DeleteImageResponse> {
  const session = await auth();

  if (!session?.user?.id) {
    return { success: false, error: 'Unauthorized' };
  }

  try {
    // Extract the key from the CDN URL
    const urlParts = imageUrl.split('/');
    const key = urlParts.slice(urlParts.indexOf('order-images')).join('/');

    await spacesClient.send(
      new DeleteObjectCommand({
        Bucket: SPACES_BUCKET,
        Key: key,
      })
    );

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete image',
    };
  }
}
