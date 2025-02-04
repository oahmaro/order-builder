'use server';

import { PutObjectCommand } from '@aws-sdk/client-s3';
import Sharp from 'sharp';

import { auth } from '@/auth';
import { spacesClient, SPACES_BUCKET, SPACES_CDN_ENDPOINT } from '@/lib/spaces-client';

const IMAGE_CONFIG = {
  maxWidth: 1200,
  maxHeight: 1200,
  format: 'png',
  quality: 80,
  compressionLevel: 6,
  adaptiveFiltering: true,
  palette: true,
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

    // Convert File to Buffer more efficiently
    const buffer = Buffer.from(await file.arrayBuffer());

    // Optimize Sharp pipeline
    const processedImageBuffer = await Sharp(buffer, {
      failOnError: false,
      sequentialRead: true,
    })
      .rotate()
      .resize(IMAGE_CONFIG.maxWidth, IMAGE_CONFIG.maxHeight, {
        fit: 'inside',
        withoutEnlargement: true,
        fastShrinkOnLoad: true,
      })
      .png({
        quality: IMAGE_CONFIG.quality,
        compressionLevel: IMAGE_CONFIG.compressionLevel,
        adaptiveFiltering: IMAGE_CONFIG.adaptiveFiltering,
        palette: IMAGE_CONFIG.palette,
      })
      .toBuffer({ resolveWithObject: false });

    const timestamp = Date.now();
    const filename = `order-images/${orderId}-${timestamp}/item-${orderItemIndex}.png`;

    // Upload to S3 with optimized settings
    try {
      await spacesClient.send(
        new PutObjectCommand({
          Bucket: SPACES_BUCKET,
          Key: filename,
          Body: processedImageBuffer,
          ACL: 'public-read',
          ContentType: 'image/png',
          CacheControl: 'public, max-age=31536000',
          ContentEncoding: 'gzip',
        })
      );
    } catch (uploadError) {
      if (uploadError instanceof Error) {
        return { error: `S3 Upload Error: ${uploadError.message}` };
      }
      return { error: 'Failed to upload to S3' };
    }

    return { url: `${SPACES_CDN_ENDPOINT}/${filename}` };
  } catch (error) {
    return { error: 'Failed to process or upload image' };
  }
}
