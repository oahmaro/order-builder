// spell-checker: disable

import Polyglot from 'node-polyglot';

export enum OrdersTableContentPhrases {
  ORDER_NUMBER = 'order-number',
  STATUS = 'status',
  CUSTOMER = 'customer',
  AMOUNT = 'amount',
  VIEWING_ORDERS = 'viewing-orders',
  DELIVERED = 'delivered',
  CANCELED = 'canceled',
  ON_HOLD = 'on-hold',
  PENDING = 'pending',
  PROCESSING = 'processing',
  REFUNDED = 'refunded',
  SHIPPED = 'shipped',
  CREATE_ORDER = 'create-order',
  NO_ORDERS_FOUND = 'no-orders-found',
  NO_ORDERS_FOUND_DESCRIPTION = 'no-orders-found-description',
}

export const ordersTableContent = new Polyglot({
  locale: 'he',
  phrases: {
    [OrdersTableContentPhrases.ORDER_NUMBER]: 'מספר הזמנה',
    [OrdersTableContentPhrases.STATUS]: 'סטטוס',
    [OrdersTableContentPhrases.CUSTOMER]: 'לקוח',
    [OrdersTableContentPhrases.AMOUNT]: 'כמות',
    [OrdersTableContentPhrases.VIEWING_ORDERS]: 'צפייה ב-%{start} - %{end} הזמנות',
    [OrdersTableContentPhrases.DELIVERED]: 'נמסר',
    [OrdersTableContentPhrases.CANCELED]: 'מבוטל',
    [OrdersTableContentPhrases.ON_HOLD]: 'בהמתנה',
    [OrdersTableContentPhrases.PENDING]: 'ממתין ל',
    [OrdersTableContentPhrases.PROCESSING]: 'מעבד',
    [OrdersTableContentPhrases.REFUNDED]: 'הוחזר',
    [OrdersTableContentPhrases.SHIPPED]: 'נשלח',
    [OrdersTableContentPhrases.CREATE_ORDER]: 'צור ערך חדש',
    [OrdersTableContentPhrases.NO_ORDERS_FOUND]: 'לא נמצאו הזמנות',
    [OrdersTableContentPhrases.NO_ORDERS_FOUND_DESCRIPTION]:
      'עדכן את שאילתת החיפוש והסינונים שלך, או צור הזמנה חדשה.',
  },
});
