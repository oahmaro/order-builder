'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { notifications } from '@mantine/notifications';
import { modals } from '@mantine/modals';

import { PageHeader } from '@/components';

import { deleteCustomerAction } from '../../_actions';
import { useCustomerFormContext } from '../customer-form/customer-form.container';
import { commonContent, CommonPhrases } from '@/content/common.content';

import {
  customerPageHeaderContent,
  CustomerPageHeaderPhrases,
} from './customer-page-header.content';

import {
  customerFormContent,
  CustomerFormContentPhrases,
} from '../customer-form/customer-form.content';

export default function CustomerPageHeader({
  name,
  hasOrders,
  customerId,
}: {
  name: string;
  hasOrders: boolean;
  customerId: number;
}) {
  const form = useCustomerFormContext();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    const response = await deleteCustomerAction(customerId);
    setIsDeleting(false);

    if (response.message === customerFormContent.t(CustomerFormContentPhrases.CUSTOMER_DELETED)) {
      notifications.show({
        title: commonContent.t(CommonPhrases.SUCCESS),
        message: response.message,
        color: 'green',
      });
      router.push('/customers?page=1&pageSize=10&sort=name:ASC');
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
      title: customerPageHeaderContent.t(CustomerPageHeaderPhrases.DELETE_MODAL_TITLE),
      centered: true,
      children: customerPageHeaderContent.t(CustomerPageHeaderPhrases.DELETE_MODAL_CONTENT),
      labels: {
        confirm: customerPageHeaderContent.t(CustomerPageHeaderPhrases.DELETE_MODAL_CONFIRM),
        cancel: customerPageHeaderContent.t(CustomerPageHeaderPhrases.DELETE_MODAL_CANCEL),
      },
      confirmProps: { color: 'red' },
      onConfirm: handleDelete,
    });

  return (
    <PageHeader
      title={name}
      backPath="/customers?page=1&pageSize=10&sort=name:ASC"
      actions={[
        {
          label: customerPageHeaderContent.t(CustomerPageHeaderPhrases.DELETE_ACTION),
          onClick: openDeleteModal,
          disabled: hasOrders || isDeleting,
          variant: 'outline',
          color: 'red',
          tooltipLabel: hasOrders
            ? customerPageHeaderContent.t(CustomerPageHeaderPhrases.DELETE_DISABLED_TOOLTIP)
            : undefined,
        },
        {
          label: customerPageHeaderContent.t(CustomerPageHeaderPhrases.SAVE_ACTION),
          onClick: () => {},
          disabled: !form.isDirty(),
          type: 'submit',
          tooltipLabel: !form.isDirty()
            ? customerPageHeaderContent.t(CustomerPageHeaderPhrases.SAVE_DISABLED_TOOLTIP)
            : undefined,
        },
      ]}
    />
  );
}
