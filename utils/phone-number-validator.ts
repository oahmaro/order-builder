import parsePhoneNumber from 'libphonenumber-js';

export const phoneNumberValidator = (countryCode: string, value: string): boolean => {
  try {
    const [, code] = countryCode.split(':');
    const normalizedValue = value.startsWith('0') ? value.slice(1) : value;
    const fullNumber = `${code}${normalizedValue}`;
    const phoneNumber = parsePhoneNumber(fullNumber);

    if (!phoneNumber) {
      return false;
    }

    return phoneNumber.isValid();
  } catch (error) {
    return false;
  }
};
