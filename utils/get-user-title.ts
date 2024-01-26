export function generateUserTitle(user: {
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  username?: string | null;
}): string {
  let result = '';

  if (user?.firstName) {
    result += user.firstName;

    if (user?.lastName) {
      result += ` ${user?.lastName}`;
    }
  } else {
    result += user.email || user.username;
  }

  return result;
}
