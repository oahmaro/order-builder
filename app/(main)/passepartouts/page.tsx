import { Stack } from '@mantine/core';

import { db } from '@/lib/db';
import { PassepartoutsPageHeader, PassepartoutsTable } from './_components';

export default async function PassepartoutPage() {
  const passepartouts = await db.passepartout.findMany();

  return (
    <Stack>
      <PassepartoutsPageHeader numberOfPassepartouts={passepartouts.length} />
      <PassepartoutsTable passepartouts={passepartouts} />
    </Stack>
  );
}
