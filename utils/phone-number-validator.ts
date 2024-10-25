import parsePhoneNumber from 'libphonenumber-js';

export const phoneNumberValidator = (countryCode: string, value: string): boolean => {
  try {
    const fullNumber = countryCode.startsWith('+')
      ? `${countryCode}${value}`
      : `+${countryCode}${value}`;
    const phoneNumber = parsePhoneNumber(fullNumber);

    if (!phoneNumber) {
      return false;
    }

    return phoneNumber.isValid();
  } catch (error) {
    return false;
  }
};
