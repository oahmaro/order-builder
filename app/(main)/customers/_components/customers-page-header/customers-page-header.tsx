'use client';

import { modals } from '@mantine/modals';

import { PageHeader } from '@/components';
import {
  customersPageHeaderContent,
  CustomersPageHeaderPhrases,
} from './customer-page-header.content';
import CreateCustomerFormContainer from '../create-customer-form/create-customer-form.container';
import { CreateCustomerForm } from '../create-customer-form';

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
      action={{
        label: customersPageHeaderContent.t(CustomersPageHeaderPhrases.ACTION),
        onClick: () =>
          modals.open({
            title: customersPageHeaderContent.t(CustomersPageHeaderPhrases.MODAL_TITLE),
            size: 'xl',
            children: (
              <CreateCustomerFormContainer>
                <CreateCustomerForm />
              </CreateCustomerFormContainer>
            ),
          }),
      }}
    />
  );
}
