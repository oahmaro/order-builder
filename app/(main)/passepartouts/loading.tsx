import { Stack } from '@mantine/core';

import { PageHeader } from '@/components';

export default function LoadingPage() {
  return (
    <Stack gap="lg">
      <PageHeader isLoading />
    </Stack>
  );
}
