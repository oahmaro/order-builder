'use client';

import { UserRole } from '@prisma/client';
import { Group, Select, Stack, TextInput, Title, PasswordInput } from '@mantine/core';

import { useUserFormContext } from './user-form.container';
import { userFormContent, UserFormContentPhrases } from './user-form.content';

export default function UserForm() {
  const form = useUserFormContext();

  return (
    <>
      <Stack gap="xl" mb={80}>
        <Stack component="section">
          <Title order={4}>{userFormContent.t(UserFormContentPhrases.USER_DETAILS)}</Title>

          <Group>
            <TextInput
              flex={1}
              label={userFormContent.t(UserFormContentPhrases.FIRST_NAME)}
              {...form.getInputProps('firstName')}
            />

            <TextInput
              flex={1}
              label={userFormContent.t(UserFormContentPhrases.LAST_NAME)}
              {...form.getInputProps('lastName')}
            />
          </Group>

          <Group>
            <TextInput
              required
              flex={1}
              label={userFormContent.t(UserFormContentPhrases.EMAIL)}
              {...form.getInputProps('email')}
            />

            <TextInput
              flex={1}
              label={userFormContent.t(UserFormContentPhrases.USERNAME)}
              {...form.getInputProps('username')}
            />
          </Group>
        </Stack>

        <Stack component="section">
          <Title order={4}>{userFormContent.t(UserFormContentPhrases.PASSWORD_SECTION)}</Title>

          <Group>
            <PasswordInput
              flex={1}
              required
              label={userFormContent.t(UserFormContentPhrases.PASSWORD)}
              {...form.getInputProps('password')}
            />

            <PasswordInput
              flex={1}
              required
              label={userFormContent.t(UserFormContentPhrases.CONFIRM_PASSWORD)}
              {...form.getInputProps('confirmPassword')}
            />
          </Group>
        </Stack>

        <Stack component="section">
          <Title order={4}>{userFormContent.t(UserFormContentPhrases.ROLE_SECTION)}</Title>

          <Select
            w="calc(50% - 8px)"
            required
            label={userFormContent.t(UserFormContentPhrases.ROLE)}
            data={[UserRole.ADMIN, UserRole.USER]}
            {...form.getInputProps('role')}
          />
        </Stack>
      </Stack>
    </>
  );
}
