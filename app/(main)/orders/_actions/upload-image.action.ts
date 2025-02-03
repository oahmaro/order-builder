'use server';

import { PutObjectCommand } from '@aws-sdk/client-s3';
import Sharp from 'sharp';

import { auth } from '@/auth';
import { spacesClient, SPACES_BUCKET, SPACES_CDN_ENDPOINT } from '@/lib/spaces-client';

const IMAGE_CONFIG = {
  width: 800,
  height: 600,
  format: 'png',
  quality: 80,
} as const;

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

    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Process image with Sharp
    const processedImageBuffer = await Sharp(buffer)
      .rotate()
      .resize(IMAGE_CONFIG.width, IMAGE_CONFIG.height, {
        fit: 'cover',
        position: 'center',
      })
      .png({ quality: IMAGE_CONFIG.quality })
      .toBuffer();

    const filename = `order-images/${orderId}/item-${orderItemIndex}.png`;

    try {
      await spacesClient.send(
        new PutObjectCommand({
          Bucket: SPACES_BUCKET,
          Key: filename,
          Body: processedImageBuffer,
          ACL: 'public-read',
          ContentType: 'image/png',
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
    return { error: 'Failed to process or upload image' };
  }
}
