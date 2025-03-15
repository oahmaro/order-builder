import dayjs from 'dayjs';
import Link from 'next/link';
import { Print } from '@prisma/client';
import { Anchor, Highlight } from '@mantine/core';
import { createColumnHelper } from '@tanstack/react-table';

import { generateUserTitle } from '@/utils/get-user-title';
import { printsTableContent, PrintsTableContentPhrases } from './prints-table.content';

type PrintDataType = Partial<Print> & {
  createdByUser?: { id: number; firstName: string; lastName: string } | null;
  updatedByUser?: { id: number; firstName: string; lastName: string } | null;
};

const columnHelper = createColumnHelper<PrintDataType>();

export const columns = [
  columnHelper.accessor((row) => String(row.id), {
    id: 'id',
    header: printsTableContent.t(PrintsTableContentPhrases.ID),
    cell: (info) => {
      const printId = info.getValue();
      const searchQuery = info.table.getState().globalFilter || '';

      return searchQuery ? <Highlight highlight={searchQuery}>{printId}</Highlight> : printId;
    },
  }),

  columnHelper.accessor('name', {
    id: 'name',
    header: printsTableContent.t(PrintsTableContentPhrases.NAME),
    sortingFn: (rowA, rowB) => (rowA.original.name ?? '').localeCompare(rowB.original.name ?? ''),
    cell: (info) => {
      const printName = info.getValue() || '';
      const searchQuery = info.table.getState().globalFilter || '';

      return (
        <Anchor size="sm" component={Link} href={`/prints/${info.row.original.id}`}>
          {searchQuery ? <Highlight highlight={searchQuery}>{printName}</Highlight> : printName}
        </Anchor>
      );
    },
  }),

  columnHelper.accessor(
    (row) =>
      row.createdByUser ? `${row.createdByUser.id} ${generateUserTitle(row.createdByUser)}` : '',
    {
      id: 'createdBy',
      header: printsTableContent.t(PrintsTableContentPhrases.CREATED_BY),
      cell: (info) => {
        const user = info.row.original.createdByUser;
        const userName = user ? generateUserTitle(user) : 'N/A';
        const searchQuery = info.table.getState().globalFilter || '';

        if (!user) return 'N/A';

        return (
          <Anchor size="sm" component={Link} href={`/users/${user.id}`}>
            {searchQuery ? <Highlight highlight={searchQuery}>{userName}</Highlight> : userName}
          </Anchor>
        );
      },
    }
  ),

  columnHelper.accessor(
    (row) =>
      row.updatedByUser ? `${row.updatedByUser.id} ${generateUserTitle(row.updatedByUser)}` : '',
    {
      id: 'updatedBy',
      header: printsTableContent.t(PrintsTableContentPhrases.UPDATED_BY),
      cell: (info) => {
        const user = info.row.original.updatedByUser;
        const userName = user ? generateUserTitle(user) : 'N/A';
        const searchQuery = info.table.getState().globalFilter || '';

        if (!user) return 'N/A';

        return (
          <Anchor size="sm" component={Link} href={`/users/${user.id}`}>
            {searchQuery ? <Highlight highlight={searchQuery}>{userName}</Highlight> : userName}
          </Anchor>
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
      header: printsTableContent.t(PrintsTableContentPhrases.CREATED_AT),
      cell: (info) =>
        info.getValue() && dayjs(info.row.original.createdAt).format('MMMM D, YYYY h:mm A'),
    }
  ),

  columnHelper.accessor(
    (row) =>
      row.updatedAt
        ? `${row.updatedAt.toISOString()} ${dayjs(row.updatedAt).format('MMMM D, YYYY h:mm A')}`
        : '',
    {
      id: 'updatedAt',
      header: printsTableContent.t(PrintsTableContentPhrases.UPDATED_AT),
      cell: (info) =>
        info.getValue() && dayjs(info.row.original.updatedAt).format('MMMM D, YYYY h:mm A'),
    }
  ),
];
