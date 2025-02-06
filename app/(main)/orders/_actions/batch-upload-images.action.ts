'use server';

import Sharp from 'sharp';
import { PutObjectCommand } from '@aws-sdk/client-s3';

import { auth } from '@/auth';
import { IMAGE_CONFIG } from '@/config/image.config';
import { spacesClient, SPACES_BUCKET, SPACES_CDN_ENDPOINT } from '@/lib/spaces-client';

type BatchUploadResult = {
  urls: (string | null)[];
  error?: string;
};

interface OrderItem {
  id?: number;
  image: string | null;
  [key: string]: any;
}

export async function batchUploadImagesAction(
  formData: FormData,
  orderId: number
): Promise<BatchUploadResult> {
  const session = await auth();

  if (!session?.user?.id) {
    return { urls: [], error: 'Unauthorized' };
  }

  try {
    const orderItems = JSON.parse(formData.get('orderItems') as string) as OrderItem[];
    const urls: (string | null)[] = new Array(orderItems.length).fill(null);
    const timestamp = Date.now();
    const orderFolderPath = `order-images/${orderId}-${timestamp}`;

    // Process images in chunks to prevent memory overload
    const CHUNK_SIZE = 2;
    const chunks = Array.from({ length: Math.ceil(orderItems.length / CHUNK_SIZE) }, (_, i) =>
      orderItems.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE)
    );

    const results = await chunks.reduce(
      async (promise, chunk, chunkIndex) => {
        const previousResults = await promise;
        const chunkPromises = chunk.map(async (_, index) => {
          const actualIndex = chunkIndex * CHUNK_SIZE + index;
          const imageFile = formData.get(`orderItem${actualIndex}Image`) as File;
          if (!imageFile) return { index: actualIndex, url: null };

          try {
            const buffer = Buffer.from(await imageFile.arrayBuffer());
            const processedImageBuffer = await Sharp(buffer, {
              failOnError: false,
              sequentialRead: true,
              limitInputPixels: IMAGE_CONFIG.limitInputPixels,
            })
              .rotate()
              .resize(IMAGE_CONFIG.maxWidth, IMAGE_CONFIG.maxHeight, {
                fit: 'inside',
                withoutEnlargement: true,
                fastShrinkOnLoad: true,
              })
              .webp({
                // Using WebP instead of PNG for better compression
                quality: IMAGE_CONFIG.quality,
                effort: IMAGE_CONFIG.effort,
              })
              .toBuffer();

            const filename = `${orderFolderPath}/item-${actualIndex}.webp`;

            await spacesClient.send(
              new PutObjectCommand({
                Bucket: SPACES_BUCKET,
                Key: filename,
                Body: processedImageBuffer,
                ACL: 'public-read',
                ContentType: 'image/webp',
                CacheControl: 'public, max-age=31536000',
              })
            );

            return { index: actualIndex, url: `${SPACES_CDN_ENDPOINT}/${filename}` };
          } catch (error) {
            console.error(`Failed to process image ${actualIndex}:`, error);
            return { index: actualIndex, url: null };
          }
        });

        const chunkResults = await Promise.all(chunkPromises);
        return [...previousResults, ...chunkResults];
      },
      Promise.resolve([] as { index: number; url: string | null }[])
    );

    results.forEach((result) => {
      if (result) {
        urls[result.index] = result.url;
      }
    });

    return { urls };
  } catch (error) {
    console.error('Batch upload error:', error);
    return {
      urls: [],
      error: error instanceof Error ? error.message : 'Failed to process image uploads',
    };
  }
}
