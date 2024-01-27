'use client';

import { useEffect, useState, useTransition } from 'react';
import { Box, LoadingOverlay, Stack } from '@mantine/core';
import { zodResolver } from 'mantine-form-zod-resolver';
import { notifications } from '@mantine/notifications';
import { User } from '@prisma/client';

import { ProfileHeader } from '../profile-header';
import { ProfileCard } from '../profile-card';
import { updateProfile } from '@/actions/update-profile';
import { generateUserTitle } from '@/utils/get-user-title';
import { ChangePasswordCard } from '../change-password-card';
import { FormValues, ProfileFormProvider, useProfileForm } from '../../profile.context';
import { ProfileFormSchema } from '@/schemas';
import { StrictPasswordSchema } from '@/schemas/password';
import errorMessages from '@/utils/error-messages';

interface ProfileFormProps {
  user: User;
}

export default function ProfileForm({ user }: ProfileFormProps) {
  const form = useProfileForm({
    initialValues: {
      profile: {
        email: user?.email || '',
        username: user?.username || '',
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
      },
      password: {
        currentPassword: '',
        password: '',
        confirmPassword: '',
      },
    },
    validate: (values) =>
      values.password.password || values.password.confirmPassword
        ? zodResolver(
            ProfileFormSchema.extend({
              password: StrictPasswordSchema.refine(
                (data) => data.password === data.confirmPassword,
                {
                  message: errorMessages['password-match'],
                  path: ['confirmPassword'],
                }
              ),
            })
          )(values)
        : zodResolver(ProfileFormSchema)(values),
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
    });
  }

  useEffect(() => {
    if (response?.status === 200) {
      form.resetDirty();
      notifications.show({
        color: 'teal',
        title: 'הַצלָחָה',
        message: response?.message,
      });
    }

    if (response?.status === 403) {
      form.setFieldError('password.currentPassword', 'Invalid password');
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
