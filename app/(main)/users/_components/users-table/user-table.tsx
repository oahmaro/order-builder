'use client';

import { Badge } from '@mantine/core';
import { User } from '@prisma/client';

import { CustomTable } from '@/components';
import { UsersTableContentPhrase, usersTableContent } from './users-table.content';

type UserData = Partial<Omit<User, 'password'>>;

export interface UsersTableProps {
  users: UserData[];
}

export default function UsersTable({ users }: UsersTableProps) {
  return (
    <CustomTable<UserData>
      columns={[
        {
          header: usersTableContent.t(UsersTableContentPhrase.ID),
          sortable: true,
          render: (data) => data.id,
        },
        {
          header: usersTableContent.t(UsersTableContentPhrase.FIRST_NAME),
          sortable: true,
          render: (data) => data.firstName,
        },
        {
          header: usersTableContent.t(UsersTableContentPhrase.LAST_NAME),
          sortable: true,
          render: (data) => data.lastName,
        },
        {
          header: usersTableContent.t(UsersTableContentPhrase.EMAIL),
          sortable: true,
          render: (data) => data.email,
        },
        {
          header: usersTableContent.t(UsersTableContentPhrase.ROLE),
          sortable: true,
          render: (data) => data.role,
        },
        {
          header: usersTableContent.t(UsersTableContentPhrase.USERNAME),
          sortable: true,
          render: (data) => data.username,
        },
        {
          header: usersTableContent.t(UsersTableContentPhrase.ACTIVE),
          sortable: true,
          render: (data) => (
            <Badge color={data.active ? 'green' : 'red'} variant="dot">
              {data.active ? 'Active' : 'InActive'}
            </Badge>
          ),
        },
        {
          header: usersTableContent.t(UsersTableContentPhrase.CREATED_AT),
          sortable: true,
          render: (data) => data.createdAt?.toDateString(),
        },
        {
          header: usersTableContent.t(UsersTableContentPhrase.UPDATED_AT),
          sortable: true,
          render: (data) => data.updatedAt?.toDateString(),
        },
      ]}
      data={users}
    />
  );
}
