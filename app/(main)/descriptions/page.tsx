import { Stack } from '@mantine/core';
import Polyglot from 'node-polyglot';

import { PageHeader } from '@/components/page-header';
import { db } from '@/lib/db';

const polyglot = new Polyglot({
  locale: 'he',
  phrases: { descriptions: '%{smart_count} תיאור |||| %{smart_count} תיאורים' },
});

export default async function DescriptionsPage() {
  const descriptions = await db.description.findMany();

  return (
    <Stack gap={40}>
      <PageHeader title="תיאורים" subtitle={polyglot.t('descriptions', descriptions.length)} />
    </Stack>
  );
}
