// spell-checker: disable

import Polyglot from 'node-polyglot';

export enum HomePagePhrases {
  WELCOME_TITLE = 'welcome-title',
  APP_DESCRIPTION = 'app-description',
}

export const homePageContent = new Polyglot({
  locale: 'he',
  phrases: {
    [HomePagePhrases.WELCOME_TITLE]: 'ברוך הבא 👋',
    [HomePagePhrases.APP_DESCRIPTION]:
      'אפליקציה זו פותרת את ניהול, יצירה ומעקב הזמנות בקלות, ומציעה יכולת להדפיסן בקלות. פשוט את התהליכים שלך ושמור על סדר בצורה יעילה.',
  },
});
