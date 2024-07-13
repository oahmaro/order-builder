import { Stack } from '@mantine/core';
import Polyglot from 'node-polyglot';

import { PageHeader } from '@/components/page-header';
import { db } from '@/lib/db';

const polyglot = new Polyglot({
  locale: 'he',
  phrases: { frames: '%{smart_count} מסגרת |||| %{smart_count} מסגרות' },
});

export default async function FramesPage() {
  const frames = await db.frame.findMany();

  return (
    <Stack gap="lg">
      <PageHeader title="תיאורים" subtitle={polyglot.t('frames', frames.length)} backPath="/" />
    </Stack>
  );
}
