'use client';

import { z } from 'zod';
import { User } from '@prisma/client';
import { Card, Stack } from '@mantine/core';
import { notifications } from '@mantine/notifications';

import { UserForm } from '../user-form';
import { updateUserAction } from '../../_actions';
import { commonContent, CommonPhrases } from '@/content';
import { userFormSchema } from '../user-form/user-form.schema';
import { UserFormValues, useUserFormContext } from '../user-form/user-form.container';
import { userFormContent, UserFormContentPhrases } from '../user-form/user-form.content';
import UserPageHeader from '../user-page-header/user-page-header';

export default function UpdateUserForm({ user }: { user: User }) {
  const form = useUserFormContext();

  const displayName =
    user.firstName && user.lastName
      ? `${user.firstName} ${user.lastName}`
      : user.username || user.email || '';

  const handleSubmit = async (data: UserFormValues) => {
    try {
      const validatedData = userFormSchema.parse(data);

      const formData = new FormData();

      if (validatedData.firstName) {
        formData.append('firstName', validatedData.firstName);
      }

      if (validatedData.lastName) {
        formData.append('lastName', validatedData.lastName);
      }

      if (validatedData.username) {
        formData.append('username', validatedData.username);
      }

      formData.append('userId', user.id.toString());

      const response = await updateUserAction(formData);

      if (response.message === userFormContent.t(UserFormContentPhrases.USER_UPDATED)) {
        notifications.show({
          title: commonContent.t(CommonPhrases.SUCCESS),
          message: response.message,
          color: 'green',
        });

        form.resetDirty();
      } else {
        notifications.show({
          title: commonContent.t(CommonPhrases.ERROR),
          message: response.message,
          color: 'red',
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          const fieldName = err.path.join('.');
          form.setFieldError(fieldName, err.message);
        });
      } else {
        notifications.show({
          title: commonContent.t(CommonPhrases.ERROR),
          message: userFormContent.t(UserFormContentPhrases.ERROR_WHILE_UPDATING),
          color: 'red',
        });
      }
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
      <Stack gap="lg">
        <UserPageHeader name={displayName} userId={user.id} isRootUser={user.id === 1} />

        <Card shadow="sm" radius="md" padding="xl">
          <UserForm />
        </Card>
      </Stack>
    </form>
  );
}
