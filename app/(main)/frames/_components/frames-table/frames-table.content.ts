// spell-checker: disable

import Polyglot from 'node-polyglot';

export enum FramesTableContentPhrases {
  ID = 'id',
  NAME = 'name',
  CREATED_AT = 'created-at',
  UPDATED_AT = 'updated-at',
  CREATED_BY = 'created-by',
  UPDATED_BY = 'updated-by',
}

export const framesTableContent = new Polyglot({
  locale: 'he',
  phrases: {
    [FramesTableContentPhrases.ID]: 'מזהה',
    [FramesTableContentPhrases.NAME]: 'שם',
    [FramesTableContentPhrases.CREATED_AT]: 'נוצר ב',
    [FramesTableContentPhrases.UPDATED_AT]: 'עודכן ב',
    [FramesTableContentPhrases.CREATED_BY]: 'נוצר על ידי',
    [FramesTableContentPhrases.UPDATED_BY]: 'עודכן על ידי',
  },
});
