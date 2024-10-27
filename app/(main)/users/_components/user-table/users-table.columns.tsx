import { User } from '@prisma/client';
import { Badge } from '@mantine/core';
import { createColumnHelper } from '@tanstack/react-table';

import { UserTableContent, userTableContent } from './users-table.content';

type UserDataType = Partial<User>;

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

  columnHelper.accessor('createdAt', {
    header: userTableContent.t(UserTableContent.CREATED_AT),
    enableHiding: true,
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor('updatedAt', {
    header: userTableContent.t(UserTableContent.UPDATED_AT),
    enableHiding: true,
    cell: (info) => info.getValue(),
  }),
];
