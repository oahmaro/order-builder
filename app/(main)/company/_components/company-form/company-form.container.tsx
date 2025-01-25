'use client';

import { z } from 'zod';
import { ReactNode } from 'react';
import { createFormContext } from '@mantine/form';
import { Address, Company, Phone } from '@prisma/client';

import { companyFormSchema } from './company-form.schema';

export type CompanyFormValues = z.infer<typeof companyFormSchema>;

export const [CompanyFormProvider, useCompanyFormContext, useCompanyForm] =
  createFormContext<CompanyFormValues>();

interface CompanyFormContainerProps {
  children: ReactNode;
  company?: Company & {
    address: Address;
    phones: Phone[];
  };
}

export default function CompanyFormContainer({ children, company }: CompanyFormContainerProps) {
  const form = useCompanyForm({
    initialValues: {
      name: company?.name || '',
      email: company?.email || '',
      address: {
        country: company?.address?.country || '',
        streetAddress: company?.address?.streetAddress || '',
        aptSuite: company?.address?.aptSuite || '',
        city: company?.address?.city || '',
        stateProvince: company?.address?.stateProvince || '',
        postalCode: company?.address?.postalCode || '',
      },
      phones: company?.phones?.length
        ? company.phones.map((phone) => ({
            number: phone.number,
            type: phone.type,
            isPrimary: phone.isPrimary,
          }))
        : [
            {
              number: '',
              type: 'MOBILE',
              isPrimary: true,
            },
          ],
    },
  });

  return <CompanyFormProvider form={form}>{children}</CompanyFormProvider>;
}
