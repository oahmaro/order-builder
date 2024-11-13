import { User } from '@prisma/client';
import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import { ProfileForm } from './_components';
import { getUserById } from '@/utils/user';
import ProfileFormContainer from './_components/profile-form/profile-form.container';

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect('/login');
  }

  const user = (await getUserById(parseInt(session.user.id, 10))) as User;

  if (!user) {
    redirect('/login');
  }

  return (
    <ProfileFormContainer user={user}>
      <ProfileForm user={user} />
    </ProfileFormContainer>
  );
}
