// spell-checker: disable

import Polyglot from 'node-polyglot';
import { OrderStatus } from '@prisma/client';

enum OrderStatusMappingPhrases {
  DELIVERED = 'delivered',
  CANCELED = 'canceled',
  ON_HOLD = 'on-hold',
  PENDING = 'pending',
  PROCESSING = 'processing',
  REFUNDED = 'refunded',
  SHIPPED = 'shipped',
}

const ordersTableContent = new Polyglot({
  locale: 'he',
  phrases: {
    [OrderStatusMappingPhrases.DELIVERED]: 'נמסר',
    [OrderStatusMappingPhrases.CANCELED]: 'מבוטל',
    [OrderStatusMappingPhrases.ON_HOLD]: 'בהמתנה',
    [OrderStatusMappingPhrases.PENDING]: 'ממתין ל',
    [OrderStatusMappingPhrases.PROCESSING]: 'מעבד',
    [OrderStatusMappingPhrases.REFUNDED]: 'הוחזר',
    [OrderStatusMappingPhrases.SHIPPED]: 'נשלח',
  },
});

export const getOrderStatusMapping = (status: OrderStatus) => {
  const statusMapping = {
    [OrderStatus.DELIVERED]: {
      label: ordersTableContent.t(OrderStatusMappingPhrases.DELIVERED),
      value: 'delivered',
      color: 'green',
    },
    [OrderStatus.CANCELLED]: {
      label: ordersTableContent.t(OrderStatusMappingPhrases.CANCELED),
      value: 'canceled',
      color: 'red',
    },
    [OrderStatus.ON_HOLD]: {
      label: ordersTableContent.t(OrderStatusMappingPhrases.ON_HOLD),
      value: 'on-hold',
      color: 'pink',
    },
    [OrderStatus.PENDING]: {
      label: ordersTableContent.t(OrderStatusMappingPhrases.PENDING),
      value: 'pending',
      color: 'orange',
    },
    [OrderStatus.PROCESSING]: {
      label: ordersTableContent.t(OrderStatusMappingPhrases.PROCESSING),
      value: 'processing',
      color: 'orange',
    },
    [OrderStatus.REFUNDED]: {
      label: ordersTableContent.t(OrderStatusMappingPhrases.REFUNDED),
      value: 'refunded',
      color: 'cyan',
    },
    [OrderStatus.SHIPPED]: {
      label: ordersTableContent.t(OrderStatusMappingPhrases.SHIPPED),
      value: 'shipped',
      color: 'blue',
    },
  };

  return statusMapping[status];
};
