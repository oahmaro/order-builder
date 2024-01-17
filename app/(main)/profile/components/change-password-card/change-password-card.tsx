import { Box, Flex, Paper, Stack, TextInput, Title } from '@mantine/core';
import classes from './change-password-card.module.css';

export default function ChangePasswordCard() {
  return (
    <Paper shadow="xs" radius="md" p="lg">
      <Stack>
        <Title order={2}>שנה סיסמא</Title>

        <Flex className={classes.inputsWrapper}>
          <TextInput label="סיסמה נוכחית" flex={1} />
          <Box flex={1} />
        </Flex>

        <Flex className={classes.inputsWrapper}>
          <TextInput label="סיסמה" flex={1} />
          <TextInput label="אשר סיסמה" flex={1} />
        </Flex>
      </Stack>
    </Paper>
  );
}
