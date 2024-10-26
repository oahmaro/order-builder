'use client';

import { PageHeader } from '@/components';
import {
  customerPageHeaderContent,
  CustomerPageHeaderPhrases,
} from './customer-page-header.content';

export default function CustomerPageHeader({ name }: { name: string }) {
  return (
    <PageHeader
      title={name}
      backPath="/customers?page=1&pageSize=10&sort=name:ASC"
      action={{
        label: customerPageHeaderContent.t(CustomerPageHeaderPhrases.ACTION),
        onClick: () => {},
      }}
    />
  );
}
