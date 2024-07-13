// spell-checker: disable

import Polyglot from 'node-polyglot';

export enum CustomersTableContentPhrases {
  ID = 'id',
  FIRST_NAME = 'first-name',
  LAST_NAME = 'last-name',
  PHONE = 'phone',
  EMAIL = 'email',
  DATE_OF_BIRTH = 'date-of-birth',
  CREATED_AT = 'created-at',
  UPDATED_AT = 'updated-at',
}

export const customersTableContent = new Polyglot({
  locale: 'he',
  phrases: {
    [CustomersTableContentPhrases.ID]: 'זהות הלקוח',
    [CustomersTableContentPhrases.FIRST_NAME]: 'שם פרטי',
    [CustomersTableContentPhrases.LAST_NAME]: 'שם משפחה',
    [CustomersTableContentPhrases.PHONE]: 'טלפון',
    [CustomersTableContentPhrases.EMAIL]: 'אימייל',
    [CustomersTableContentPhrases.DATE_OF_BIRTH]: 'תאריך לידה',
    [CustomersTableContentPhrases.CREATED_AT]: 'נוצר ב',
    [CustomersTableContentPhrases.UPDATED_AT]: 'מעודכן',
  },
});
