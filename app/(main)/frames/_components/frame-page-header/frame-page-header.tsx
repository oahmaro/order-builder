'use client';

import { useState } from 'react';
import { modals } from '@mantine/modals';
import { useRouter } from 'next/navigation';
import { notifications } from '@mantine/notifications';

import { PageHeader } from '@/components';
import { deleteFrameAction } from '../../_actions';
import { commonContent, CommonPhrases } from '@/content';
import { useFrameFormContext } from '../frame-form/frame-form.container';
import { framePageHeaderContent, FramePageHeaderPhrases } from './frame-page-header.content';

export default function FramePageHeader({
  name,
  frameId,
  hasOrderItems,
}: {
  name: string;
  frameId: number;
  hasOrderItems: boolean;
}) {
  const form = useFrameFormContext();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    const response = await deleteFrameAction(frameId);
    setIsDeleting(false);

    if (response.message === framePageHeaderContent.t(FramePageHeaderPhrases.FRAME_DELETED)) {
      notifications.show({
        title: commonContent.t(CommonPhrases.SUCCESS),
        message: response.message,
        color: 'green',
      });

      router.push('/frames?page=1&pageSize=10&sortBy=name&sortDir=asc');
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
      title: framePageHeaderContent.t(FramePageHeaderPhrases.DELETE_MODAL_TITLE),
      centered: true,
      children: framePageHeaderContent.t(FramePageHeaderPhrases.DELETE_MODAL_CONTENT),
      labels: {
        confirm: framePageHeaderContent.t(FramePageHeaderPhrases.DELETE_MODAL_CONFIRM),
        cancel: framePageHeaderContent.t(FramePageHeaderPhrases.DELETE_MODAL_CANCEL),
      },
      onConfirm: handleDelete,
      closeOnClickOutside: false,
      confirmProps: { color: 'red' },
    });

  return (
    <PageHeader
      title={name}
      backPath="/frames?page=1&pageSize=10&sortBy=name&sortDir=asc"
      actions={[
        {
          label: framePageHeaderContent.t(FramePageHeaderPhrases.DELETE_ACTION),
          onClick: openDeleteModal,
          disabled: hasOrderItems || isDeleting,
          variant: 'outline',
          color: 'red',
          tooltipLabel: hasOrderItems
            ? framePageHeaderContent.t(FramePageHeaderPhrases.DELETE_DISABLED_TOOLTIP)
            : undefined,
        },
        {
          label: framePageHeaderContent.t(FramePageHeaderPhrases.SAVE_ACTION),
          onClick: () => {},
          disabled: !form.isDirty(),
          type: 'submit',
          tooltipLabel: !form.isDirty()
            ? framePageHeaderContent.t(FramePageHeaderPhrases.SAVE_DISABLED_TOOLTIP)
            : undefined,
        },
      ]}
    />
  );
}
