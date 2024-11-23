import { Stack } from '@mantine/core';

import { db } from '@/lib/db';
import { CustomersPageHeader, CustomersTable } from './_components';
import { withAuditInfo } from '@/utils';

interface CustomersPageProps {
  searchParams: { [key: string]: string | undefined };
}

const validSortFields = [
  'id',
  'firstName',
  'lastName',
  'email',
  'dateOfBirth',
  'createdAt',
  'updatedAt',
] as const;

type ValidSortField = (typeof validSortFields)[number];

const isValidSortField = (field: string | undefined): field is ValidSortField =>
  typeof field === 'string' && validSortFields.includes(field as ValidSortField);

export default async function CustomersPage({ searchParams }: CustomersPageProps) {
  const { sortBy, sortDir } = searchParams;

  const customers = await db.customer.findMany({
    orderBy: isValidSortField(sortBy)
      ? {
          [sortBy]: sortDir === 'desc' ? 'desc' : 'asc',
        }
      : { createdAt: 'desc' },
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
