// spell-checker: disable

import Polyglot from 'node-polyglot';

export enum MainDrawerPhrases {
  HOME = 'home',
  ORDERS = 'orders',
  CUSTOMERS = 'customers',
  FRAMES = 'frames',
  ADHESIONS = 'adhesions',
  PRINTS = 'prints',
  DESCRIPTIONS = 'descriptions',

  TITLE = 'title',
  USERS = 'users',
  COMPANY = 'company',
}

export const mainDrawerContent = new Polyglot({
  locale: 'he',
  phrases: {
    [MainDrawerPhrases.HOME]: 'דף הבית',
    [MainDrawerPhrases.ORDERS]: 'הזמנות',
    [MainDrawerPhrases.CUSTOMERS]: 'לקוחות',
    [MainDrawerPhrases.FRAMES]: 'מסגרות',
    [MainDrawerPhrases.ADHESIONS]: 'הידבקויות',
    [MainDrawerPhrases.PRINTS]: 'הדפסים',
    [MainDrawerPhrases.DESCRIPTIONS]: 'תיאורים',

    [MainDrawerPhrases.TITLE]: 'פאנל הניהול',
    [MainDrawerPhrases.USERS]: 'משתמשים',
    [MainDrawerPhrases.COMPANY]: 'חברה',
  },
});
