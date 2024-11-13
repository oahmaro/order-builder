import { Stack } from '@mantine/core';

import { db } from '@/lib/db';
import { DescriptionsPageHeader, DescriptionsTable } from './_components';
import { withAuditInfo } from '@/utils';

export default async function DescriptionsPage() {
  const descriptions = await db.description.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const descriptionsWithAudit = await withAuditInfo(descriptions, 'Description');

  return (
    <Stack gap="lg">
      <DescriptionsPageHeader numberOfDescriptions={descriptionsWithAudit.length} />
      <DescriptionsTable descriptions={descriptionsWithAudit} />
    </Stack>
  );
}
