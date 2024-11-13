// spell-checker: disable

import Polyglot from 'node-polyglot';

export enum OrdersTableContentPhrases {
  ID = 'id',
  STATUS = 'status',
  CUSTOMER = 'customer',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  CREATED_BY = 'createdBy',
  UPDATED_BY = 'updatedBy',
  ITEMS_COUNT = 'itemsCount',
  AMOUNT_PAID = 'amountPaid',
}

export const ordersTableContent = new Polyglot({
  locale: 'he',
  phrases: {
    [OrdersTableContentPhrases.ID]: 'מספר הזמנה',
    [OrdersTableContentPhrases.STATUS]: 'סטטוס',
    [OrdersTableContentPhrases.CUSTOMER]: 'לקוח',
    [OrdersTableContentPhrases.CREATED_AT]: 'נוצר בתאריך',
    [OrdersTableContentPhrases.UPDATED_AT]: 'עודכן בתאריך',
    [OrdersTableContentPhrases.CREATED_BY]: 'נוצר על ידי',
    [OrdersTableContentPhrases.UPDATED_BY]: 'עודכן על ידי',
    [OrdersTableContentPhrases.ITEMS_COUNT]: 'מספר פריטים',
    [OrdersTableContentPhrases.AMOUNT_PAID]: 'סכום ששולם',
  },
});
