import { Stack } from '@mantine/core';

import { PageHeader } from '@/components/page-header';

export default function LoadingPage() {
  return (
    <Stack gap="lg">
      <PageHeader isLoading />
    </Stack>
  );
}
