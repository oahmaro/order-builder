import { Flex, Paper, Stack, TextInput, Title } from '@mantine/core';

import classes from './profile-card.module.css';

import { useProfileFormContext } from '../profile-form/profile-form.container';
import { profileCardContent, ProfileCardContentPhrases } from './profile-card.content';

export default function ProfileCard() {
  const form = useProfileFormContext();

  return (
    <Paper shadow="xs" radius="md" p="lg">
      <Stack>
        <Title order={2}>{profileCardContent.t(ProfileCardContentPhrases.TITLE)}</Title>

        <Flex className={classes.inputsWrapper}>
          <TextInput
            label={profileCardContent.t(ProfileCardContentPhrases.FIRST_NAME)}
            flex={1}
            required
            spellCheck="false"
            {...form.getInputProps('profile.firstName')}
          />
          <TextInput
            label={profileCardContent.t(ProfileCardContentPhrases.LAST_NAME)}
            flex={1}
            spellCheck="false"
            {...form.getInputProps('profile.lastName')}
          />
        </Flex>

        <Flex className={classes.inputsWrapper}>
          <TextInput
            flex={1}
            label={profileCardContent.t(ProfileCardContentPhrases.EMAIL)}
            required
            spellCheck="false"
            {...form.getInputProps('profile.email')}
          />
          <TextInput
            flex={1}
            label={profileCardContent.t(ProfileCardContentPhrases.USERNAME)}
            spellCheck="false"
            {...form.getInputProps('profile.username')}
          />
        </Flex>
      </Stack>
    </Paper>
  );
}
