'use client';

import { useState } from 'react';
import { modals } from '@mantine/modals';
import { useRouter } from 'next/navigation';
import { notifications } from '@mantine/notifications';

import { PageHeader } from '@/components';
import { deletePrintAction } from '../../_actions';
import { commonContent, CommonPhrases } from '@/content';
import { usePrintFormContext } from '../print-form/print-form.container';

import {
  printsPageHeaderContent,
  PrintsPageHeaderPhrases,
} from '../prints-page-header/prints-page-header.content';

export default function PrintPageHeader({
  name,
  printId,
  hasOrderItems,
}: {
  name: string;
  printId: number;
  hasOrderItems: boolean;
}) {
  const form = usePrintFormContext();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    const response = await deletePrintAction(printId);
    setIsDeleting(false);

    if (response.message === printsPageHeaderContent.t(PrintsPageHeaderPhrases.PRINT_DELETED)) {
      notifications.show({
        title: commonContent.t(CommonPhrases.SUCCESS),
        message: response.message,
        color: 'green',
      });

      router.push('/prints?page=1&pageSize=10&sort=name:ASC');
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
      title: printsPageHeaderContent.t(PrintsPageHeaderPhrases.DELETE_MODAL_TITLE),
      centered: true,
      children: printsPageHeaderContent.t(PrintsPageHeaderPhrases.DELETE_MODAL_CONTENT),
      labels: {
        confirm: printsPageHeaderContent.t(PrintsPageHeaderPhrases.DELETE_MODAL_CONFIRM),
        cancel: printsPageHeaderContent.t(PrintsPageHeaderPhrases.DELETE_MODAL_CANCEL),
      },
      confirmProps: { color: 'red' },
      onConfirm: handleDelete,
    });

  return (
    <PageHeader
      title={name}
      backPath="/prints?page=1&pageSize=10&sort=name:ASC"
      actions={[
        {
          label: printsPageHeaderContent.t(PrintsPageHeaderPhrases.DELETE_ACTION),
          onClick: openDeleteModal,
          disabled: hasOrderItems || isDeleting,
          variant: 'outline',
          color: 'red',
          tooltipLabel: hasOrderItems
            ? printsPageHeaderContent.t(PrintsPageHeaderPhrases.DELETE_DISABLED_TOOLTIP)
            : undefined,
        },
        {
          label: printsPageHeaderContent.t(PrintsPageHeaderPhrases.SAVE_ACTION),
          onClick: () => {},
          disabled: !form.isDirty(),
          type: 'submit',
          tooltipLabel: !form.isDirty()
            ? printsPageHeaderContent.t(PrintsPageHeaderPhrases.SAVE_DISABLED_TOOLTIP)
            : undefined,
        },
      ]}
    />
  );
}
