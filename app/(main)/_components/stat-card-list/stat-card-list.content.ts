// spell-checker: disable

import Polyglot from 'node-polyglot';

export enum StatCardListPhrases {
  CUSTOMERS = 'customers',
  ALL_CUSTOMERS = 'all-customers',
  ORDERS = 'orders',
  ALL_ORDERS = 'all-orders',
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  ORDER_TRACKING = 'order-tracking',
}

export const statCardListContent = new Polyglot({
  locale: 'he',
  phrases: {
    [StatCardListPhrases.CUSTOMERS]: 'לקוחות',
    [StatCardListPhrases.ALL_CUSTOMERS]: 'כל הלקוחות',
    [StatCardListPhrases.ORDERS]: 'הזמנות',
    [StatCardListPhrases.ALL_ORDERS]: 'כל ההזמנות',
    [StatCardListPhrases.PENDING]: 'ממתין ל',
    [StatCardListPhrases.PROCESSING]: 'מעבד',
    [StatCardListPhrases.SHIPPED]: 'נשלח',
    [StatCardListPhrases.DELIVERED]: 'נמסר',
    [StatCardListPhrases.ORDER_TRACKING]: 'מעקב אחר הזמנות',
  },
});
