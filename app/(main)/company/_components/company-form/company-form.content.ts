// spell-checker: disable

import Polyglot from 'node-polyglot';

export enum CompanyFormContentPhrases {
  PHONES_LABEL = 'phones-label',
  NAME_REQUIRED = 'name-required',
  ADDRESS_LABEL = 'address-label',
  EMAIL_REQUIRED = 'email-required',
  COMPANY_DETAILS_LABEL = 'company-details-label',
}

export const companyFormContent = new Polyglot({
  locale: 'he',
  phrases: {
    [CompanyFormContentPhrases.ADDRESS_LABEL]: 'כתובת',
    [CompanyFormContentPhrases.PHONES_LABEL]: 'טלפונים',
    [CompanyFormContentPhrases.NAME_REQUIRED]: 'נדרש שם',
    [CompanyFormContentPhrases.EMAIL_REQUIRED]: 'נדרש אימייל',
    [CompanyFormContentPhrases.COMPANY_DETAILS_LABEL]: 'פרטי חברה',
  },
});
