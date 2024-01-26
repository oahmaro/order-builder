export function getUserInitials(name: string) {
  const words = name.split(' ');

  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }

  if (words.length === 2) {
    return `${words[0].charAt(0).toUpperCase()}${words[1].charAt(0).toUpperCase()}`;
  }

  return '';
}
