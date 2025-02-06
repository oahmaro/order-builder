'use server';

import { PutObjectCommand } from '@aws-sdk/client-s3';
import Sharp from 'sharp';
import { auth } from '@/auth';
import { spacesClient, SPACES_BUCKET, SPACES_CDN_ENDPOINT } from '@/lib/spaces-client';
import { IMAGE_CONFIG } from '@/config/image.config';

type BatchUploadResult = {
  urls: (string | null)[];
  error?: string;
};

export async function batchUploadImagesAction(
  formData: FormData,
  orderId: number
): Promise<BatchUploadResult> {
  const session = await auth();

  if (!session?.user?.id) {
    return { urls: [], error: 'Unauthorized' };
  }

  try {
    const orderItems = JSON.parse(formData.get('orderItems') as string);
    const urls: (string | null)[] = new Array(orderItems.length).fill(null);
    const timestamp = Date.now();
    const orderFolderPath = `order-images/${orderId}-${timestamp}`;

    const uploadPromises = orderItems.map(async (_: any, index: number) => {
      const imageFile = formData.get(`orderItem${index}Image`) as File;
      if (!imageFile) return null;

      try {
        const buffer = Buffer.from(await imageFile.arrayBuffer());
        const processedImageBuffer = await Sharp(buffer, {
          failOnError: false,
          sequentialRead: true,
          limitInputPixels: 268402689, // 16384 x 16384
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
            effort: IMAGE_CONFIG.effort,
            progressive: IMAGE_CONFIG.progressive,
          })
          .toBuffer();

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

    const results = await Promise.all(uploadPromises);

    // Update urls array with results
    results.forEach((result) => {
      if (result) {
        urls[result.index] = result.url;
      }
    });

    return { urls };
  } catch (error) {
    return { urls: [], error: 'Failed to process image uploads' };
  }
}
