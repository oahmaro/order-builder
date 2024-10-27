import { db } from '@/lib/db';
import { UpdateUserForm } from '../_components';
import UserFormContainer from '../_components/user-form/user-form.container';

export default async function UserPage({ params }: { params: { userId: string } }) {
  const user = await db.user.findUnique({
    where: { id: Number(params.userId) },
  });

  return (
    <>
      {user && (
        <UserFormContainer user={user}>
          <UpdateUserForm user={user} />
        </UserFormContainer>
      )}
    </>
  );
}
