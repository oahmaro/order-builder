export function generateUserTitle(user: {
  firstName?: string | null;
  lastName?: string | null;
  username?: string | null;
}): string {
  if (user?.firstName && user?.lastName) {
    return `${user.firstName} ${user.lastName}`;
  }

  if (user?.firstName) {
    return user.firstName;
  }

  if (user?.lastName) {
    return user.lastName;
  }

  return user?.username || '';
}

export function generateUserSubtitle(user: {
  email?: string | null;
  username?: string | null;
}): string {
  return user?.email || user?.username || '';
}
