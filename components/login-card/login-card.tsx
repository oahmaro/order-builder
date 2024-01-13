'use client';

import { Box, Button, Card, Stack, Text, TextInput, Title } from '@mantine/core';
import classes from './login-card.module.css';

export interface LoginCardProps {}

export default function LoginCard() {
  return (
    <Card className={classes.root} shadow="sm" padding="xl" radius="md" withBorder>
      <Stack component="form" align="center" gap={24}>
        <Box className={classes.logo} />

        <Stack gap={0} ta="center">
          <Title order={1}>ברוך הבא לאמנות!</Title>
          <Text c="dimmed">היכנס לחשבונך</Text>
        </Stack>

        <Stack w="100%">
          <TextInput label="שם משתמש" w="100%" size="md" required />
          <TextInput label="סיסמה" w="100%" size="md" required />
        </Stack>

        <Button size="md" w="100%">
          התחברות
        </Button>
      </Stack>
    </Card>
  );
}
