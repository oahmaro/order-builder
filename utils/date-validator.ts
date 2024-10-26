export const dateValidator = (value?: string) => {
  if (value === undefined || value === '') {
    return true;
  }
  const date = new Date(value);
  const isValid = !Number.isNaN(date.getTime());
  return isValid;
};
