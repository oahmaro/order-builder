import { Table } from '@tanstack/react-table';
import { Box, Group, Pagination, Select, Text } from '@mantine/core';

import classes from './main-table-pagination.module.css';
import { mainTableContent, MainTableContentPhrases } from '../main-table.content';

export interface MainTablePaginationProps<T> {
  table: Table<T>;
}

export default function MainTablePagination<T>({ table }: MainTablePaginationProps<T>) {
  return (
    <Group className={classes.root}>
      <Box>
        <Pagination
          size="sm"
          defaultValue={table.getState().pagination.pageIndex + 1}
          total={Number(table.getPageCount().toLocaleString())}
          onNextPage={table.nextPage}
          onPreviousPage={table.previousPage}
          onChange={(value) =>
            table.setPagination({
              pageIndex: value - 1,
              pageSize: table.getState().pagination.pageSize,
            })
          }
        />
      </Box>

      <Group>
        <Text size="sm" c="gray.6">
          {mainTableContent.t(MainTableContentPhrases.PAGINATION_PAGE_SIZE_DESCRIPTION)}
        </Text>

        <Select
          size="xs"
          value={String(table.getState().pagination.pageSize)}
          classNames={{ option: classes.option }}
          data={['10', '20', '50', '100']}
          w={72}
          withCheckIcon={false}
          allowDeselect={false}
          onChange={(value) => table.setPageSize?.(Number(value))}
        />
      </Group>
    </Group>
  );
}
