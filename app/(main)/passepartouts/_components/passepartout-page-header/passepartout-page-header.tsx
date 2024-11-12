'use client';

import { useState } from 'react';
import { modals } from '@mantine/modals';
import { useRouter } from 'next/navigation';
import { notifications } from '@mantine/notifications';

import { commonContent, CommonPhrases } from '@/content';
import { deletePassepartoutAction } from '../../_actions/delete-passepartout-action';
import { usePassepartoutFormContext } from '../passepartout-form/passepartout-form.container';

import {
  passepartoutFormContent,
  PassepartoutFormContentPhrases,
} from '../passepartout-form/passepartout-form.content';
import { PageHeader } from '@/components';

interface PassepartoutPageHeaderProps {
  name: string;
  passepartoutId: number;
  hasOrderItems: boolean;
}

export default function PassepartoutPageHeader({
  name,
  passepartoutId,
  hasOrderItems,
}: PassepartoutPageHeaderProps) {
  const form = usePassepartoutFormContext();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    const response = await deletePassepartoutAction(passepartoutId);
    setIsDeleting(false);

    if (
      response.message ===
      passepartoutFormContent.t(PassepartoutFormContentPhrases.PASSEPARTOUT_DELETED)
    ) {
      notifications.show({
        title: commonContent.t(CommonPhrases.SUCCESS),
        message: response.message,
        color: 'green',
      });

      router.push('/passepartouts?page=1&pageSize=10&sort=name:ASC');
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
      title: passepartoutFormContent.t(PassepartoutFormContentPhrases.DELETE_MODAL_TITLE),
      centered: true,
      children: passepartoutFormContent.t(PassepartoutFormContentPhrases.DELETE_MODAL_CONTENT),
      labels: {
        confirm: passepartoutFormContent.t(PassepartoutFormContentPhrases.DELETE_MODAL_CONFIRM),
        cancel: passepartoutFormContent.t(PassepartoutFormContentPhrases.DELETE_MODAL_CANCEL),
      },
      confirmProps: { color: 'red' },
      onConfirm: handleDelete,
    });

  return (
    <PageHeader
      title={name}
      backPath="/passepartouts?page=1&pageSize=10&sort=name:ASC"
      actions={[
        {
          label: passepartoutFormContent.t(PassepartoutFormContentPhrases.DELETE_ACTION),
          onClick: openDeleteModal,
          disabled: hasOrderItems || isDeleting,
          variant: 'outline',
          color: 'red',
          tooltipLabel: hasOrderItems
            ? passepartoutFormContent.t(PassepartoutFormContentPhrases.DELETE_DISABLED_TOOLTIP)
            : undefined,
        },
        {
          label: passepartoutFormContent.t(PassepartoutFormContentPhrases.SAVE_ACTION),
          onClick: () => {},
          disabled: !form.isDirty(),
          type: 'submit',
          tooltipLabel: !form.isDirty()
            ? passepartoutFormContent.t(PassepartoutFormContentPhrases.SAVE_DISABLED_TOOLTIP)
            : undefined,
        },
      ]}
    />
  );
}
