'use client';

import { z } from 'zod';
import { ReactNode } from 'react';
import { Frame } from '@prisma/client';
import { createFormContext, zodResolver } from '@mantine/form';

import { frameFormSchema } from './frame-form.schema';

export type FrameFormValues = z.infer<typeof frameFormSchema>;

export const [FrameFormProvider, useFrameFormContext, useFrameForm] =
  createFormContext<FrameFormValues>();

interface FrameFormContainerProps {
  children: ReactNode;
  frame?: Frame;
}

export default function FrameFormContainer({ children, frame }: FrameFormContainerProps) {
  const form = useFrameForm({
    initialValues: {
      name: frame?.name || '',
      description: frame?.description || '',
    },
    validate: zodResolver(frameFormSchema),
  });

  return <FrameFormProvider form={form}>{children}</FrameFormProvider>;
}
