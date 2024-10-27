'use client';

import { z } from 'zod';
import { ReactNode } from 'react';
import { Print } from '@prisma/client';
import { createFormContext, zodResolver } from '@mantine/form';

import { printFormSchema } from './print-form.schema';

export type PrintFormValues = z.infer<typeof printFormSchema>;

export const [PrintFormProvider, usePrintFormContext, usePrintForm] =
  createFormContext<PrintFormValues>();

interface PrintFormContainerProps {
  children: ReactNode;
  print?: Print;
}

export default function PrintFormContainer({ children, print }: PrintFormContainerProps) {
  const form = usePrintForm({
    initialValues: {
      name: print?.name || '',
      description: print?.description || '',
    },

    validate: zodResolver(printFormSchema),
  });

  return <PrintFormProvider form={form}>{children}</PrintFormProvider>;
}
