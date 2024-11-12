'use client';

import { modals } from '@mantine/modals';
import { PageHeader } from '@/components';
import { CreateUserForm } from '../create-user-form';
import UserFormContainer from '../user-form/user-form.container';
import { usersPageHeaderContent, UsersPageHeaderPhrases } from './users-page-header.content';

export interface UsersPageHeaderProps {
  numberOfUsers: number;
}

export default function UsersPageHeader({ numberOfUsers }: UsersPageHeaderProps) {
  return (
    <PageHeader
      title={usersPageHeaderContent.t(UsersPageHeaderPhrases.TITLE)}
      subtitle={usersPageHeaderContent.t(UsersPageHeaderPhrases.SUBTITLE, numberOfUsers)}
      backPath="/"
      actions={[
        {
          label: usersPageHeaderContent.t(UsersPageHeaderPhrases.ACTION),
          onClick: () =>
            modals.open({
              title: usersPageHeaderContent.t(UsersPageHeaderPhrases.MODAL_TITLE),
              size: 'xl',
              children: (
                <UserFormContainer>
                  <CreateUserForm />
                </UserFormContainer>
              ),
            }),
        },
      ]}
    />
  );
}
