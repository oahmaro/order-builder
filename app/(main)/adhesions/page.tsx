import { Stack } from '@mantine/core';

import { db } from '@/lib/db';
import { AdhesionsPageHeader, AdhesionsTable } from './_components';
import { withAuditInfo } from '@/utils';

export default async function AdhesionsPage() {
  const adhesions = await db.adhesion.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: { orderItems: true },
      },
    },
  });

  const adhesionsWithAudit = await withAuditInfo(adhesions, 'Adhesion');

  return (
    <Stack gap="lg">
      <AdhesionsPageHeader numberOfAdhesions={adhesionsWithAudit.length} />
      <AdhesionsTable adhesions={adhesionsWithAudit} />
    </Stack>
  );
}
