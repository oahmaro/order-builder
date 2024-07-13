// spell-checker: disable

import Polyglot from 'node-polyglot';

export enum DescriptionsTableContentPhrases {
  ID = 'id',
  NAME = 'name',
  CREATED_AT = 'created-at',
  UPDATED_AT = 'updated-at',
}

export const descriptionsTableContent = new Polyglot({
  locale: 'he',
  phrases: {
    [DescriptionsTableContentPhrases.ID]: 'מזהה תיאור',
    [DescriptionsTableContentPhrases.NAME]: 'שם',
    [DescriptionsTableContentPhrases.CREATED_AT]: 'נוצר ב',
    [DescriptionsTableContentPhrases.UPDATED_AT]: 'מעודכן',
  },
});
