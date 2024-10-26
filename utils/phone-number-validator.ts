import parsePhoneNumber from 'libphonenumber-js';

export const phoneNumberValidator = (dialingCode: string, value: string): boolean => {
  try {
    let cleanNumber = value.replace(/\D/g, '');

    if (cleanNumber.startsWith('0')) {
      cleanNumber = cleanNumber.slice(1);
    }

    const fullNumber = `${dialingCode}${cleanNumber}`;
    const phoneNumber = parsePhoneNumber(fullNumber);

    if (!phoneNumber) {
      return false;
    }

    const isValid = phoneNumber.isValid();

    return isValid;
  } catch (error) {
    return false;
  }
};
