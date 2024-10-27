'use client';

import { z } from 'zod';
import { ReactNode } from 'react';
import { Adhesion } from '@prisma/client';
import { createFormContext, zodResolver } from '@mantine/form';

import { adhesionFormSchema } from './adhesion-form.schema';

export type AdhesionFormValues = z.infer<typeof adhesionFormSchema>;

export const [AdhesionFormProvider, useAdhesionFormContext, useAdhesionForm] =
  createFormContext<AdhesionFormValues>();

interface AdhesionFormContainerProps {
  children: ReactNode;
  adhesion?: Adhesion;
}

export default function AdhesionFormContainer({ children, adhesion }: AdhesionFormContainerProps) {
  const form = useAdhesionForm({
    initialValues: {
      name: adhesion?.name || '',
      description: adhesion?.description || '',
    },

    validate: zodResolver(adhesionFormSchema),
  });

  return <AdhesionFormProvider form={form}>{children}</AdhesionFormProvider>;
}
