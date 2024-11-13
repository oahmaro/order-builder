import dayjs from 'dayjs';
import Link from 'next/link';
import { User } from '@prisma/client';
import { Badge } from '@mantine/core';
import { createColumnHelper } from '@tanstack/react-table';

import { UserTableContent, userTableContent } from './users-table.content';
import { generateUserTitle } from '@/utils/get-user-title';

type UserDataType = Partial<User> & {
  createdByUser?: { id: number; firstName: string; lastName: string } | null;
  updatedByUser?: { id: number; firstName: string; lastName: string } | null;
};

const columnHelper = createColumnHelper<UserDataType>();

export const columns = [
  columnHelper.accessor('id', {
    header: userTableContent.t(UserTableContent.ID),
    enableHiding: false,
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor('firstName', {
    header: userTableContent.t(UserTableContent.FIRST_NAME),
    enableHiding: true,
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor('lastName', {
    header: userTableContent.t(UserTableContent.LAST_NAME),
    enableHiding: true,
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor('email', {
    header: userTableContent.t(UserTableContent.EMAIL),
    enableHiding: true,
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor('username', {
    header: userTableContent.t(UserTableContent.USERNAME),
    enableHiding: true,
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor('role', {
    header: userTableContent.t(UserTableContent.ROLE),
    enableHiding: true,
    cell: (info) => (
      <Badge color="gray" variant="light">
        {info.getValue()}
      </Badge>
    ),
  }),

  columnHelper.accessor('createdByUser', {
    header: userTableContent.t(UserTableContent.CREATED_BY),
    enableHiding: true,
    cell: (info) => {
      const user = info.getValue();
      return user ? (
        <Link href={`/users/${user.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          {generateUserTitle(user)}
        </Link>
      ) : (
        'N/A'
      );
    },
  }),

  columnHelper.accessor('createdAt', {
    header: userTableContent.t(UserTableContent.CREATED_AT),
    enableHiding: true,
    cell: (info) => info.getValue() && dayjs(info.getValue()).format('MMMM D, YYYY h:mm A'),
  }),

  columnHelper.accessor('updatedByUser', {
    header: userTableContent.t(UserTableContent.UPDATED_BY),
    enableHiding: true,
    cell: (info) => {
      const user = info.getValue();
      return user ? (
        <Link href={`/users/${user.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          {generateUserTitle(user)}
        </Link>
      ) : (
        'N/A'
      );
    },
  }),

  columnHelper.accessor('updatedAt', {
    header: userTableContent.t(UserTableContent.UPDATED_AT),
    enableHiding: true,
    cell: (info) => info.getValue() && dayjs(info.getValue()).format('MMMM D, YYYY h:mm A'),
  }),
];
