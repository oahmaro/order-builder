'use client';

import { useEffect, useState, useTransition } from 'react';
import { Box, LoadingOverlay, Stack } from '@mantine/core';
import { zodResolver } from 'mantine-form-zod-resolver';
import { notifications } from '@mantine/notifications';
import { User } from '@prisma/client';

import { ProfileHeader } from '../profile-header';
import { ProfileCard } from '../profile-card';
import { ProfileSchema } from '@/schemas';
import { updateProfile } from '@/actions/update-profile';
import { generateUserTitle } from '@/utils/get-user-title';
import { ChangePasswordCard } from '../change-password-card';
import { FormValues, ProfileFormProvider, useProfileForm } from '../../profile.context';

interface ProfileFormProps {
  user: User;
}

export default function ProfileForm({ user }: ProfileFormProps) {
  const form = useProfileForm({
    initialValues: {
      email: user?.email || '',
      username: user?.username || '',
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      currentPassword: '',
      password: '',
      confirmPassword: '',
    },
    validate: zodResolver(ProfileSchema),
  });

  const [isPending, startTransition] = useTransition();
  const [response, setResponse] = useState<{
    message: string;
    status: number;
    updatedUser: User | null;
  } | null>();

  function handleSubmit(values: FormValues) {
    startTransition(async () => {
      const { message, status, updatedUser } = await updateProfile(user.id!, values);
      setResponse({ message, status, updatedUser });

      if (status === 200) {
        form.setValues({
          firstName: updatedUser?.firstName || '',
          lastName: updatedUser?.lastName || '',
          email: updatedUser?.email || '',
          username: updatedUser?.username || '',
          password: '',
          currentPassword: '',
          confirmPassword: '',
        });

        form.resetDirty();
      }
    });
  }

  useEffect(() => {
    if (response?.status === 200) {
      notifications.show({
        color: 'teal',
        title: 'הַצלָחָה',
        message: response?.message,
      });
    }
  }, [response]);

  const title = generateUserTitle(response?.updatedUser || user);

  return (
    <ProfileFormProvider form={form}>
      <Box component="form" onSubmit={form.onSubmit(handleSubmit)} noValidate>
        <Stack gap={40}>
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
      </Box>
    </ProfileFormProvider>
  );
}
