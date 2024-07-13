export const dateValidator = (value?: string) => {
  if (value === undefined || value === '') return true;
  const date = new Date(value);
  return !Number.isNaN(date.getTime());
};
