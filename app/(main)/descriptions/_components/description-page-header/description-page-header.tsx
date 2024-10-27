'use client';

import { useState } from 'react';
import { modals } from '@mantine/modals';
import { useRouter } from 'next/navigation';
import { notifications } from '@mantine/notifications';

import { PageHeader } from '@/components';
import { deleteDescriptionAction } from '../../_actions';
import { commonContent, CommonPhrases } from '@/content';
import { useDescriptionFormContext } from '../description-form/description-form.container';

import {
  descriptionPageHeaderContent,
  DescriptionPageHeaderPhrases,
} from './description-pager-header.content';

export default function DescriptionPageHeader({
  name,
  descriptionId,
  hasOrderItems,
}: {
  name: string;
  descriptionId: number;
  hasOrderItems: boolean;
}) {
  const form = useDescriptionFormContext();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    const response = await deleteDescriptionAction(descriptionId);
    setIsDeleting(false);

    if (
      response.message ===
      descriptionPageHeaderContent.t(DescriptionPageHeaderPhrases.DESCRIPTION_DELETED)
    ) {
      notifications.show({
        title: commonContent.t(CommonPhrases.SUCCESS),
        message: response.message,
        color: 'green',
      });

      router.push('/descriptions?page=1&pageSize=10&sort=name:ASC');
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
      title: descriptionPageHeaderContent.t(DescriptionPageHeaderPhrases.MODAL_TITLE),
      centered: true,
      children: descriptionPageHeaderContent.t(DescriptionPageHeaderPhrases.MODAL_CONTENT),
      labels: {
        confirm: descriptionPageHeaderContent.t(DescriptionPageHeaderPhrases.MODAL_CONFIRM),
        cancel: descriptionPageHeaderContent.t(CommonPhrases.CANCEL),
      },
      confirmProps: { color: 'red' },
      onConfirm: handleDelete,
    });

  return (
    <PageHeader
      title={name}
      backPath="/descriptions?page=1&pageSize=10&sort=name:ASC"
      actions={[
        {
          label: descriptionPageHeaderContent.t(DescriptionPageHeaderPhrases.DELETE_ACTION),
          onClick: openDeleteModal,
          disabled: hasOrderItems || isDeleting,
          variant: 'outline',
          color: 'red',
          tooltipLabel: hasOrderItems
            ? descriptionPageHeaderContent.t(DescriptionPageHeaderPhrases.DELETE_DISABLED_TOOLTIP)
            : undefined,
        },
        {
          label: descriptionPageHeaderContent.t(DescriptionPageHeaderPhrases.SAVE_ACTION),
          onClick: () => {},
          disabled: !form.isDirty(),
          type: 'submit',
          tooltipLabel: !form.isDirty()
            ? descriptionPageHeaderContent.t(DescriptionPageHeaderPhrases.SAVE_DISABLED_TOOLTIP)
            : undefined,
        },
      ]}
    />
  );
}
