import { Stack } from '@mantine/core';

import { db } from '@/lib/db';
import { FramesPageHeader } from './_components';

export default async function FramesPage() {
  const frames = await db.frame.findMany();

  return (
    <Stack gap="lg">
      <FramesPageHeader numberOfFrames={frames.length} />
    </Stack>
  );
}
