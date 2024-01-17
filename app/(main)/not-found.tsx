import { Button, Stack, Title } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';

export default function PageNotFound() {
  return (
    <Stack align="center" justify="center" h="calc(100vh - 200px)" gap={0}>
      <Image src="/page-not-found.svg" width={500} height={300} alt="Page not found illustration" />

      <Stack mt={-32}>
        <Title order={3}>הדף הזה לא נמצא.</Title>
        <Button component={Link} href="/">
          עבור לעמוד הבית
        </Button>
      </Stack>
    </Stack>
  );
}
