// spell-checker: disable

import Polyglot from 'node-polyglot';

export enum AdhesionsTableContentPhrases {
  ID = 'id',
  NAME = 'name',
  CREATED_AT = 'created-at',
  UPDATED_AT = 'updated-at',
}

export const adhesionsTableContent = new Polyglot({
  locale: 'he',
  phrases: {
    [AdhesionsTableContentPhrases.ID]: 'מזהה תיאור',
    [AdhesionsTableContentPhrases.NAME]: 'שם',
    [AdhesionsTableContentPhrases.CREATED_AT]: 'נוצר ב',
    [AdhesionsTableContentPhrases.UPDATED_AT]: 'מעודכן',
  },
});
