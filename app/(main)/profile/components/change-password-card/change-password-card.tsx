import { Box, Flex, Paper, Stack, TextInput, Title } from '@mantine/core';
import classes from './change-password-card.module.css';
import { useProfileFormContext } from '../../profile.context';

export default function ChangePasswordCard() {
  const form = useProfileFormContext();

  return (
    <Paper shadow="xs" radius="md" p="lg">
      <Stack>
        <Title order={2}>שנה סיסמא</Title>

        <Flex className={classes.inputsWrapper}>
          <TextInput label="סיסמה נוכחית" flex={1} {...form.getInputProps('currentPassword')} />
          <Box flex={1} />
        </Flex>

        <Flex className={classes.inputsWrapper}>
          <TextInput label="סיסמה" flex={1} {...form.getInputProps('password')} />
          <TextInput label="אשר סיסמה" flex={1} {...form.getInputProps('confirmPassword')} />
        </Flex>
      </Stack>
    </Paper>
  );
}
