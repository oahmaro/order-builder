import { redirect } from 'next/navigation';
import { UserRole } from '@prisma/client';

import { auth } from '@/auth';

export default async function UsersPage() {
  const session = await auth();

  if (session?.user?.role !== UserRole.ADMIN) {
    redirect('/');
  }

  return <div>Users page</div>;
}
