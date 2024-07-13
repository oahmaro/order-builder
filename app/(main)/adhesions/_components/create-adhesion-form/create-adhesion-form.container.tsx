'use client';

import { z } from 'zod';
import { ReactNode } from 'react';
import { createFormContext, zodResolver } from '@mantine/form';

import { createAdhesionFormSchema } from './create-adhesion-from.schema';

export type CreateAdhesionFormValues = z.infer<typeof createAdhesionFormSchema>;

export const [CreateAdhesionFormProvider, useCreateAdhesionFormContext, useCreateAdhesionForm] =
  createFormContext<CreateAdhesionFormValues>();

interface CreateAdhesionFormContainerProps {
  children: ReactNode;
}

export default function CreateAdhesionFormContainer({
  children,
}: CreateAdhesionFormContainerProps) {
  const form = useCreateAdhesionForm({
    initialValues: { name: '' },
    validate: zodResolver(createAdhesionFormSchema),
  });

  return <CreateAdhesionFormProvider form={form}>{children}</CreateAdhesionFormProvider>;
}
