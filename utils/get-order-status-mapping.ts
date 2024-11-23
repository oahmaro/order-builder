// spell-checker: disable

import Polyglot from 'node-polyglot';
import { OrderStatus } from '@prisma/client';

enum OrderStatusMappingPhrases {
  NEW = 'new',
  IN_PROGRESS = 'in-progress',
  READY = 'ready',
  COMPLETED = 'completed',
}

const ordersTableContent = new Polyglot({
  locale: 'he',
  phrases: {
    [OrderStatusMappingPhrases.NEW]: 'חדש',
    [OrderStatusMappingPhrases.IN_PROGRESS]: 'בעבודה',
    [OrderStatusMappingPhrases.READY]: 'מוכן',
    [OrderStatusMappingPhrases.COMPLETED]: 'הושלם',
  },
});

export const getOrderStatusMapping = (status: OrderStatus) => {
  const statusMapping = {
    [OrderStatus.NEW]: {
      label: ordersTableContent.t(OrderStatusMappingPhrases.NEW),
      value: 'new',
      color: 'blue',
    },
    [OrderStatus.IN_PROGRESS]: {
      label: ordersTableContent.t(OrderStatusMappingPhrases.IN_PROGRESS),
      value: 'in-progress',
      color: 'orange',
    },
    [OrderStatus.READY]: {
      label: ordersTableContent.t(OrderStatusMappingPhrases.READY),
      value: 'ready',
      color: 'green',
    },
    [OrderStatus.COMPLETED]: {
      label: ordersTableContent.t(OrderStatusMappingPhrases.COMPLETED),
      value: 'completed',
      color: 'gray',
    },
  };

  return statusMapping[status];
};
