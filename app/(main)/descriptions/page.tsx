import { Stack } from '@mantine/core';

import { db } from '@/lib/db';
import { DescriptionsPageHeader, DescriptionsTable } from './_components';

export default async function DescriptionsPage() {
  const descriptions = await db.description.findMany();

  return (
    <Stack gap="lg">
      <DescriptionsPageHeader numberOfDescriptions={descriptions.length} />
      <DescriptionsTable descriptions={descriptions} />
    </Stack>
  );
}
