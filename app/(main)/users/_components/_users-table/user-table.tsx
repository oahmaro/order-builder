'use client';

import { User } from '@prisma/client';

import { MainTable } from '@/components/main-table';
import { columns } from '../user-table/users-table.columns';

type UserDataType = Partial<User>;

export interface UsersTableProps {
  users: UserDataType[];
}

export default function UsersTable({ users }: UsersTableProps) {
  return <MainTable<UserDataType> columns={columns} data={users} />;
}
