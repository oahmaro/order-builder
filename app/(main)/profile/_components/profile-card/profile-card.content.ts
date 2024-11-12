// spell-checker: disable

import Polyglot from 'node-polyglot';

export enum ProfileCardContentPhrases {
  TITLE = 'title',
  FIRST_NAME = 'first-name',
  LAST_NAME = 'last-name',
  EMAIL = 'email',
  USERNAME = 'username',
}

export const profileCardContent = new Polyglot({
  locale: 'he',
  phrases: {
    [ProfileCardContentPhrases.TITLE]: 'פרופיל',
    [ProfileCardContentPhrases.FIRST_NAME]: 'שם פרטי',
    [ProfileCardContentPhrases.LAST_NAME]: 'שם משפחה',
    [ProfileCardContentPhrases.EMAIL]: 'אימייל',
    [ProfileCardContentPhrases.USERNAME]: 'שם משתמש',
  },
});
