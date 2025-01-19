export const formatPhoneNumber = (dialingCode: string, number: string): string => {
  if (!number) return '—';

  const cleanNumber = number.replace(/\D/g, '');
  const cleanDialingCode = dialingCode.replace(/\D/g, '');

  if (cleanNumber.length < 4) {
    return `+${cleanDialingCode} ${cleanNumber}`;
  }

  if (cleanNumber.length < 7) {
    return `+${cleanDialingCode} ${cleanNumber.slice(0, 3)}-${cleanNumber.slice(3)}`;
  }

  return `+${cleanDialingCode} ${cleanNumber.slice(0, 3)}-${cleanNumber.slice(
    3,
    6
  )}-${cleanNumber.slice(6)}`;
};
