'use client';

import { z } from 'zod';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';

import { UserForm } from '../user-form';
import { ModalFooter } from '@/components';
import { createUserAction } from '../../_actions';
import { commonContent, CommonPhrases } from '@/content';
import { userFormSchema } from '../user-form/user-form.schema';
import { UserFormValues, useUserFormContext } from '../user-form/user-form.container';
import { userFormContent, UserFormContentPhrases } from '../user-form/user-form.content';

export default function CreateUserForm() {
  const form = useUserFormContext();

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

      formData.append('email', validatedData.email);
      formData.append('password', validatedData.password);
      formData.append('role', validatedData.role);

      const response = await createUserAction(formData);

      if (response.message === userFormContent.t(UserFormContentPhrases.USER_CREATED)) {
        modals.closeAll();

        notifications.show({
          title: commonContent.t(CommonPhrases.SUCCESS),
          message: response.message,
          color: 'green',
        });
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
          message: userFormContent.t(UserFormContentPhrases.ERROR_WHILE_CREATING),
          color: 'red',
        });
      }
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
      <UserForm />

      <ModalFooter
        submitLabel={commonContent.t(CommonPhrases.CREATE)}
        cancelLabel={commonContent.t(CommonPhrases.CANCEL)}
      />
    </form>
  );
}
