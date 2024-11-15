'use server';

import { PutObjectCommand } from '@aws-sdk/client-s3';

import { auth } from '@/auth';
import { spacesClient, SPACES_BUCKET, SPACES_CDN_ENDPOINT } from '@/lib/spaces-client';

type UploadImageResponse = {
  url?: string;
  error?: string;
};

export async function uploadImageAction(data: FormData): Promise<UploadImageResponse> {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: 'Unauthorized' };
  }

  try {
    const file = data.get('file') as File;
    const orderItemIndex = data.get('orderItemIndex') as string;
    const orderId = data.get('orderId') as string;

    if (!file) {
      return { error: 'No file provided' };
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const timestamp = Date.now();
    const fileExtension = file.name.split('.').pop() || 'jpg';
    const filename = `order-images/${orderItemIndex}-${orderId}-${timestamp}.${fileExtension}`;

    try {
      await spacesClient.send(
        new PutObjectCommand({
          Bucket: SPACES_BUCKET,
          Key: filename,
          Body: buffer,
          ACL: 'public-read',
          ContentType: file.type,
        })
      );
    } catch (uploadError) {
      if (uploadError instanceof Error) {
        return {
          error: `S3 Upload Error: ${uploadError.message}`,
        };
      }
      return {
        error: 'Failed to upload to S3',
      };
    }

    const imageUrl = `${SPACES_CDN_ENDPOINT}/${filename}`;
    return { url: imageUrl };
  } catch (error) {
    return { error: 'Failed to upload image' };
  }
}
