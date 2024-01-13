import { Card, Flex, Stack, TextInput, Title } from '@mantine/core';

import classes from './profile-card.module.css';

export default function ProfileCard() {
  return (
    <Card>
      <Stack>
        <Title order={2}>פרופיל</Title>

        <Flex className={classes.inputsWrapper}>
          <TextInput label="שם פרטי" flex={1} required />
          <TextInput label="שם משפחה" flex={1} />
        </Flex>

        <Flex className={classes.inputsWrapper}>
          <TextInput flex={1} label="אימייל" required />
          <TextInput flex={1} label="שם משתמש" />
        </Flex>
      </Stack>
    </Card>
  );
}
