'use server';

import { auth } from '@/auth';
import { uploadImageAction } from './upload-image.action';

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
    const uploadPromises = [];
    const orderItems = JSON.parse(formData.get('orderItems') as string);

    for (let index = 0; index < orderItems.length; index += 1) {
      const imageFile = formData.get(`orderItem${index}Image`) as File;

      if (!imageFile) {
        uploadPromises.push(Promise.resolve(null));
      } else {
        const imageFormData = new FormData();
        imageFormData.append('file', imageFile);
        imageFormData.append('orderItemIndex', index.toString());
        imageFormData.append('orderId', orderId.toString());

        uploadPromises.push(uploadImageAction(imageFormData).then((result) => result.url ?? null));
      }
    }

    const urls = await Promise.all(uploadPromises);
    return { urls };
  } catch (error) {
    return { urls: [], error: 'Failed to process image uploads' };
  }
}
