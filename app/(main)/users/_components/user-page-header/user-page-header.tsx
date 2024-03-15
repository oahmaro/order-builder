'use client';

import { useDisclosure } from '@mantine/hooks';

import { PageHeader } from '@/components';
import InviteNewUserFormModal from '../invite-new-user-form/invite-new-user-form.modal';

export interface UsersPageHeaderProps {
  title: string;
  subtitle: string;
}

export default function UsersPageHeader({ title, subtitle }: UsersPageHeaderProps) {
  const [opened, handlers] = useDisclosure(false);

  return (
    <>
      <PageHeader
        title={title}
        subtitle={subtitle}
        action={{ label: 'הזמן משתמש חדש', onClick: handlers.open }}
      />

      <InviteNewUserFormModal opened={opened} onClose={handlers.close} />
    </>
  );
}
