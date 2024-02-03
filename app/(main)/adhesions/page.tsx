import { Stack } from '@mantine/core';
import Polyglot from 'node-polyglot';

import { PageHeader } from '@/components/page-header';
import { db } from '@/lib/db';

const polyglot = new Polyglot({
  locale: 'he',
  phrases: { adhesions: '%{smart_count} הדבקה |||| %{smart_count} הדבקות' },
});

export default async function AdhesionsPage() {
  const adhesions = await db.adhesion.findMany();

  return (
    <Stack gap={40}>
      <PageHeader title="הידבקויות" subtitle={polyglot.t('adhesions', adhesions.length)} />
    </Stack>
  );
}
