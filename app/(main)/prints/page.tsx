import { Stack } from '@mantine/core';

import { db } from '@/lib/db';
import { PrintsPageHeader, PrintsTable } from './_components';

export default async function PrintsPage() {
  const prints = await db.print.findMany();

  return (
    <Stack gap={40}>
      <PrintsPageHeader numberOfPrints={prints.length} />
      <PrintsTable prints={prints} />
    </Stack>
  );
}
