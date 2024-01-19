'use server';

import * as z from 'zod';
import { LoginSchema } from '@/schemas';
import { ResponseObject } from './types';

export async function login(values: z.infer<typeof LoginSchema>): Promise<ResponseObject> {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { message: 'Invalid fields!', status: 422 };
  }

  return { message: 'Success', status: 200 };
}
