'use client';

import { User } from '@prisma/client';
import { LoadingOverlay, Stack } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useState, useTransition } from 'react';

import { ProfileCard } from '../profile-card';
import { updateProfile } from '../../_actions';
import { ProfileHeader } from '../profile-header';
import { generateUserTitle } from '@/utils/get-user-title';
import { ChangePasswordCard } from '../change-password-card';
import { FormValues, useProfileFormContext } from './profile-form.container';
import { profileFormContent, ProfileFormPhrases } from './profile-form.content';

interface ProfileFormProps {
  user: User;
}

export default function ProfileForm({ user }: ProfileFormProps) {
  const form = useProfileFormContext();
  const [isPending, startTransition] = useTransition();
  const [response, setResponse] = useState<{
    message: string;
    status: number;
    updatedUser: User | null;
  } | null>();

  function handleSubmit(values: FormValues) {
    startTransition(async () => {
      const { message, status, updatedUser } = await updateProfile(user.id!, values);

      if (status === 200) {
        form.resetDirty();
        notifications.show({
          color: 'teal',
          title: profileFormContent.t(ProfileFormPhrases.SAVE_SUCCESS),
          message,
        });
      }

      if (status === 403) {
        form.setFieldError('password.currentPassword', 'Invalid password');
      }

      setResponse({ message, status, updatedUser });
    });
  }

  const title = generateUserTitle(response?.updatedUser || user);

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
      <Stack gap="lg">
        <ProfileHeader title={title} isSaveDisabled={form.isDirty()} isLoading={isPending} />

        <Stack pos="relative">
          <LoadingOverlay
            visible={isPending}
            zIndex={1000}
            bg="none"
            overlayProps={{ radius: 'xs', blur: 2 }}
          />

          <ProfileCard />
          <ChangePasswordCard />
        </Stack>
      </Stack>
    </form>
  );
}
