import { Flex, Paper, Stack, TextInput, Title } from '@mantine/core';

import classes from './profile-card.module.css';
import { useProfileFormContext } from '../../_context/profile.context';

export default function ProfileCard() {
  const form = useProfileFormContext();

  return (
    <Paper shadow="xs" radius="md" p="lg">
      <Stack>
        <Title order={2}>פרופיל</Title>

        <Flex className={classes.inputsWrapper}>
          <TextInput
            label="שם פרטי"
            flex={1}
            required
            spellCheck="false"
            {...form.getInputProps('profile.firstName')}
          />
          <TextInput
            label="שם משפחה"
            flex={1}
            spellCheck="false"
            {...form.getInputProps('profile.lastName')}
          />
        </Flex>

        <Flex className={classes.inputsWrapper}>
          <TextInput
            flex={1}
            label="אימייל"
            required
            spellCheck="false"
            {...form.getInputProps('profile.email')}
          />
          <TextInput
            flex={1}
            label="שם משתמש"
            spellCheck="false"
            {...form.getInputProps('profile.username')}
          />
        </Flex>
      </Stack>
    </Paper>
  );
}
