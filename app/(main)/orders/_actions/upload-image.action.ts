'use server';

import { PutObjectCommand } from '@aws-sdk/client-s3';

import { auth } from '@/auth';
import { commonContent, CommonPhrases } from '@/content';
import { spacesClient, SPACES_BUCKET, SPACES_CDN_ENDPOINT } from '@/lib/spaces-client';

type UploadImageResponse = {
  url?: string;
  error?: string;
};

export async function uploadImageAction(data: FormData): Promise<UploadImageResponse> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: 'Unauthorized',
    };
  }

  try {
    const file = data.get('file') as File;

    if (!file) {
      return {
        error: 'No file provided',
      };
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const timestamp = Date.now();
    const filename = `order-images/${timestamp}-${file.name}`;

    await spacesClient.send(
      new PutObjectCommand({
        Bucket: SPACES_BUCKET,
        Key: filename,
        Body: buffer,
        ACL: 'public-read',
        ContentType: file.type,
      })
    );

    const imageUrl = `${SPACES_CDN_ENDPOINT}/${filename}`;

    return { url: imageUrl };
  } catch (error) {
    // Check for specific AWS S3 errors
    if (error instanceof Error) {
      if (error.name === 'NoSuchBucket') {
        return { error: 'Storage configuration error' };
      }
      if (error.name === 'AccessDenied') {
        return { error: 'Storage access denied' };
      }
    }

    return {
      error: commonContent.t(CommonPhrases.UPLOAD_FAILED),
    };
  }
}
