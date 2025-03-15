import dayjs from 'dayjs';
import Link from 'next/link';
import { Anchor, Highlight } from '@mantine/core';
import { Passepartout } from '@prisma/client';
import { createColumnHelper } from '@tanstack/react-table';

import {
  passepartoutsTableContent,
  PassepartoutsTableContentPhrases,
} from './passepartouts-table.content';
import { generateUserTitle } from '@/utils/get-user-title';

type PassepartoutDataType = Partial<Passepartout> & {
  createdByUser?: {
    id: number;
    firstName: string;
    lastName: string;
    username?: string | null;
  } | null;
  updatedByUser?: {
    id: number;
    firstName: string;
    lastName: string;
    username?: string | null;
  } | null;
};

const columnHelper = createColumnHelper<PassepartoutDataType>();

export const columns = [
  columnHelper.accessor((row) => String(row.id), {
    id: 'id',
    header: passepartoutsTableContent.t(PassepartoutsTableContentPhrases.ID),
    cell: (info) => {
      const passepartoutId = info.getValue();
      const searchQuery = info.table.getState().globalFilter || '';

      return searchQuery ? (
        <Highlight highlight={searchQuery}>{passepartoutId}</Highlight>
      ) : (
        passepartoutId
      );
    },
  }),

  columnHelper.accessor('name', {
    id: 'name',
    header: passepartoutsTableContent.t(PassepartoutsTableContentPhrases.NAME),
    sortingFn: (rowA, rowB) => (rowA.original.name ?? '').localeCompare(rowB.original.name ?? ''),
    cell: (info) => {
      const value = info.getValue() || '';
      const searchQuery = info.table.getState().globalFilter || '';

      return value ? (
        <Anchor size="sm" component={Link} href={`/passepartouts/${info.row.original.id}`}>
          {searchQuery ? <Highlight highlight={searchQuery}>{value}</Highlight> : value}
        </Anchor>
      ) : (
        '-'
      );
    },
  }),

  columnHelper.accessor('createdByUser', {
    header: passepartoutsTableContent.t(PassepartoutsTableContentPhrases.CREATED_BY),
    cell: (info) => {
      const user = info.getValue();
      const searchQuery = info.table.getState().globalFilter || '';

      if (!user?.id) return '-';

      const userTitle = generateUserTitle(user);

      return (
        <Anchor size="sm" component={Link} href={`/users/${user.id}`}>
          {searchQuery ? <Highlight highlight={searchQuery}>{userTitle}</Highlight> : userTitle}
        </Anchor>
      );
    },
  }),

  columnHelper.accessor('updatedByUser', {
    header: passepartoutsTableContent.t(PassepartoutsTableContentPhrases.UPDATED_BY),
    cell: (info) => {
      const user = info.getValue();
      const searchQuery = info.table.getState().globalFilter || '';

      if (!user?.id) return '-';

      const userTitle = generateUserTitle(user);

      return (
        <Anchor size="sm" component={Link} href={`/users/${user.id}`}>
          {searchQuery ? <Highlight highlight={searchQuery}>{userTitle}</Highlight> : userTitle}
        </Anchor>
      );
    },
  }),

  columnHelper.accessor(
    (row) =>
      row.createdAt
        ? `${row.createdAt.toISOString()} ${dayjs(row.createdAt).format('MMMM D, YYYY h:mm A')}`
        : '',
    {
      id: 'createdAt',
      header: passepartoutsTableContent.t(PassepartoutsTableContentPhrases.CREATED_AT),
      cell: (info) =>
        info.row.original.createdAt
          ? dayjs(info.row.original.createdAt).format('MMMM D, YYYY h:mm A')
          : '-',
    }
  ),

  columnHelper.accessor(
    (row) =>
      row.updatedAt
        ? `${row.updatedAt.toISOString()} ${dayjs(row.updatedAt).format('MMMM D, YYYY h:mm A')}`
        : '',
    {
      id: 'updatedAt',
      header: passepartoutsTableContent.t(PassepartoutsTableContentPhrases.UPDATED_AT),
      cell: (info) =>
        info.row.original.updatedAt
          ? dayjs(info.row.original.updatedAt).format('MMMM D, YYYY h:mm A')
          : '-',
    }
  ),
];
