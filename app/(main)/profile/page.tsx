import { User } from '@prisma/client';

import { auth } from '@/auth';
import { ProfileForm } from './_components';
import { getUserByEmailOrUsername } from '@/utils/user';
import ProfileFormContainer from './_components/profile-form/profile-form.container';

export default async function ProfilePage() {
  const session = await auth();

  const user = (await getUserByEmailOrUsername(
    session?.user?.email || session?.user?.username
  )) as User;

  return (
    <ProfileFormContainer user={user}>
      <ProfileForm user={user} />
    </ProfileFormContainer>
  );
}
