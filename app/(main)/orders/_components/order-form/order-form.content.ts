// spell-checker: disable

import Polyglot from 'node-polyglot';

export enum OrderFormContentPhrases {
  CREATE_ORDER = 'create-order',
  ORDER_CREATED = 'order-created',
  ADD_ORDER_ITEM = 'add-order-item',
  CUSTOMER_REQUIRED = 'customer-required',
  UNIT_PRICE_REQUIRED = 'unit-price-required',
  ERROR_WHILE_CREATING = 'error-while-creating',
  IMAGE_UPLOAD_FAILED = 'image-upload-failed',
  FORM_DATA_INVALID = 'form-data-invalid',
  CANCEL = 'cancel',
  UPDATE_ORDER = 'update-order',
  ORDER_UPDATED = 'order-updated',
  ERROR_WHILE_UPDATING = 'error-while-updating',
}

export const orderFormContent = new Polyglot({
  locale: 'he',
  phrases: {
    [OrderFormContentPhrases.CREATE_ORDER]: 'צור הזמנה',
    [OrderFormContentPhrases.CUSTOMER_REQUIRED]: 'לקוח נדרש',
    [OrderFormContentPhrases.ADD_ORDER_ITEM]: 'הוסף פריט להזמנה',
    [OrderFormContentPhrases.ORDER_CREATED]: 'ההזמנה נוצרה בהצלחה',
    [OrderFormContentPhrases.UNIT_PRICE_REQUIRED]: 'מחיר יחידה נדרש',
    [OrderFormContentPhrases.ERROR_WHILE_CREATING]: 'שגיאה ביצירת ההזמנה',
    [OrderFormContentPhrases.FORM_DATA_INVALID]: 'נתוני הטופס שגויים',
    [OrderFormContentPhrases.IMAGE_UPLOAD_FAILED]: 'העלאת התמונה נכשלה',
    [OrderFormContentPhrases.CANCEL]: 'ביטול',
    [OrderFormContentPhrases.UPDATE_ORDER]: 'עדכן הזמנה',
    [OrderFormContentPhrases.ORDER_UPDATED]: 'ההזמנה עודכנה בהצלחה',
    [OrderFormContentPhrases.ERROR_WHILE_UPDATING]: 'שגיאה בעדכון ההזמנה',
  },
});
