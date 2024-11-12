// spell-checker: disable

import Polyglot from 'node-polyglot';

export enum PassepartoutsTableContentPhrases {
  ID = 'id',
  NAME = 'name',
  CREATED_AT = 'created-at',
  UPDATED_AT = 'updated-at',
}

export const passepartoutsTableContent = new Polyglot({
  locale: 'he',
  phrases: {
    [PassepartoutsTableContentPhrases.NAME]: 'שם',
    [PassepartoutsTableContentPhrases.ID]: 'מזהה פספרת',
    [PassepartoutsTableContentPhrases.CREATED_AT]: 'נוצר ב',
    [PassepartoutsTableContentPhrases.UPDATED_AT]: 'מעודכן',
  },
});
