import { Stack } from '@mantine/core';

import { PageHeader } from '@/components/page-header';

export default function LoadingPage() {
  return (
    <Stack gap={40}>
      <PageHeader isLoading />
    </Stack>
  );
}
