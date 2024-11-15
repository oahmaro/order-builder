'use client';

import { User } from '@prisma/client';

import { columns } from './users-table.columns';
import { MainTable } from '@/components/main-table';

type UserDataType = Partial<User>;

export interface UsersTableProps {
  users: UserDataType[];
}

export default function UsersTable({ users }: UsersTableProps) {
  return <MainTable<UserDataType> columns={columns} data={users} />;
}
