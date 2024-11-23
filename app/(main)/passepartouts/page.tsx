import { Stack } from '@mantine/core';

import { db } from '@/lib/db';
import { withAuditInfo } from '@/utils';
import { PassepartoutsPageHeader, PassepartoutsTable } from './_components';

interface PassepartoutsPageProps {
  searchParams: { [key: string]: string | undefined };
}

const validSortFields = ['id', 'name', 'createdAt', 'updatedAt'] as const;

type ValidSortField = (typeof validSortFields)[number];

const isValidSortField = (field: string | undefined): field is ValidSortField =>
  typeof field === 'string' && validSortFields.includes(field as ValidSortField);

export default async function PassepartoutsPage({ searchParams }: PassepartoutsPageProps) {
  const { sortBy, sortDir } = searchParams;

  const passepartouts = await db.passepartout.findMany({
    orderBy: isValidSortField(sortBy)
      ? {
          [sortBy]: sortDir === 'desc' ? 'desc' : 'asc',
        }
      : { createdAt: 'desc' },
  });

  const passepartoutsWithAudit = await withAuditInfo(passepartouts, 'Passepartout');

  return (
    <Stack gap="lg">
      <PassepartoutsPageHeader numberOfPassepartouts={passepartoutsWithAudit.length} />
      <PassepartoutsTable passepartouts={passepartoutsWithAudit} />
    </Stack>
  );
}
