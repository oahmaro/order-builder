export const formatPhoneNumber = (number: string): string => {
  if (!number) return '—';

  const cleanNumber = number.replace(/\D/g, '');

  if (cleanNumber.length < 4) {
    return cleanNumber;
  }

  if (cleanNumber.length < 7) {
    return `${cleanNumber.slice(0, 3)}-${cleanNumber.slice(3)}`;
  }

  return `${cleanNumber.slice(0, 3)}-${cleanNumber.slice(3, 6)}-${cleanNumber.slice(6)}`;
};
