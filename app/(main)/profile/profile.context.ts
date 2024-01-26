'use client';

import * as z from 'zod';
import { createFormContext } from '@mantine/form';

import { ProfileSchema } from '@/schemas';

export type FormValues = z.infer<typeof ProfileSchema>;

export const [ProfileFormProvider, useProfileFormContext, useProfileForm] =
  createFormContext<FormValues>();
