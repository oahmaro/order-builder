// spell-checker: disable

import Polyglot from 'node-polyglot';

export enum AdhesionsTableContentPhrases {
  ID = 'id',
  NAME = 'name',
  CREATED_AT = 'created-at',
  UPDATED_AT = 'updated-at',
  CREATED_BY = 'created-by',
  UPDATED_BY = 'updated-by',
}

export const adhesionsTableContent = new Polyglot({
  locale: 'he',
  phrases: {
    [AdhesionsTableContentPhrases.ID]: 'מזהה',
    [AdhesionsTableContentPhrases.NAME]: 'שם',
    [AdhesionsTableContentPhrases.CREATED_AT]: 'נוצר ב',
    [AdhesionsTableContentPhrases.UPDATED_AT]: 'עודכן ב',
    [AdhesionsTableContentPhrases.CREATED_BY]: 'נוצר על ידי',
    [AdhesionsTableContentPhrases.UPDATED_BY]: 'עודכן על ידי',
  },
});
