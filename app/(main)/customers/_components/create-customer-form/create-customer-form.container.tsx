'use client';

import { z } from 'zod';
import { ReactNode } from 'react';
import { createFormContext, zodResolver } from '@mantine/form';

import { createCustomerFormSchema } from './create-customer-form.schema';

export type CreateCustomerFormValues = z.infer<typeof createCustomerFormSchema>;

export const [CreateCustomerFormProvider, useCreateCustomerFormContext, useCreateCustomerForm] =
  createFormContext<CreateCustomerFormValues>();

interface CreateCustomerFormContainerProps {
  children: ReactNode;
}

export default function CreateCustomerFormContainer({
  children,
}: CreateCustomerFormContainerProps) {
  const form = useCreateCustomerForm({
    initialValues: {
      firstName: '',
      lastName: '',
      phones: [{ countryCode: 'IL:+972', number: '', type: 'MOBILE', isPrimary: true }],
      email: '',
      dateOfBirth: '',
      address: {
        country: '',
        streetAddress: '',
        aptSuite: '',
        city: '',
        stateProvince: '',
        postalCode: '',
      },
    },
    validate: zodResolver(createCustomerFormSchema),
  });

  return <CreateCustomerFormProvider form={form}>{children}</CreateCustomerFormProvider>;
}
