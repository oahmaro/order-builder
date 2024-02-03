import { Stack } from '@mantine/core';
import Polyglot from 'node-polyglot';

import { PageHeader } from '@/components/page-header';
import { db } from '@/lib/db';

const polyglot = new Polyglot({
  locale: 'he',
  phrases: { prints: '%{smart_count} הדפס |||| %{smart_count} הדפסים' },
});

export default async function PrintsPage() {
  const prints = await db.print.findMany();

  return (
    <Stack gap={40}>
      <PageHeader title="הדפסים" subtitle={polyglot.t('prints', prints.length)} />
    </Stack>
  );
}
