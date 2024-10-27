// spell-checker: disable

import Polyglot from 'node-polyglot';

export enum FramesTableContentPhrases {
  ID = 'id',
  NAME = 'name',
  DESCRIPTION = 'description',
  CREATED_AT = 'created-at',
  UPDATED_AT = 'updated-at',
}

export const framesTableContent = new Polyglot({
  locale: 'he',
  phrases: {
    [FramesTableContentPhrases.ID]: 'זהות הצלחת',
    [FramesTableContentPhrases.NAME]: 'שם הצלחת',
    [FramesTableContentPhrases.DESCRIPTION]: 'תיאור הצלחת',
    [FramesTableContentPhrases.CREATED_AT]: 'נוצר ב',
    [FramesTableContentPhrases.UPDATED_AT]: 'מעודכן',
  },
});
