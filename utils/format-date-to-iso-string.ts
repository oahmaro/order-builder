export const formatDateToISOString = (date: unknown): string => {
  if (date instanceof Date) {
    return date.toISOString().split('T')[0];
  }
  return String(date || '');
};
