// spell-checker:disable

import Polyglot from 'node-polyglot';

export enum ProfileFormPhrases {
  SAVE_SUCCESS = 'save-success',
}

export const profileFormContent = new Polyglot({
  locale: 'he',
  phrases: {
    [ProfileFormPhrases.SAVE_SUCCESS]: 'הפרופיל נשמר בהצלחה',
  },
});
