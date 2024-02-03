import { redirect } from 'next/navigation';
import { UserRole } from '@prisma/client';
import { Stack } from '@mantine/core';
import Polyglot from 'node-polyglot';

import { auth } from '@/auth';
import { PageHeader } from '@/components/page-header';
import { db } from '@/lib/db';

const polyglot = new Polyglot({
  locale: 'he',
  phrases: { users: '%{smart_count} משתמש |||| %{smart_count} משתמשים' },
});

export default async function UsersPage() {
  const session = await auth();

  if (session?.user?.role !== UserRole.ADMIN) {
    redirect('/');
  }

  const users = await db.user.findMany();

  return (
    <Stack gap={40}>
      <PageHeader title="משתמשים" subtitle={polyglot.t('users', users.length)} />
    </Stack>
  );
}
