'use client';

import { z } from 'zod';
import { ReactNode } from 'react';
import { Customer, Phone, Address } from '@prisma/client';
import { createFormContext, zodResolver } from '@mantine/form';

import { customerFormSchema } from './customer-form.schema';

export type CustomerFormValues = z.infer<typeof customerFormSchema>;

export const [CustomerFormProvider, useCustomerFormContext, useCustomerForm] =
  createFormContext<CustomerFormValues>();

interface CustomerFormContainerProps {
  children: ReactNode;
  customer?: Customer & { phones: Phone[]; address?: Address };
}

export default function CustomerFormContainer({ children, customer }: CustomerFormContainerProps) {
  const form = useCustomerForm({
    initialValues: {
      firstName: customer?.firstName || '',
      lastName: customer?.lastName || '',
      phones: customer?.phones.map((phone) => ({
        number: phone.number,
        isPrimary: phone.isPrimary,
        type: phone.type,
      })) || [{ number: '', isPrimary: true, type: 'MOBILE' }],
      email: customer?.email || '',
      dateOfBirth: customer?.dateOfBirth
        ? new Date(customer.dateOfBirth).toISOString().split('T')[0]
        : '',
      address: {
        country: customer?.address?.country || '',
        streetAddress: customer?.address?.streetAddress || '',
        aptSuite: customer?.address?.aptSuite || '',
        city: customer?.address?.city || '',
        stateProvince: customer?.address?.stateProvince || '',
        postalCode: customer?.address?.postalCode || '',
      },
    },
    validate: zodResolver(customerFormSchema),
  });

  return <CustomerFormProvider form={form}>{children}</CustomerFormProvider>;
}
