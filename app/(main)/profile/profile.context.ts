'use client';

import * as z from 'zod';
import { createFormContext } from '@mantine/form';
import { ProfileFormSchema } from '@/schemas';

export type FormValues = z.infer<typeof ProfileFormSchema>;

export const [ProfileFormProvider, useProfileFormContext, useProfileForm] =
  createFormContext<FormValues>();
