import { Stack } from '@mantine/core';
import Polyglot from 'node-polyglot';

import { PageHeader } from '@/components/page-header';
import { db } from '@/lib/db';

const polyglot = new Polyglot({
  locale: 'he',
  phrases: { customers: '%{smart_count} לקוח |||| %{smart_count} לקוחות' },
});

export default async function CustomersPage() {
  const customers = await db.customer.findMany();

  return (
    <Stack gap={40}>
      <PageHeader title="לקוחות" subtitle={polyglot.t('customers', customers.length)} />
    </Stack>
  );
}
