// spell-checker: disable

import Polyglot from 'node-polyglot';

export enum DescriptionsTableContentPhrases {
  ID = 'id',
  NAME = 'name',
  CREATED_AT = 'created-at',
  UPDATED_AT = 'updated-at',
  CREATED_BY = 'created-by',
  UPDATED_BY = 'updated-by',
}

export const descriptionsTableContent = new Polyglot({
  locale: 'he',
  phrases: {
    [DescriptionsTableContentPhrases.ID]: 'מזהה',
    [DescriptionsTableContentPhrases.NAME]: 'שם',
    [DescriptionsTableContentPhrases.CREATED_AT]: 'נוצר ב',
    [DescriptionsTableContentPhrases.UPDATED_AT]: 'עודכן ב',
    [DescriptionsTableContentPhrases.CREATED_BY]: 'נוצר על ידי',
    [DescriptionsTableContentPhrases.UPDATED_BY]: 'עודכן על ידי',
  },
});
