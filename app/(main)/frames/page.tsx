import { Stack } from '@mantine/core';

import { db } from '@/lib/db';
import { FramesPageHeader, FramesTable } from './_components';
import { withAuditInfo } from '@/utils';

export default async function FramesPage() {
  const frames = await db.frame.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const framesWithAudit = await withAuditInfo(frames, 'Frame');

  return (
    <Stack gap="lg">
      <FramesPageHeader numberOfFrames={framesWithAudit.length} />
      <FramesTable frames={framesWithAudit} />
    </Stack>
  );
}
