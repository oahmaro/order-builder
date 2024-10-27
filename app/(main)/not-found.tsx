'use client';

import Image from 'next/image';
import { Button, Stack, Title } from '@mantine/core';

import { Link } from '@/components';
import { notFoundPageContent, NotFoundPagePhrases } from './_content';

export default function PageNotFound() {
  return (
    <Stack align="center" justify="center" h="100%" mt={72} gap={0}>
      <Image src="/page-not-found.svg" width={500} height={300} alt="Page not found illustration" />

      <Stack mt={-32}>
        <Title order={3}>{notFoundPageContent.t(NotFoundPagePhrases.TITLE)}</Title>
        <Button component={Link} href="/">
          {notFoundPageContent.t(NotFoundPagePhrases.GO_HOME)}
        </Button>
      </Stack>
    </Stack>
  );
}
