'use client';

import { OrderStatus } from '@prisma/client';
import { Alert, Button, Group, Text } from '@mantine/core';
import { IconLock, IconLockOpen } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';

import { updateOrderStatusAction } from '../../_actions/update-order-status/update-order-status.action';
import { orderFormContent, OrderFormContentPhrases } from './order-form.content';
import { commonContent, CommonPhrases } from '@/content';

interface OrderStatusBannerProps {
  orderId: number;
  status: OrderStatus;
}

export function OrderStatusBanner({ orderId, status }: OrderStatusBannerProps) {
  const router = useRouter();
  const isLocked = status === OrderStatus.READY || status === OrderStatus.COMPLETED;

  const handleToggleStatus = async () => {
    const newStatus = isLocked ? OrderStatus.IN_PROGRESS : OrderStatus.READY;

    const response = await updateOrderStatusAction(orderId, newStatus);

    if (response.error) {
      notifications.show({
        title: commonContent.t(CommonPhrases.ERROR),
        message: response.message,
        color: 'red',
      });
    } else {
      notifications.show({
        title: commonContent.t(CommonPhrases.SUCCESS),
        message: response.message,
        color: 'green',
      });
      router.refresh();
    }
  };

  if (!isLocked) return null;

  return (
    <Alert
      variant="light"
      color="yellow"
      title={orderFormContent.t(OrderFormContentPhrases.ORDER_LOCKED)}
      icon={<IconLock size={16} />}
    >
      <Group justify="space-between" align="center">
        <Text size="sm">{orderFormContent.t(OrderFormContentPhrases.ORDER_LOCKED_MESSAGE)}</Text>
        <Button
          variant="light"
          size="xs"
          leftSection={<IconLockOpen size={16} />}
          onClick={handleToggleStatus}
        >
          {orderFormContent.t(OrderFormContentPhrases.ENABLE_EDITING)}
        </Button>
      </Group>
    </Alert>
  );
}
