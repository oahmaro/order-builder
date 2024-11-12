// spell-checker: disable

import Polyglot from 'node-polyglot';

export enum AddressContentPhrases {
  ADDRESS_LABEL = 'address-label',
  COUNTRY_LABEL = 'country-label',
  COUNTRY_PLACEHOLDER = 'country-placeholder',
  STREET_ADDRESS_LABEL = 'street-address-label',
  STREET_ADDRESS_PLACEHOLDER = 'street-address-placeholder',
  APT_SUITE_LABEL = 'apt-suite-label',
  APT_SUITE_PLACEHOLDER = 'apt-suite-placeholder',
  CITY_LABEL = 'city-label',
  CITY_PLACEHOLDER = 'city-placeholder',
  STATE_PROVINCE_LABEL = 'state-province-label',
  STATE_PROVINCE_PLACEHOLDER = 'state-province-placeholder',
  POSTAL_CODE_LABEL = 'postal-code-label',
  POSTAL_CODE_PLACEHOLDER = 'postal-code-placeholder',
}

export const addressContent = new Polyglot({
  locale: 'he',
  phrases: {
    [AddressContentPhrases.ADDRESS_LABEL]: 'כתובת',
    [AddressContentPhrases.COUNTRY_LABEL]: 'מדינה',
    [AddressContentPhrases.COUNTRY_PLACEHOLDER]: 'בחר מדינה',
    [AddressContentPhrases.STREET_ADDRESS_LABEL]: 'כתובת רחוב',
    [AddressContentPhrases.STREET_ADDRESS_PLACEHOLDER]: 'הזן את כתובת הרחוב',
    [AddressContentPhrases.APT_SUITE_LABEL]: 'דירה/סויטה (אופציונלי)',
    [AddressContentPhrases.APT_SUITE_PLACEHOLDER]: 'הזן מספר דירה או סויטה',
    [AddressContentPhrases.CITY_LABEL]: 'עיר',
    [AddressContentPhrases.CITY_PLACEHOLDER]: 'הזן את שם העיר',
    [AddressContentPhrases.STATE_PROVINCE_LABEL]: 'מדינה / מחוז / אזור',
    [AddressContentPhrases.STATE_PROVINCE_PLACEHOLDER]: 'הזן מדינה, מחוז או אזור',
    [AddressContentPhrases.POSTAL_CODE_LABEL]: 'מיקוד',
    [AddressContentPhrases.POSTAL_CODE_PLACEHOLDER]: 'הזן מיקוד',
  },
});
