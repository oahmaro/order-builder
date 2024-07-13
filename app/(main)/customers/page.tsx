import { Stack } from '@mantine/core';

import { db } from '@/lib/db';
import { CustomersPageHeader, CustomersTable } from './_components';

export default async function CustomersPage() {
  const customers = await db.customer.findMany();

  return (
    <Stack gap="lg">
      <CustomersPageHeader numberOfCustomers={customers.length} />
      <CustomersTable customers={customers} />
    </Stack>
  );
}
