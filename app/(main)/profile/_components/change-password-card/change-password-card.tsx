import { Box, Flex, Paper, PasswordInput, Stack, Title } from '@mantine/core';

import classes from './change-password-card.module.css';
import { useProfileFormContext } from '../profile-form/profile-form.container';

import {
  changePasswordCardContent,
  ChangePasswordCardContentPhrases,
} from './change-password-card.content';

export default function ChangePasswordCard() {
  const form = useProfileFormContext();

  return (
    <Paper shadow="xs" radius="md" p="lg">
      <Stack>
        <Title order={2}>
          {changePasswordCardContent.t(ChangePasswordCardContentPhrases.TITLE)}
        </Title>

        <Flex className={classes.inputsWrapper}>
          <PasswordInput
            label={changePasswordCardContent.t(ChangePasswordCardContentPhrases.CURRENT_PASSWORD)}
            flex={1}
            spellCheck="false"
            {...form.getInputProps('password.currentPassword')}
          />
          <Box flex={1} />
        </Flex>

        <Flex className={classes.inputsWrapper}>
          <PasswordInput
            label={changePasswordCardContent.t(ChangePasswordCardContentPhrases.NEW_PASSWORD)}
            flex={1}
            spellCheck="false"
            {...form.getInputProps('password.password')}
          />
          <PasswordInput
            label={changePasswordCardContent.t(ChangePasswordCardContentPhrases.CONFIRM_PASSWORD)}
            flex={1}
            spellCheck="false"
            {...form.getInputProps('password.confirmPassword')}
          />
        </Flex>
      </Stack>
    </Paper>
  );
}
