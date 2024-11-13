import dayjs from 'dayjs';
import Link from 'next/link';
import { Frame } from '@prisma/client';
import { createColumnHelper } from '@tanstack/react-table';

import { framesTableContent, FramesTableContentPhrases } from './frames-table.content';
import { generateUserTitle } from '@/utils/get-user-title';

type FrameDataType = Partial<Frame> & {
  createdByUser?: { id: number; firstName: string; lastName: string } | null;
  updatedByUser?: { id: number; firstName: string; lastName: string } | null;
};

const columnHelper = createColumnHelper<FrameDataType>();

export const columns = [
  columnHelper.accessor('id', {
    header: framesTableContent.t(FramesTableContentPhrases.ID),
    enableHiding: false,
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor('name', {
    header: framesTableContent.t(FramesTableContentPhrases.NAME),
    enableHiding: true,
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor('createdByUser', {
    header: framesTableContent.t(FramesTableContentPhrases.CREATED_BY),
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
    header: framesTableContent.t(FramesTableContentPhrases.CREATED_AT),
    enableHiding: true,
    cell: (info) => info.getValue() && dayjs(info.getValue()).format('MMMM D, YYYY h:mm A'),
  }),

  columnHelper.accessor('updatedByUser', {
    header: framesTableContent.t(FramesTableContentPhrases.UPDATED_BY),
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
    header: framesTableContent.t(FramesTableContentPhrases.UPDATED_AT),
    enableHiding: true,
    cell: (info) => info.getValue() && dayjs(info.getValue()).format('MMMM D, YYYY h:mm A'),
  }),
];
