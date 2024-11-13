// spell-checker: disable

import Polyglot from 'node-polyglot';

export enum PassepartoutsTableContentPhrases {
  ID = 'id',
  NAME = 'name',
  CREATED_AT = 'created-at',
  UPDATED_AT = 'updated-at',
  CREATED_BY = 'created-by',
  UPDATED_BY = 'updated-by',
}

export const passepartoutsTableContent = new Polyglot({
  locale: 'he',
  phrases: {
    [PassepartoutsTableContentPhrases.NAME]: 'שם',
    [PassepartoutsTableContentPhrases.ID]: 'מזהה פספרת',
    [PassepartoutsTableContentPhrases.CREATED_AT]: 'נוצר ב',
    [PassepartoutsTableContentPhrases.UPDATED_AT]: 'מעודכן',
    [PassepartoutsTableContentPhrases.CREATED_BY]: 'נוצר על ידי',
    [PassepartoutsTableContentPhrases.UPDATED_BY]: 'מעודכן על ידי',
  },
});
