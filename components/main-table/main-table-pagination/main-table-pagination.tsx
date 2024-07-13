import { Box, Group, Pagination, Select, Text } from '@mantine/core';

import classes from './main-table-pagination.module.css';
import { mainTableContent, MainTableContentPhrases } from '../main-table.content';

export interface MainTablePaginationProps {
  page: number;
  total: number;
  pageSize: number;
  onPageSizeChange?: (pageSize: number) => void;
}

export default function MainTablePagination({
  page,
  total,
  pageSize,
  onPageSizeChange,
}: MainTablePaginationProps) {
  return (
    <Group className={classes.root}>
      <Box>
        <Pagination defaultValue={page} total={total} />
      </Box>

      <Group>
        <Text size="sm" c="gray.6">
          {mainTableContent.t(MainTableContentPhrases.PAGINATION_PAGE_SIZE_DESCRIPTION)}
        </Text>

        <Select
          value={String(pageSize)}
          classNames={{ option: classes.option }}
          data={['10', '20', '50', '100']}
          w={72}
          withCheckIcon={false}
          allowDeselect={false}
          onChange={(value) => onPageSizeChange?.(Number(value))}
        />
      </Group>
    </Group>
  );
}
