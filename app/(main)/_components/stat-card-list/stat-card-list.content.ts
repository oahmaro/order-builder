// spell-checker: disable

import Polyglot from 'node-polyglot';

export enum StatCardListPhrases {
  CUSTOMERS = 'customers',
  ALL_CUSTOMERS = 'all-customers',
  ORDERS = 'orders',
  ALL_ORDERS = 'all-orders',
  OVERVIEW = 'overview',
  NEW = 'new',
  COMPLETED = 'completed',
  NEW_ORDERS = 'new-orders',
  COMPLETED_ORDERS = 'completed-orders',
  ORDER_TRACKING = 'order-tracking',
}

export const statCardListContent = new Polyglot({
  locale: 'he',
  phrases: {
    [StatCardListPhrases.CUSTOMERS]: 'לקוחות',
    [StatCardListPhrases.ALL_CUSTOMERS]: 'כל הלקוחות',
    [StatCardListPhrases.ORDERS]: 'הזמנות',
    [StatCardListPhrases.ALL_ORDERS]: 'כל ההזמנות',
    [StatCardListPhrases.OVERVIEW]: 'תמצאות',
    [StatCardListPhrases.NEW]: 'חדש',
    [StatCardListPhrases.COMPLETED]: 'הושלם',
    [StatCardListPhrases.NEW_ORDERS]: 'הזמנות חדשות',
    [StatCardListPhrases.COMPLETED_ORDERS]: 'הזמנות שהושלמו',
    [StatCardListPhrases.ORDER_TRACKING]: 'מעקב הזמנות',
  },
});
