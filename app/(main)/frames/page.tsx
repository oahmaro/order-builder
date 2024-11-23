import { Stack } from '@mantine/core';

import { db } from '@/lib/db';
import { FramesPageHeader, FramesTable } from './_components';
import { withAuditInfo } from '@/utils';

const validSortFields = ['id', 'name', 'createdAt', 'updatedAt'] as const;

type ValidSortField = (typeof validSortFields)[number];

const isValidSortField = (field: string | undefined): field is ValidSortField =>
  typeof field === 'string' && validSortFields.includes(field as ValidSortField);

interface FramesPageProps {
  searchParams: { [key: string]: string | undefined };
}

export default async function FramesPage({ searchParams }: FramesPageProps) {
  const { sortBy, sortDir } = searchParams;

  const frames = await db.frame.findMany({
    orderBy: isValidSortField(sortBy)
      ? {
          [sortBy]: sortDir === 'desc' ? 'desc' : 'asc',
        }
      : { createdAt: 'desc' },
  });

  const framesWithAudit = await withAuditInfo(frames, 'Frame');

  return (
    <Stack gap="lg">
      <FramesPageHeader numberOfFrames={framesWithAudit.length} />
      <FramesTable frames={framesWithAudit} />
    </Stack>
  );
}
