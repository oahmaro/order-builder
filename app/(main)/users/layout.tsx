import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { UserRole } from '@prisma/client';

import { auth } from '@/auth';

export default async function UsersLayout({ children }: { children: ReactNode }) {
  const session = await auth();

  if (session?.user?.role !== UserRole.ADMIN) {
    redirect('/');
  }

  return <>{children}</>;
}
