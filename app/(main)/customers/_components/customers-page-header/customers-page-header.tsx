'use client';

import { modals } from '@mantine/modals';

import { PageHeader } from '@/components';
import { CreateCustomerForm } from '../create-customer-form';
import CustomerFormContainer from '../customer-form/customer-form.container';

import {
  customersPageHeaderContent,
  CustomersPageHeaderPhrases,
} from './customers-page-header.content';

export interface CustomersPageHeaderProps {
  numberOfCustomers: number;
}

export default function CustomersPageHeader({ numberOfCustomers }: CustomersPageHeaderProps) {
  return (
    <PageHeader
      title={customersPageHeaderContent.t(CustomersPageHeaderPhrases.TITLE)}
      subtitle={customersPageHeaderContent.t(
        CustomersPageHeaderPhrases.SUBTITLE,
        numberOfCustomers
      )}
      backPath="/"
      actions={[
        {
          label: customersPageHeaderContent.t(CustomersPageHeaderPhrases.ACTION),
          onClick: () =>
            modals.open({
              title: customersPageHeaderContent.t(CustomersPageHeaderPhrases.MODAL_TITLE),
              size: 'xl',
              children: (
                <CustomerFormContainer>
                  <CreateCustomerForm />
                </CustomerFormContainer>
              ),
            }),
        },
      ]}
    />
  );
}
