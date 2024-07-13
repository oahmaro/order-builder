import { Stack } from '@mantine/core';

import { db } from '@/lib/db';
import { UsersPageHeader, UsersTable } from './_components';

export default async function UsersPage() {
  const users = await db.user.findMany();

  return (
    <Stack gap="lg">
      <UsersPageHeader numberOfUsers={users.length} />
      <UsersTable users={users} />
    </Stack>
  );
}
