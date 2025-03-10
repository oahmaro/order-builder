'use client';

import { useRouter } from 'next/navigation';
import { Button, Group } from '@mantine/core';
import { IconPrinter } from '@tabler/icons-react';

import { useOrderFormContext } from '../order-form/order-form.container';
import { orderFormContent, OrderFormContentPhrases } from '../order-form/order-form.content';

interface OrderFormFooterProps {
  isUpdate?: boolean;
  isDisabled?: boolean;
  isSubmitting: boolean;
}

export default function OrderFormFooter({
  isUpdate,
  isDisabled,
  isSubmitting,
}: OrderFormFooterProps) {
  const router = useRouter();
  const form = useOrderFormContext();

  const handlePrint = () => {
    if (form.values?.id) {
      window.open(`/orders/${form.values.id}/print`, '_blank');
    }
  };

  return (
    <Group justify="flex-end" gap="md">
      <Button
        variant="default"
        onClick={() => router.push('/orders?page=1&pageSize=10&sortBy=createdAt&sortDir=desc')}
      >
        {orderFormContent.t(OrderFormContentPhrases.CANCEL)}
      </Button>

      {isUpdate && form.values?.id && (
        <Button variant="light" leftSection={<IconPrinter size={16} />} onClick={handlePrint}>
          {orderFormContent.t(OrderFormContentPhrases.PRINT_ORDER)}
        </Button>
      )}

      <Button type="submit" loading={isSubmitting} disabled={isSubmitting || isDisabled}>
        {orderFormContent.t(
          isUpdate ? OrderFormContentPhrases.UPDATE_ORDER : OrderFormContentPhrases.CREATE_ORDER
        )}
      </Button>
    </Group>
  );
}
