import dayjs from 'dayjs';
import Link from 'next/link';
import { User } from '@prisma/client';
import { Anchor, Badge } from '@mantine/core';
import { createColumnHelper } from '@tanstack/react-table';

import { generateUserTitle } from '@/utils/get-user-title';
import { UserTableContent, userTableContent } from './users-table.content';

type UserDataType = Partial<User> & {
  createdByUser?: { id: number; firstName: string; lastName: string } | null;
  updatedByUser?: { id: number; firstName: string; lastName: string } | null;
};

const columnHelper = createColumnHelper<UserDataType>();

export const columns = [
  columnHelper.accessor((row) => String(row.id), {
    id: 'id',
    header: userTableContent.t(UserTableContent.ID),
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor(
    (row) => {
      const title = generateUserTitle(row);
      return title || 'N/A';
    },
    {
      id: 'fullName',
      header: userTableContent.t(UserTableContent.FULL_NAME),
      cell: (info) => (
        <Anchor size="sm" component={Link} href={`/users/${info.row.original.id}`}>
          {info.getValue()}
        </Anchor>
      ),
    }
  ),

  columnHelper.accessor('email', {
    header: userTableContent.t(UserTableContent.EMAIL),
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor('username', {
    header: userTableContent.t(UserTableContent.USERNAME),
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor((row) => `${row.role} ${userTableContent.t(`ROLE_${row.role}`)}`, {
    id: 'role',
    header: userTableContent.t(UserTableContent.ROLE),
    cell: (info) => (
      <Badge color="gray" variant="light">
        {info.row.original.role}
      </Badge>
    ),
  }),

  columnHelper.accessor(
    (row) =>
      row.createdByUser ? `${row.createdByUser.id} ${generateUserTitle(row.createdByUser)}` : '',
    {
      id: 'createdBy',
      header: userTableContent.t(UserTableContent.CREATED_BY),
      cell: (info) => {
        const user = info.row.original.createdByUser;
        return user ? (
          <Anchor size="sm" component={Link} href={`/users/${user.id}`}>
            {generateUserTitle(user)}
          </Anchor>
        ) : (
          'N/A'
        );
      },
    }
  ),

  columnHelper.accessor(
    (row) =>
      row.createdAt
        ? `${row.createdAt.toISOString()} ${dayjs(row.createdAt).format('MMMM D, YYYY h:mm A')}`
        : '',
    {
      id: 'createdAt',
      header: userTableContent.t(UserTableContent.CREATED_AT),
      cell: (info) =>
        info.row.original.createdAt &&
        dayjs(info.row.original.createdAt).format('MMMM D, YYYY h:mm A'),
    }
  ),

  columnHelper.accessor('updatedByUser', {
    header: userTableContent.t(UserTableContent.UPDATED_BY),
    cell: (info) => {
      const user = info.getValue();
      return user ? (
        <Anchor size="sm" component={Link} href={`/users/${user.id}`}>
          {generateUserTitle(user)}
        </Anchor>
      ) : (
        'N/A'
      );
    },
  }),

  columnHelper.accessor('updatedAt', {
    header: userTableContent.t(UserTableContent.UPDATED_AT),
    cell: (info) => info.getValue() && dayjs(info.getValue()).format('MMMM D, YYYY h:mm A'),
  }),
];
