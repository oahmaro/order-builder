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

    // Process all images in parallel with optimized Sharp configuration
    const processPromises = orderItems.map(async (_: OrderItem, index: number) => {
      const imageFile = formData.get(`orderItem${index}Image`) as File;
      if (!imageFile) return { index, url: null };

      try {
        const buffer = Buffer.from(await imageFile.arrayBuffer());
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
            adaptiveFiltering: true,
            palette: true,
          })
          .toBuffer({ resolveWithObject: false });

        const filename = `${orderFolderPath}/item-${index}.png`;

        await spacesClient.send(
          new PutObjectCommand({
            Bucket: SPACES_BUCKET,
            Key: filename,
            Body: processedImageBuffer,
            ACL: 'public-read',
            ContentType: 'image/png',
            CacheControl: 'public, max-age=31536000',
          })
        );

        return { index, url: `${SPACES_CDN_ENDPOINT}/${filename}` };
      } catch (error) {
        console.error(`Failed to process image ${index}:`, error);
        return { index, url: null };
      }
    });

    const results = await Promise.all(processPromises);

    // Update urls array with results
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
