// spell-checker: disable

import Polyglot from 'node-polyglot';

export enum UserTableContent {
  ID = 'ID',
  FIRST_NAME = 'FIRST_NAME',
  LAST_NAME = 'LAST_NAME',
  EMAIL = 'EMAIL',
  USERNAME = 'USERNAME',
  ROLE = 'ROLE',
  CREATED_AT = 'CREATED_AT',
  UPDATED_AT = 'UPDATED_AT',
}

export const userTableContent = new Polyglot({
  locale: 'he',
  phrases: {
    [UserTableContent.ID]: 'זהות המשתמש',
    [UserTableContent.FIRST_NAME]: 'שם פרטי',
    [UserTableContent.LAST_NAME]: 'שם משפחה',
    [UserTableContent.EMAIL]: 'אימייל',
    [UserTableContent.USERNAME]: 'שם משתמש',
    [UserTableContent.ROLE]: 'תפקיד',
    [UserTableContent.CREATED_AT]: 'נוצר ב',
    [UserTableContent.UPDATED_AT]: 'מעודכן',
  },
});
