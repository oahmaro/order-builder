import parsePhoneNumberFromString from 'libphonenumber-js';

export const phoneNumberValidator = (value: string) => {
  const phoneNumber = parsePhoneNumberFromString(value);
  if (!phoneNumber || !phoneNumber.isValid()) {
    return false;
  }
  return true;
};
