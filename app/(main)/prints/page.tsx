import { Stack } from '@mantine/core';

import { db } from '@/lib/db';
import { withAuditInfo } from '@/utils';
import { PrintsPageHeader, PrintsTable } from './_components';

interface PrintsPageProps {
  searchParams: { [key: string]: string | undefined };
}

const validSortFields = ['id', 'name', 'createdAt', 'updatedAt'] as const;

type ValidSortField = (typeof validSortFields)[number];

const isValidSortField = (field: string | undefined): field is ValidSortField =>
  typeof field === 'string' && validSortFields.includes(field as ValidSortField);

export default async function PrintsPage({ searchParams }: PrintsPageProps) {
  const { sortBy, sortDir } = searchParams;

  const prints = await db.print.findMany({
    orderBy: isValidSortField(sortBy)
      ? {
          [sortBy]: sortDir === 'desc' ? 'desc' : 'asc',
        }
      : { createdAt: 'desc' },
  });

  const printsWithAudit = await withAuditInfo(prints, 'Print');

  return (
    <Stack gap="lg">
      <PrintsPageHeader numberOfPrints={printsWithAudit.length} />
      <PrintsTable prints={printsWithAudit} />
    </Stack>
  );
}
