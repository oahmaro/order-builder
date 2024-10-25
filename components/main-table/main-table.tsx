'use client';

import { Box, Paper, Stack, Table, TableProps } from '@mantine/core';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from '@tanstack/react-table';
import { useCallback, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import classes from './main-table.module.css';
import { MainTablePagination } from './main-table-pagination';
import { MainTableHeader } from './main-table-header';
import { MainTableEmptyState } from './main-table-empty-state';
import { mainTableContent, MainTableContentPhrases } from './main-table.content';

interface Identifiable {
  id?: number;
}

export interface MainTableProps<T extends Identifiable> extends Omit<TableProps, 'data'> {
  data: T[];
  columns: ColumnDef<T, any>[];
  initialColumnsVisibility?: Record<string, boolean>;
  navigateOnRowClick?: boolean;
}

export default function MainTable<T extends Identifiable>({
  data = [],
  columns = [],
  initialColumnsVisibility = { createdAt: false, updatedAt: false },
  navigateOnRowClick,
  ...tableProps
}: MainTableProps<T>) {
  const router = useRouter();
  const pathname = usePathname();
  const [columnVisibility, setColumnVisibility] = useState(initialColumnsVisibility);
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });

  const table = useReactTable({
    data,
    columns,
    state: { columnVisibility, pagination },
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
  });

  const hasData = data?.length !== 0;

  const handleNavigation = useCallback(
    (segment: string) => {
      const newPath = `${pathname}/${segment}`;
      router.push(newPath);
    },
    [router, pathname]
  );

  return (
    <Stack gap="xs">
      {hasData && <MainTableHeader columns={table.getAllLeafColumns()} />}

      <Paper className={classes.card}>
        {hasData ? (
          <Table className={classes.table} striped highlightOnHover {...tableProps}>
            <Table.Thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <Table.Tr key={headerGroup.id} className={classes.tr}>
                  {headerGroup.headers.map((header) => (
                    <Table.Th
                      key={header.id}
                      className={classes.th}
                      mod={{ select: !header.column.getCanSort() }}
                    >
                      <Box>
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </Box>
                    </Table.Th>
                  ))}
                </Table.Tr>
              ))}
            </Table.Thead>

            <Table.Tbody>
              {table.getRowModel().rows.map((row) => (
                <Table.Tr
                  key={row.id}
                  className={classes.tr}
                  mod={{ selected: row.getIsSelected(), clickable: navigateOnRowClick }}
                  {...(navigateOnRowClick
                    ? { onClick: () => handleNavigation(`/${row.original.id}`) }
                    : {})}
                >
                  {row.getVisibleCells().map((cell) => (
                    <Table.Td key={cell.id}>
                      {cell.getValue()
                        ? flexRender(cell.column.columnDef.cell, cell.getContext())
                        : '-'}
                    </Table.Td>
                  ))}
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        ) : (
          <MainTableEmptyState
            title={mainTableContent.t(MainTableContentPhrases.EMPTY_STATE_TITLE)}
            description={mainTableContent.t(MainTableContentPhrases.EMPTY_STATE_DESCRIPTION)}
          />
        )}
      </Paper>

      {hasData && <MainTablePagination<T> table={table} />}
    </Stack>
  );
}
