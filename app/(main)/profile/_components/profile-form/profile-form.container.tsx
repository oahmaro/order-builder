'use client';

import { z } from 'zod';
import { ReactNode } from 'react';
import { User } from '@prisma/client';
import { createFormContext, zodResolver } from '@mantine/form';

import { errorMessages } from '@/utils';
import { profileFormSchema } from './profile-form.schema';
import { StrictPasswordSchema } from '@/schemas/password';

export type FormValues = z.infer<typeof profileFormSchema>;

export const [ProfileFormProvider, useProfileFormContext, useProfileForm] =
  createFormContext<FormValues>();

interface ProfileFormContainerProps {
  children: ReactNode;
  user?: User;
}

export default function ProfileFormContainer({ children, user }: ProfileFormContainerProps) {
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
            profileFormSchema.extend({
              password: StrictPasswordSchema.refine(
                (data) => data.password === data.confirmPassword,
                {
                  message: errorMessages['password-match'],
                  path: ['confirmPassword'],
                }
              ),
            })
          )(values)
        : zodResolver(profileFormSchema)(values),
  });

  return <ProfileFormProvider form={form}>{children}</ProfileFormProvider>;
}
