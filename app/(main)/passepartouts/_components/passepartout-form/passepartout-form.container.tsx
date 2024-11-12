'use client';

import { z } from 'zod';
import { ReactNode } from 'react';
import { Passepartout } from '@prisma/client';
import { createFormContext, zodResolver } from '@mantine/form';

import { passepartoutFormSchema } from './passepartout-form.schema';

export type PassepartoutFormValues = z.infer<typeof passepartoutFormSchema>;

export const [PassepartoutFormProvider, usePassepartoutFormContext, usePassepartoutForm] =
  createFormContext<PassepartoutFormValues>();

interface PassepartoutFormContainerProps {
  children: ReactNode;
  passepartout?: Passepartout;
}

export default function PassepartoutFormContainer({
  children,
  passepartout,
}: PassepartoutFormContainerProps) {
  const form = usePassepartoutForm({
    initialValues: {
      name: passepartout?.name || '',
      description: passepartout?.description || '',
    },

    validate: zodResolver(passepartoutFormSchema),
  });

  return <PassepartoutFormProvider form={form}>{children}</PassepartoutFormProvider>;
}
