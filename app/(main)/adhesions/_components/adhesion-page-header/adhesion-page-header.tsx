'use client';

import { useState } from 'react';
import { modals } from '@mantine/modals';
import { useRouter } from 'next/navigation';
import { notifications } from '@mantine/notifications';

import { PageHeader } from '@/components';

import {
  adhesionPageHeaderContent,
  AdhesionPageHeaderPhrases,
} from './adhesion-page-header.content';
import { useAdhesionFormContext } from '../adhesion-form/adhesion-form.container';
import { deleteAdhesionAction } from '../../_actions';
import { commonContent, CommonPhrases } from '@/content';

export default function AdhesionPageHeader({
  name,
  adhesionId,
  hasOrderItems,
}: {
  name: string;
  adhesionId: number;
  hasOrderItems: boolean;
}) {
  const form = useAdhesionFormContext();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    const response = await deleteAdhesionAction(adhesionId);
    setIsDeleting(false);

    if (
      response.message === adhesionPageHeaderContent.t(AdhesionPageHeaderPhrases.ADHESION_DELETED)
    ) {
      notifications.show({
        title: commonContent.t(CommonPhrases.SUCCESS),
        message: response.message,
        color: 'green',
      });

      router.push('/adhesions?page=1&pageSize=10&sortBy=name&sortDir=asc');
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
      title: adhesionPageHeaderContent.t(AdhesionPageHeaderPhrases.DELETE_MODAL_TITLE),
      centered: true,
      children: adhesionPageHeaderContent.t(AdhesionPageHeaderPhrases.DELETE_MODAL_CONTENT),
      labels: {
        confirm: adhesionPageHeaderContent.t(AdhesionPageHeaderPhrases.DELETE_MODAL_CONFIRM),
        cancel: adhesionPageHeaderContent.t(AdhesionPageHeaderPhrases.DELETE_MODAL_CANCEL),
      },
      confirmProps: { color: 'red' },
      onConfirm: handleDelete,
    });

  return (
    <PageHeader
      title={name}
      backPath="/adhesions?page=1&pageSize=10&sortBy=name&sortDir=asc"
      actions={[
        {
          label: adhesionPageHeaderContent.t(AdhesionPageHeaderPhrases.DELETE_ACTION),
          onClick: openDeleteModal,
          disabled: hasOrderItems || isDeleting,
          variant: 'outline',
          color: 'red',
          tooltipLabel: hasOrderItems
            ? adhesionPageHeaderContent.t(AdhesionPageHeaderPhrases.DELETE_DISABLED_TOOLTIP)
            : undefined,
        },
        {
          label: adhesionPageHeaderContent.t(AdhesionPageHeaderPhrases.SAVE_ACTION),
          onClick: () => {},
          disabled: !form.isDirty(),
          type: 'submit',
          tooltipLabel: !form.isDirty()
            ? adhesionPageHeaderContent.t(AdhesionPageHeaderPhrases.SAVE_DISABLED_TOOLTIP)
            : undefined,
        },
      ]}
    />
  );
}
