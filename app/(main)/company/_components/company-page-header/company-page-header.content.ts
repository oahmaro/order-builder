// spell-checker: disable

import Polyglot from 'node-polyglot';

export enum CompanyPageHeaderPhrases {
  SAVE_ACTION = 'save-action',
  SAVE_DISABLED_TOOLTIP = 'save-disabled-tooltip',
}

export const companyPageHeaderContent = new Polyglot({
  locale: 'he',
  phrases: {
    [CompanyPageHeaderPhrases.SAVE_ACTION]: 'שמור',
    [CompanyPageHeaderPhrases.SAVE_DISABLED_TOOLTIP]: 'אין שינויים לשמור',
  },
});
