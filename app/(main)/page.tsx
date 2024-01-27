import { Stack, Text, Title } from '@mantine/core';
import { StatCardList } from './_components';

export default async function HomePage() {
  return (
    <Stack maw={700} m="0 auto">
      <Title order={1}>ברוך הבא 👋</Title>

      <Stack gap={0} align="center">
        <Text c="dimmed">
          אפליקציה זו פותרת את ניהול, יצירה ומעקב הזמנות בקלות, ומציעה יכולת להדפיסן בקלות. פשוט את
          התהליכים שלך ושמור על סדר בצורה יעילה.
        </Text>

        <StatCardList />
      </Stack>
    </Stack>
  );
}
