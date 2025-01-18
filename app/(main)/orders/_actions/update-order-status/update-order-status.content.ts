// spell-checker: disable

import Polyglot from 'node-polyglot';

export enum UpdateOrderStatusContentPhrases {
  UNAUTHORIZED = 'unauthorized',
  ORDER_NOT_FOUND = 'order-not-found',
  STATUS_UPDATED = 'status-updated',
  UPDATE_FAILED = 'update-failed',
}

export const updateOrderStatusContent = new Polyglot({
  locale: 'he',
  phrases: {
    [UpdateOrderStatusContentPhrases.UNAUTHORIZED]: 'משתמש לא מורשה',
    [UpdateOrderStatusContentPhrases.ORDER_NOT_FOUND]: 'ההזמנה לא נמצאה',
    [UpdateOrderStatusContentPhrases.STATUS_UPDATED]: 'סטטוס ההזמנה עודכן בהצלחה',
    [UpdateOrderStatusContentPhrases.UPDATE_FAILED]: 'עדכון סטטוס ההזמנה נכשל',
  },
});
