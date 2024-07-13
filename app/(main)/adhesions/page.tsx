import { Stack } from '@mantine/core';

import { db } from '@/lib/db';
import { AdhesionsPageHeader, AdhesionsTable } from './_components';

export default async function AdhesionsPage() {
  const adhesions = await db.adhesion.findMany();

  return (
    <Stack gap={40}>
      <AdhesionsPageHeader numberOfAdhesions={adhesions.length} />
      <AdhesionsTable adhesions={adhesions} />
    </Stack>
  );
}
