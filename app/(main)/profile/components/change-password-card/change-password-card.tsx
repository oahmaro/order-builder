import { Box, Flex, Paper, PasswordInput, Stack, Title } from '@mantine/core';
import classes from './change-password-card.module.css';
import { useProfileFormContext } from '../../profile.context';

export default function ChangePasswordCard() {
  const form = useProfileFormContext();

  return (
    <Paper shadow="xs" radius="md" p="lg">
      <Stack>
        <Title order={2}>שנה סיסמא</Title>

        <Flex className={classes.inputsWrapper}>
          <PasswordInput
            label="סיסמה נוכחית"
            flex={1}
            spellCheck="false"
            {...form.getInputProps('password.currentPassword')}
          />
          <Box flex={1} />
        </Flex>

        <Flex className={classes.inputsWrapper}>
          <PasswordInput
            label="סיסמה"
            flex={1}
            spellCheck="false"
            {...form.getInputProps('password.password')}
          />
          <PasswordInput
            label="אשר סיסמה"
            flex={1}
            spellCheck="false"
            {...form.getInputProps('password.confirmPassword')}
          />
        </Flex>
      </Stack>
    </Paper>
  );
}
