import { Stack } from '@mantine/core';
import Polyglot from 'node-polyglot';

import { db } from '@/lib/db';
import { UsersPageHeader, UsersTable } from './_components';

const polyglot = new Polyglot({
  locale: 'he',
  phrases: { users: '%{smart_count} משתמש |||| %{smart_count} משתמשים' },
});

export default async function UsersPage() {
  const users = await db.user.findMany();

  return (
    <Stack gap={40}>
      <UsersPageHeader title="משתמשים" subtitle={polyglot.t('users', users.length)} />
      <UsersTable users={users} />
    </Stack>
  );
}
