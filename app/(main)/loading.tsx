import { Stack } from '@mantine/core';

import { PageHeader } from '@/components/page-header';

export default function Loading() {
  return (
    <Stack gap={32}>
      <PageHeader isLoading />
    </Stack>
  );
}
