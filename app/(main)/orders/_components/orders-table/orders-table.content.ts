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
  ORDER_STATUS_FILTER = 'orderStatusFilter',
  EDIT_ORDER = 'editOrder',
  PREVIEW_ORDER = 'previewOrder',
  PRINT_ORDER = 'printOrder',
  UPDATE_STATUS = 'updateStatus',
  SEND_WHATSAPP = 'sendWhatsapp',
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
    [OrdersTableContentPhrases.ORDER_STATUS_FILTER]: 'סטטוס הזמנה',
    [OrdersTableContentPhrases.EDIT_ORDER]: 'ערוך הזמנה',
    [OrdersTableContentPhrases.PREVIEW_ORDER]: 'תצוגה מקדימה',
    [OrdersTableContentPhrases.PRINT_ORDER]: 'הדפס הזמנה',
    [OrdersTableContentPhrases.UPDATE_STATUS]: 'עדכן סטטוס',
    [OrdersTableContentPhrases.SEND_WHATSAPP]: 'שלח בוואטסאפ',
  },
});
