'use client';

import { useDisclosure } from '@mantine/hooks';

import { PageHeader } from '@/components';
import InviteNewUserFormModal from '../invite-new-user-form/invite-new-user-form.modal';
import { UsersPageHeaderPhrase, usersPageHeaderContent } from './users-page-header.content';

export interface UsersPageHeaderProps {
  numberOfUsers: number;
}

export default function UsersPageHeader({ numberOfUsers }: UsersPageHeaderProps) {
  const [opened, handlers] = useDisclosure(false);

  return (
    <>
      <PageHeader
        title={usersPageHeaderContent.t(UsersPageHeaderPhrase.TITLE)}
        subtitle={usersPageHeaderContent.t(UsersPageHeaderPhrase.SUBTITLE, numberOfUsers)}
        action={{
          label: usersPageHeaderContent.t(UsersPageHeaderPhrase.ACTION),
          onClick: handlers.open,
        }}
        backPath="/"
      />

      <InviteNewUserFormModal opened={opened} onClose={handlers.close} />
    </>
  );
}
