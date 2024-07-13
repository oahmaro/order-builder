import dayjs from 'dayjs';
import { Description } from '@prisma/client';
import { createColumnHelper } from '@tanstack/react-table';

import {
  descriptionsTableContent,
  DescriptionsTableContentPhrases,
} from './description-table.content';

type DescriptionDataType = Partial<Description>;

const columnHelper = createColumnHelper<DescriptionDataType>();

export const columns = [
  columnHelper.accessor('id', {
    header: descriptionsTableContent.t(DescriptionsTableContentPhrases.ID),
    enableHiding: false,
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor('name', {
    header: descriptionsTableContent.t(DescriptionsTableContentPhrases.NAME),
    enableHiding: true,
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor('createdAt', {
    header: descriptionsTableContent.t(DescriptionsTableContentPhrases.CREATED_AT),
    enableHiding: true,
    cell: (info) => dayjs(info.getValue()).format('MMMM D, YYYY h:mm A') || 'N/A',
  }),

  columnHelper.accessor('updatedAt', {
    header: descriptionsTableContent.t(DescriptionsTableContentPhrases.UPDATED_AT),
    enableHiding: true,
    cell: (info) => dayjs(info.getValue()).format('MMMM D, YYYY h:mm A') || 'N/A',
  }),
];
