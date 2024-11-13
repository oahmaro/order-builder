// spell-checker: disable

import Polyglot from 'node-polyglot';

export enum PrintsTableContentPhrases {
  ID = 'id',
  NAME = 'name',
  CREATED_AT = 'created-at',
  UPDATED_AT = 'updated-at',
  CREATED_BY = 'created-by',
  UPDATED_BY = 'updated-by',
}

export const printsTableContent = new Polyglot({
  locale: 'he',
  phrases: {
    [PrintsTableContentPhrases.ID]: 'מזהה הדפסה',
    [PrintsTableContentPhrases.NAME]: 'שם',
    [PrintsTableContentPhrases.CREATED_AT]: 'נוצר ב',
    [PrintsTableContentPhrases.UPDATED_AT]: 'מעודכן',
    [PrintsTableContentPhrases.CREATED_BY]: 'נוצר על ידי',
    [PrintsTableContentPhrases.UPDATED_BY]: 'מעודכן על ידי',
  },
});
