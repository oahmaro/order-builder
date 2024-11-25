'use client';

import { useState } from 'react';
import { modals } from '@mantine/modals';
import { useRouter } from 'next/navigation';
import { notifications } from '@mantine/notifications';

import { PageHeader } from '@/components';
import { deleteUserAction } from '../../_actions';
import { commonContent, CommonPhrases } from '@/content';
import { useUserFormContext } from '../user-form/user-form.container';
import { userPageHeaderContent, UserPageHeaderPhrases } from './user-page-header.content';
import { userFormContent, UserFormContentPhrases } from '../user-form/user-form.content';

export default function UserPageHeader({
  name,
  userId,
  isRootUser,
}: {
  name: string;
  userId: number;
  isRootUser: boolean;
}) {
  const form = useUserFormContext();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    const response = await deleteUserAction(userId);
    setIsDeleting(false);

    if (response.message === userFormContent.t(UserFormContentPhrases.USER_DELETED)) {
      notifications.show({
        title: commonContent.t(CommonPhrases.SUCCESS),
        message: response.message,
        color: 'green',
      });

      router.push('/users?page=1&pageSize=10&sortBy=name&sortDir=asc');
    } else {
      notifications.show({
        title: commonContent.t(CommonPhrases.ERROR),
        message: response.message,
        color: 'red',
      });
    }
  };

  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: userPageHeaderContent.t(UserPageHeaderPhrases.MODAL_TITLE),
      centered: true,
      children: userPageHeaderContent.t(UserPageHeaderPhrases.MODAL_CONTENT),
      labels: {
        confirm: userPageHeaderContent.t(UserPageHeaderPhrases.MODAL_CONFIRM),
        cancel: commonContent.t(CommonPhrases.CANCEL),
      },
      onConfirm: handleDelete,
      closeOnClickOutside: false,
      confirmProps: { color: 'red' },
    });

  return (
    <PageHeader
      title={name}
      backPath="/users?page=1&pageSize=10&sortBy=name&sortDir=asc"
      actions={[
        {
          label: userPageHeaderContent.t(UserPageHeaderPhrases.DELETE_ACTION),
          onClick: openDeleteModal,
          disabled: isRootUser || isDeleting,
          variant: 'outline',
          color: 'red',
          tooltipLabel: isRootUser
            ? userPageHeaderContent.t(UserPageHeaderPhrases.DELETE_DISABLED_TOOLTIP)
            : undefined,
        },
        {
          label: userPageHeaderContent.t(UserPageHeaderPhrases.SAVE_ACTION),
          onClick: () => {},
          disabled: !form.isDirty(),
          type: 'submit',
          tooltipLabel: !form.isDirty()
            ? userPageHeaderContent.t(UserPageHeaderPhrases.SAVE_DISABLED_TOOLTIP)
            : undefined,
        },
      ]}
    />
  );
}
