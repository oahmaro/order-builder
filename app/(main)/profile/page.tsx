import { User } from '@prisma/client';

import { auth } from '@/auth';
import { getUserByEmailOrUsername } from '@/utils/user';
import { ProfileForm } from './components';

export default async function ProfilePage() {
  const session = await auth();

  const user = (await getUserByEmailOrUsername(
    session?.user?.email || session?.user?.username
  )) as User;

  return <ProfileForm user={user} />;
}
