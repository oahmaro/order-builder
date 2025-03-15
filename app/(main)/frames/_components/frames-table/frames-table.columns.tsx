import dayjs from 'dayjs';
import Link from 'next/link';
import { Frame } from '@prisma/client';
import { Anchor, Highlight } from '@mantine/core';
import { createColumnHelper } from '@tanstack/react-table';

import { generateUserTitle } from '@/utils/get-user-title';
import { framesTableContent, FramesTableContentPhrases } from './frames-table.content';

type FrameDataType = Partial<Frame> & {
  createdByUser?: { id: number; firstName: string; lastName: string } | null;
  updatedByUser?: { id: number; firstName: string; lastName: string } | null;
};

const columnHelper = createColumnHelper<FrameDataType>();

export const columns = [
  columnHelper.accessor((row) => String(row.id), {
    id: 'id',
    header: framesTableContent.t(FramesTableContentPhrases.ID),
    cell: (info) => {
      const frameId = info.getValue();
      const searchQuery = info.table.getState().globalFilter || '';

      return searchQuery ? <Highlight highlight={searchQuery}>{frameId}</Highlight> : frameId;
    },
  }),

  columnHelper.accessor('name', {
    id: 'name',
    header: framesTableContent.t(FramesTableContentPhrases.NAME),
    sortingFn: (rowA, rowB) => (rowA.original.name ?? '').localeCompare(rowB.original.name ?? ''),
    cell: (info) => {
      const frameName = info.getValue() || '';
      const searchQuery = info.table.getState().globalFilter || '';

      return (
        <Anchor size="sm" component={Link} href={`/frames/${info.row.original.id}`}>
          {searchQuery ? <Highlight highlight={searchQuery}>{frameName}</Highlight> : frameName}
        </Anchor>
      );
    },
  }),

  columnHelper.accessor(
    (row) =>
      row.createdByUser ? `${row.createdByUser.id} ${generateUserTitle(row.createdByUser)}` : '',
    {
      id: 'createdBy',
      header: framesTableContent.t(FramesTableContentPhrases.CREATED_BY),
      cell: (info) => {
        const user = info.row.original.createdByUser;
        const userTitle = user ? generateUserTitle(user) : 'N/A';
        const searchQuery = info.table.getState().globalFilter || '';

        return user ? (
          <Anchor size="sm" component={Link} href={`/users/${user.id}`}>
            {searchQuery ? <Highlight highlight={searchQuery}>{userTitle}</Highlight> : userTitle}
          </Anchor>
        ) : (
          'N/A'
        );
      },
    }
  ),

  columnHelper.accessor(
    (row) =>
      row.updatedByUser ? `${row.updatedByUser.id} ${generateUserTitle(row.updatedByUser)}` : '',
    {
      id: 'updatedBy',
      header: framesTableContent.t(FramesTableContentPhrases.UPDATED_BY),
      cell: (info) => {
        const user = info.row.original.updatedByUser;
        const userTitle = user ? generateUserTitle(user) : 'N/A';
        const searchQuery = info.table.getState().globalFilter || '';

        return user ? (
          <Link href={`/users/${user.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            {searchQuery ? <Highlight highlight={searchQuery}>{userTitle}</Highlight> : userTitle}
          </Link>
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
      header: framesTableContent.t(FramesTableContentPhrases.CREATED_AT),
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
      header: framesTableContent.t(FramesTableContentPhrases.UPDATED_AT),
      cell: (info) =>
        info.getValue() && dayjs(info.row.original.updatedAt).format('MMMM D, YYYY h:mm A'),
    }
  ),
];
