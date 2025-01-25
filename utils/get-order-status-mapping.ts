// spell-checker: disable

import Polyglot from 'node-polyglot';
import { OrderStatus } from '@prisma/client';

enum OrderStatusMappingPhrases {
  NEW = 'new',
  COMPLETED = 'completed',
  CANCELED = 'canceled',
}

const ordersTableContent = new Polyglot({
  locale: 'he',
  phrases: {
    [OrderStatusMappingPhrases.NEW]: 'חדש',
    [OrderStatusMappingPhrases.COMPLETED]: 'הושלם',
    [OrderStatusMappingPhrases.CANCELED]: 'מבוטל',
  },
});

export const getOrderStatusMapping = (status: OrderStatus) => {
  const statusMapping = {
    [OrderStatus.NEW]: {
      label: ordersTableContent.t(OrderStatusMappingPhrases.NEW),
      value: 'new',
      color: 'blue',
    },
    [OrderStatus.COMPLETED]: {
      label: ordersTableContent.t(OrderStatusMappingPhrases.COMPLETED),
      value: 'completed',
      color: 'green',
    },
    [OrderStatus.CANCELED]: {
      label: ordersTableContent.t(OrderStatusMappingPhrases.CANCELED),
      value: 'canceled',
      color: 'red',
    },
  } as const;

  if (!(status in statusMapping)) {
    return statusMapping[OrderStatus.NEW];
  }

  return statusMapping[status as keyof typeof statusMapping];
};
