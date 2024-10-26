'use client';

import { z } from 'zod';
import { ReactNode } from 'react';
import { createFormContext, zodResolver } from '@mantine/form';

import { customerFormSchema } from './customer-form.schema';

export type CustomerFormValues = z.infer<typeof customerFormSchema>;

export const [CustomerFormProvider, useCustomerFormContext, useCustomerForm] =
  createFormContext<CustomerFormValues>();

interface CustomerFormContainerProps {
  children: ReactNode;
}

export default function CustomerFormContainer({ children }: CustomerFormContainerProps) {
  const form = useCustomerForm({
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
    validate: zodResolver(customerFormSchema),
  });

  return <CustomerFormProvider form={form}>{children}</CustomerFormProvider>;
}
