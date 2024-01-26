import { Stack, Text, Title } from '@mantine/core';

export default async function HomePage() {
  return (
    <Stack maw={700} align="center" ta="center" m="24px auto">
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
