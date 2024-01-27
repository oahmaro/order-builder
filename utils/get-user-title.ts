export function generateUserTitle(user: {
  firstName?: string | null;
  lastName?: string | null;
}): string {
  let result = '';

  if (user?.firstName) {
    result += user.firstName;

    if (user?.lastName) {
      result += ` ${user?.lastName}`;
    }
  }

  return result;
}

export function generateUserSubtitle(user: {
  email?: string | null;
  username?: string | null;
}): string {
  return user?.email || user?.username || '';
}
