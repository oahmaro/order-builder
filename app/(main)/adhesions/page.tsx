import { Stack } from '@mantine/core';

import { db } from '@/lib/db';
import { AdhesionsPageHeader, AdhesionsTable } from './_components';
import { withAuditInfo } from '@/utils';

interface AdhesionsPageProps {
  searchParams: { [key: string]: string | undefined };
}

const validSortFields = ['id', 'name', 'createdAt', 'updatedAt'] as const;

type ValidSortField = (typeof validSortFields)[number];

const isValidSortField = (field: string | undefined): field is ValidSortField =>
  typeof field === 'string' && validSortFields.includes(field as ValidSortField);

export default async function AdhesionsPage({ searchParams }: AdhesionsPageProps) {
  const { sortBy, sortDir } = searchParams;

  const adhesions = await db.adhesion.findMany({
    orderBy: isValidSortField(sortBy)
      ? {
          [sortBy]: sortDir === 'desc' ? 'desc' : 'asc',
        }
      : { createdAt: 'desc' },
    include: {
      _count: {
        select: { orderItems: true },
      },
    },
  });

  const adhesionsWithAudit = await withAuditInfo(adhesions, 'Adhesion');

  return (
    <Stack gap="lg">
      <AdhesionsPageHeader numberOfAdhesions={adhesionsWithAudit.length} />
      <AdhesionsTable adhesions={adhesionsWithAudit} />
    </Stack>
  );
}
