'use client';

import { PageHeader } from '@/components';

import { useCustomerFormContext } from '../customer-form/customer-form.container';

import {
  customerPageHeaderContent,
  CustomerPageHeaderPhrases,
} from './customer-page-header.content';

export default function CustomerPageHeader({ name }: { name: string }) {
  const form = useCustomerFormContext();

  return (
    <PageHeader
      title={name}
      backPath="/customers?page=1&pageSize=10&sort=name:ASC"
      actions={[
        {
          label: customerPageHeaderContent.t(CustomerPageHeaderPhrases.ACTION),
          onClick: () => {},
          disabled: !form.isDirty(),
        },
      ]}
    />
  );
}
