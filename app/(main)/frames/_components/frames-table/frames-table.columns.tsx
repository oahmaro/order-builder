import dayjs from 'dayjs';
import Link from 'next/link';
import { Frame } from '@prisma/client';
import { Anchor } from '@mantine/core';
import { createColumnHelper } from '@tanstack/react-table';

import { generateUserTitle } from '@/utils/get-user-title';
import { framesTableContent, FramesTableContentPhrases } from './frames-table.content';

type FrameDataType = Partial<Frame> & {
  createdByUser?: { id: number; firstName: string; lastName: string } | null;
  updatedByUser?: { id: number; firstName: string; lastName: string } | null;
};

const columnHelper = createColumnHelper<FrameDataType>();

export const columns = [
  columnHelper.accessor('id', {
    header: framesTableContent.t(FramesTableContentPhrases.ID),

    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor('name', {
    header: framesTableContent.t(FramesTableContentPhrases.NAME),
    cell: (info) => (
      <Anchor size="sm" component={Link} href={`/frames/${info.row.original.id}`}>
        {info.getValue()}
      </Anchor>
    ),
  }),

  columnHelper.accessor('createdByUser', {
    header: framesTableContent.t(FramesTableContentPhrases.CREATED_BY),
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

  columnHelper.accessor('createdAt', {
    header: framesTableContent.t(FramesTableContentPhrases.CREATED_AT),
    cell: (info) => info.getValue() && dayjs(info.getValue()).format('MMMM D, YYYY h:mm A'),
  }),

  columnHelper.accessor('updatedByUser', {
    header: framesTableContent.t(FramesTableContentPhrases.UPDATED_BY),
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
    header: framesTableContent.t(FramesTableContentPhrases.UPDATED_AT),
    cell: (info) => info.getValue() && dayjs(info.getValue()).format('MMMM D, YYYY h:mm A'),
  }),
];
