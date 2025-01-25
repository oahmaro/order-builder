// spell-checker: disable

import Polyglot from 'node-polyglot';

export enum OrderHeaderContentPhrases {
  PHONE_NUMBER = 'phone-number',
  ADVANCE_PAYMENT = 'advance-payment',
  TOTAL = 'total',
  TOTAL_TO_PAY = 'total-to-pay',
  ORDER_NUMBER = 'order-number',
  DATE = 'date',
  ADDRESS = 'address',
  EMAIL = 'email',
  PHONE = 'phone',
  NAME = 'name',
  NOTHING_FOUND = 'nothing-found',
  PLACEHOLDER_ADDRESS = 'placeholder-address',
  PLACEHOLDER_PHONE = 'placeholder-phone',
  PLACEHOLDER_EMAIL = 'placeholder-email',
  CREATE_CUSTOMER = 'create-customer',
  CREATE_NEW_CUSTOMER = 'create-new-customer',
  CUSTOMER_PLACEHOLDER = 'customer-placeholder',
}

export const orderHeaderContent = new Polyglot({
  locale: 'he',
  phrases: {
    [OrderHeaderContentPhrases.PHONE_NUMBER]: 'טלפון',
    [OrderHeaderContentPhrases.ADVANCE_PAYMENT]: 'מקדמה',
    [OrderHeaderContentPhrases.TOTAL]: 'סה״כ',
    [OrderHeaderContentPhrases.TOTAL_TO_PAY]: 'סה״כ לתשלום',
    [OrderHeaderContentPhrases.ORDER_NUMBER]: 'הזמנה מס׳',
    [OrderHeaderContentPhrases.DATE]: 'תאריך',
    [OrderHeaderContentPhrases.ADDRESS]: 'כתובת',
    [OrderHeaderContentPhrases.EMAIL]: 'אימייל',
    [OrderHeaderContentPhrases.PHONE]: 'טלפון',
    [OrderHeaderContentPhrases.NAME]: 'שם',
    [OrderHeaderContentPhrases.NOTHING_FOUND]: 'לא נמצאו תוצאות...',
    [OrderHeaderContentPhrases.PLACEHOLDER_ADDRESS]: 'שילת בנין מגה אור',
    [OrderHeaderContentPhrases.PLACEHOLDER_PHONE]: '0522039315',
    [OrderHeaderContentPhrases.PLACEHOLDER_EMAIL]: 'omanut.hm@gmail.com',
    [OrderHeaderContentPhrases.CREATE_CUSTOMER]: 'הוסף לקוח חדש',
    [OrderHeaderContentPhrases.CREATE_NEW_CUSTOMER]: 'הוסף לקוח חדש',
    [OrderHeaderContentPhrases.CUSTOMER_PLACEHOLDER]: 'בחר לקוח',
  },
});
