import { Stack, Text, Title } from '@mantine/core';

import { auth } from '@/auth';

export default async function HomePage() {
  const session = await auth();

  return (
    <Stack maw={700} align="center" ta="center" m="24px auto">
      <div>{JSON.stringify(session)}</div>
      <Title order={1}>ברוך הבא 👋</Title>

      <Stack gap={0} align="center">
        <Text c="dimmed">
          אפליקציה זו פותרת את ניהול, יצירה ומעקב הזמנות בקלות, ומציעה יכולת להדפיסן בקלות. פשוט את
          התהליכים שלך ושמור על סדר בצורה יעילה.
        </Text>
      </Stack>
    </Stack>
  );
}
