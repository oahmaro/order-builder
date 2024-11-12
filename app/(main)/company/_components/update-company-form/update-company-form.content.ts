// spell-checker:disable

import Polyglot from 'node-polyglot';

export enum UpdateCompanyFormContentPhrases {
  COMPANY_UPDATED = 'company-updated',
  ERROR_WHILE_UPDATING = 'error-while-updating',
}

export const updateCompanyFormContent = new Polyglot({
  locale: 'he',
  phrases: {
    [UpdateCompanyFormContentPhrases.COMPANY_UPDATED]: 'עדכון פרטי חברה',
    [UpdateCompanyFormContentPhrases.ERROR_WHILE_UPDATING]: 'שגיאה בעדכון פרטי חברה',
  },
});
