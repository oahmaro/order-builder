import dayjs from 'dayjs';
import Link from 'next/link';
import { Anchor } from '@mantine/core';
import { Description } from '@prisma/client';
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
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor('name', {
    id: 'name',
    header: descriptionsTableContent.t(DescriptionsTableContentPhrases.NAME),
    sortingFn: (rowA, rowB) => (rowA.original.name ?? '').localeCompare(rowB.original.name ?? ''),
    cell: (info) => (
      <Anchor size="sm" component={Link} href={`/descriptions/${info.row.original.id}`}>
        {info.getValue()}
      </Anchor>
    ),
  }),

  columnHelper.accessor('createdByUser', {
    header: descriptionsTableContent.t(DescriptionsTableContentPhrases.CREATED_BY),
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

  columnHelper.accessor('updatedByUser', {
    header: descriptionsTableContent.t(DescriptionsTableContentPhrases.UPDATED_BY),
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
