import dayjs from 'dayjs';
import Link from 'next/link';
import { Description } from '@prisma/client';
import { Anchor, Highlight } from '@mantine/core';
import { createColumnHelper } from '@tanstack/react-table';

import {
  descriptionsTableContent,
  DescriptionsTableContentPhrases,
} from './description-table.content';
import { generateUserTitle } from '@/utils/get-user-title';

type DescriptionDataType = Partial<Description> & {
  createdByUser?: { id: number; firstName: string; lastName: string } | null;
  updatedByUser?: { id: number; firstName: string; lastName: string } | null;
};

const columnHelper = createColumnHelper<DescriptionDataType>();

export const columns = [
  columnHelper.accessor('id', {
    header: descriptionsTableContent.t(DescriptionsTableContentPhrases.ID),
    cell: (info) => {
      const descriptionId = String(info.getValue());
      const searchQuery = info.table.getState().globalFilter || '';

      return searchQuery ? (
        <Highlight highlight={searchQuery}>{descriptionId}</Highlight>
      ) : (
        descriptionId
      );
    },
  }),

  columnHelper.accessor('name', {
    id: 'name',
    header: descriptionsTableContent.t(DescriptionsTableContentPhrases.NAME),
    sortingFn: (rowA, rowB) => (rowA.original.name ?? '').localeCompare(rowB.original.name ?? ''),
    cell: (info) => {
      const name = info.getValue() || '';
      const searchQuery = info.table.getState().globalFilter || '';

      return (
        <Anchor size="sm" component={Link} href={`/descriptions/${info.row.original.id}`}>
          {searchQuery ? <Highlight highlight={searchQuery}>{name}</Highlight> : name}
        </Anchor>
      );
    },
  }),

  columnHelper.accessor('createdByUser', {
    header: descriptionsTableContent.t(DescriptionsTableContentPhrases.CREATED_BY),
    cell: (info) => {
      const user = info.getValue();
      const searchQuery = info.table.getState().globalFilter || '';

      if (!user) return 'N/A';

      const userTitle = generateUserTitle(user);

      return (
        <Anchor size="sm" component={Link} href={`/users/${user.id}`}>
          {searchQuery ? <Highlight highlight={searchQuery}>{userTitle}</Highlight> : userTitle}
        </Anchor>
      );
    },
  }),

  columnHelper.accessor('updatedByUser', {
    header: descriptionsTableContent.t(DescriptionsTableContentPhrases.UPDATED_BY),
    cell: (info) => {
      const user = info.getValue();
      const searchQuery = info.table.getState().globalFilter || '';

      if (!user) return 'N/A';

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
      header: descriptionsTableContent.t(DescriptionsTableContentPhrases.CREATED_AT),
      cell: (info) =>
        info.row.original.createdAt &&
        dayjs(info.row.original.createdAt).format('MMMM D, YYYY h:mm A'),
    }
  ),

  columnHelper.accessor(
    (row) =>
      row.updatedAt
        ? `${row.updatedAt.toISOString()} ${dayjs(row.updatedAt).format('MMMM D, YYYY h:mm A')}`
        : '',
    {
      id: 'updatedAt',
      header: descriptionsTableContent.t(DescriptionsTableContentPhrases.UPDATED_AT),
      cell: (info) =>
        info.row.original.updatedAt &&
        dayjs(info.row.original.updatedAt).format('MMMM D, YYYY h:mm A'),
    }
  ),
];
