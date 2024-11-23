import { Stack } from '@mantine/core';

import { db } from '@/lib/db';
import { DescriptionsPageHeader, DescriptionsTable } from './_components';
import { withAuditInfo } from '@/utils';

interface DescriptionsPageProps {
  searchParams: { [key: string]: string | undefined };
}

const validSortFields = ['id', 'name', 'createdAt', 'updatedAt'] as const;

type ValidSortField = (typeof validSortFields)[number];

const isValidSortField = (field: string | undefined): field is ValidSortField =>
  typeof field === 'string' && validSortFields.includes(field as ValidSortField);

export default async function DescriptionsPage({ searchParams }: DescriptionsPageProps) {
  const { sortBy, sortDir } = searchParams;

  const descriptions = await db.description.findMany({
    orderBy: isValidSortField(sortBy)
      ? {
          [sortBy]: sortDir === 'desc' ? 'desc' : 'asc',
        }
      : { createdAt: 'desc' },
  });

  const descriptionsWithAudit = await withAuditInfo(descriptions, 'Description');

  return (
    <Stack gap="lg">
      <DescriptionsPageHeader numberOfDescriptions={descriptionsWithAudit.length} />
      <DescriptionsTable descriptions={descriptionsWithAudit} />
    </Stack>
  );
}
