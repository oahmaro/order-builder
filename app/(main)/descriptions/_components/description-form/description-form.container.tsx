'use client';

import { z } from 'zod';
import { ReactNode } from 'react';
import { Description } from '@prisma/client';
import { createFormContext, zodResolver } from '@mantine/form';

import { descriptionFormSchema } from './description-form.schema';

export type DescriptionFormValues = z.infer<typeof descriptionFormSchema>;

export const [DescriptionFormProvider, useDescriptionFormContext, useDescriptionForm] =
  createFormContext<DescriptionFormValues>();

interface DescriptionFormContainerProps {
  children: ReactNode;
  description?: Description;
}

export default function DescriptionFormContainer({
  children,
  description,
}: DescriptionFormContainerProps) {
  const form = useDescriptionForm({
    initialValues: {
      name: description?.name || '',
      description: description?.description || '',
    },

    validate: zodResolver(descriptionFormSchema),
  });

  return <DescriptionFormProvider form={form}>{children}</DescriptionFormProvider>;
}
