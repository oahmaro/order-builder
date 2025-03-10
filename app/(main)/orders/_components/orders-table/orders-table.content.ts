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
  COMPLETE_ORDER = 'completeOrder',
  CANCEL_ORDER = 'cancelOrder',
  SEND_WHATSAPP = 'sendWhatsapp',
  CANCELED_ORDER_TOOLTIP = 'canceledOrderTooltip',
  REVERT_CANCELED_ORDER = 'revert-canceled-order',
  CUSTOMER_PHONE = 'customer_phone',
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
    [OrdersTableContentPhrases.COMPLETE_ORDER]: 'השלם הזמנה',
    [OrdersTableContentPhrases.CANCEL_ORDER]: 'בטל הזמנה',
    [OrdersTableContentPhrases.SEND_WHATSAPP]: 'שלח בוואטסאפ',
    [OrdersTableContentPhrases.CANCELED_ORDER_TOOLTIP]: 'הזמנה מבוטלת',
    [OrdersTableContentPhrases.REVERT_CANCELED_ORDER]: 'שחזר הזמנה מבוטלת',
    [OrdersTableContentPhrases.CUSTOMER_PHONE]: 'מספר טלפון לקוח',
  },
});
