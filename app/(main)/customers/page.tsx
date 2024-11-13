import { Stack } from '@mantine/core';

import { db } from '@/lib/db';
import { CustomersPageHeader, CustomersTable } from './_components';
import { withAuditInfo } from '@/utils';

export default async function CustomersPage() {
  const customers = await db.customer.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      phones: true,
    },
  });

  const customersWithAudit = await withAuditInfo(customers, 'Customer');

  return (
    <Stack gap="lg">
      <CustomersPageHeader numberOfCustomers={customersWithAudit.length} />
      <CustomersTable customers={customersWithAudit} />
    </Stack>
  );
}
