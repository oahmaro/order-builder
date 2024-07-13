'use client';

import { z } from 'zod';
import { ReactNode } from 'react';
import { createFormContext, zodResolver } from '@mantine/form';

import { createDescriptionFormSchema } from './create-description-form.schema';

export type CreateDescriptionFormValues = z.infer<typeof createDescriptionFormSchema>;

export const [
  CreateDescriptionFormProvider,
  useCreateDescriptionFormContext,
  useCreateDescriptionForm,
] = createFormContext<CreateDescriptionFormValues>();

interface CreateDescriptionFormContainerProps {
  children: ReactNode;
}

export default function CreateDescriptionFormContainer({
  children,
}: CreateDescriptionFormContainerProps) {
  const form = useCreateDescriptionForm({
    initialValues: { name: '' },
    validate: zodResolver(createDescriptionFormSchema),
  });

  return <CreateDescriptionFormProvider form={form}>{children}</CreateDescriptionFormProvider>;
}
