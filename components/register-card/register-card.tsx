import { Box, Button, Card, Group, Stack, Text, TextInput, Title } from '@mantine/core';

import classes from './register-card.module.css';

export default function RegisterCard() {
  return (
    <Card className={classes.root} shadow="sm" padding="xl" radius="md" withBorder>
      <Stack component="form" align="center" gap={24}>
        <Box className={classes.logo} />

        <Stack gap={0} ta="center">
          <Title order={1}>ברוך הבא לאמנות!</Title>
          <Text c="dimmed">ליצור חשבון חדש</Text>
        </Stack>

        <Stack w="100%">
          <Group w="100%">
            <TextInput label="שם פרטי" required flex={1} />
            <TextInput label="שם משפחה" flex={1} />
          </Group>

          <TextInput label="אימייל" w="100%" size="md" required />
          <TextInput label="סיסמה" w="100%" size="md" required />
          <TextInput label="סיסמת אישור" w="100%" size="md" required />
        </Stack>

        <Button size="md" w="100%">
          בואו נתחיל
        </Button>
      </Stack>
    </Card>
  );
}
