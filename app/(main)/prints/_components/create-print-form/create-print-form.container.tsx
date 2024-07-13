'use client';

import { z } from 'zod';
import { ReactNode } from 'react';
import { createFormContext, zodResolver } from '@mantine/form';

import { createPrintFormSchema } from './create-print-form.schema';

export type CreatePrintFormValues = z.infer<typeof createPrintFormSchema>;

export const [CreatePrintFormProvider, useCreatePrintFormContext, useCreatePrintForm] =
  createFormContext<CreatePrintFormValues>();

interface CreatePrintFormContainerProps {
  children: ReactNode;
}

export default function CreatePrintFormContainer({ children }: CreatePrintFormContainerProps) {
  const form = useCreatePrintForm({
    initialValues: { name: '' },
    validate: zodResolver(createPrintFormSchema),
  });

  return <CreatePrintFormProvider form={form}>{children}</CreatePrintFormProvider>;
}
