import Polyglot from 'node-polyglot';

export enum UsersTableContentPhrase {
  ID = 'id',
  FIRST_NAME = 'first-name',
  LAST_NAME = 'last-name',
  EMAIL = 'email',
  ROLE = 'role',
  USERNAME = 'username',
  ACTIVE = 'active',
  CREATED_AT = 'created-at',
  UPDATED_AT = 'updated-at',
}

export const usersTableContent = new Polyglot({
  locale: 'he',
  phrases: {
    [UsersTableContentPhrase.ID]: 'זהות המשתמש',
    [UsersTableContentPhrase.FIRST_NAME]: 'שם פרטי',
    [UsersTableContentPhrase.LAST_NAME]: 'שם משפחה',
    [UsersTableContentPhrase.EMAIL]: 'אימייל',
    [UsersTableContentPhrase.ROLE]: 'תפקיד משתמש',
    [UsersTableContentPhrase.USERNAME]: 'שם משתמש',
    [UsersTableContentPhrase.ACTIVE]: 'סטטוס',
    [UsersTableContentPhrase.CREATED_AT]: 'נוצר ב',
    [UsersTableContentPhrase.UPDATED_AT]: 'מעודכן',
  },
});
