'use client';

import { z } from 'zod';
import { ReactNode } from 'react';
import { User } from '@prisma/client';
import { createFormContext, zodResolver } from '@mantine/form';

import { userFormSchema } from './user-form.schema';

export type UserFormValues = z.infer<typeof userFormSchema>;

export const [UserFormProvider, useUserFormContext, useUserForm] =
  createFormContext<UserFormValues>();

interface UserFormContainerProps {
  children: ReactNode;
  user?: User;
}

export default function UserFormContainer({ children, user }: UserFormContainerProps) {
  const form = useUserForm({
    initialValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      role: user?.role || 'USER',
      active: user?.active ?? true,
      username: user?.username ?? '',
      email: user?.email ?? '',
      password: '',
    },

    validate: zodResolver(userFormSchema),
  });

  return <UserFormProvider form={form}>{children}</UserFormProvider>;
}
