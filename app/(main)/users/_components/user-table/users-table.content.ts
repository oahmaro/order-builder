// spell-checker: disable

import Polyglot from 'node-polyglot';

export enum UserTableContent {
  ID = 'ID',
  FIRST_NAME = 'FIRST_NAME',
  LAST_NAME = 'LAST_NAME',
  EMAIL = 'EMAIL',
  USERNAME = 'USERNAME',
  ROLE = 'ROLE',
  FULL_NAME = 'FULL_NAME',
  CREATED_AT = 'CREATED_AT',
  UPDATED_AT = 'UPDATED_AT',
  CREATED_BY = 'CREATED_BY',
  UPDATED_BY = 'UPDATED_BY',
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
    [UserTableContent.FULL_NAME]: 'שם מלא',
    [UserTableContent.CREATED_AT]: 'נוצר ב',
    [UserTableContent.UPDATED_AT]: 'מעודכן',
    [UserTableContent.CREATED_BY]: 'נוצר על ידי',
    [UserTableContent.UPDATED_BY]: 'מעודכן על ידי',
  },
});
