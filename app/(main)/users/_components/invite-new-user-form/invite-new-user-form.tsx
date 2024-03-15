import { Group, Select, Stack, TextInput, Title } from '@mantine/core';
import { UserRole } from '@prisma/client';

import classes from './invite-new-user-form.module.css';

export default function InviteNewUserForm() {
  return (
    <Stack gap={32} className={classes.root}>
      <Stack component="section">
        <Title order={4}>User details</Title>

        <Group wrap="wrap">
          <TextInput
            className={classes.input}
            label="First name"
            placeholder="e.g. John"
            size="sm"
            required
          />
          <TextInput className={classes.input} label="Last name" placeholder="e.g. Doe" size="sm" />
          <TextInput
            className={classes.input}
            label="Email"
            placeholder="e.g. john.doe@example.com"
            size="sm"
            required
          />
          <TextInput
            className={classes.input}
            label="Username"
            placeholder="e.g. john.doe@example.com"
            size="sm"
          />
        </Group>
      </Stack>

      <Stack component="section">
        <Title order={4}>Role</Title>

        <Select
          className={classes.input}
          label="User's role"
          placeholder="Select"
          size="sm"
          data={[UserRole.ADMIN, UserRole.USER]}
          required
        />
      </Stack>
    </Stack>
  );
}
