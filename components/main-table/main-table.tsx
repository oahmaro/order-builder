'use client';

import { useState, ReactNode } from 'react';
import { Box, Paper, Stack, Table, TableProps } from '@mantine/core';
import { RankingInfo, rankItem } from '@tanstack/match-sorter-utils';

import {
  ColumnDef,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from '@tanstack/react-table';

import classes from './main-table.module.css';
import { MainTableHeader } from './main-table-header';
import { MainTablePagination } from './main-table-pagination';
import { MainTableEmptyState } from './main-table-empty-state';
import { mainTableContent, MainTableContentPhrases } from './main-table.content';

declare module '@tanstack/react-table' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

interface Identifiable {
  id?: number;
}

export interface MainTableProps<T extends Identifiable> extends Omit<TableProps, 'data'> {
  data: T[];
  columns: ColumnDef<T, any>[];

  initialColumnsVisibility?: Record<string, boolean>;
  headerActions?: ReactNode;
}

export default function MainTable<T extends Identifiable>({
  data = [],
  columns = [],
  initialColumnsVisibility = { id: false, createdAt: false, updatedAt: false },
  headerActions,
  ...tableProps
}: MainTableProps<T>) {
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnVisibility, setColumnVisibility] = useState(initialColumnsVisibility);
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });

  const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    // Get the raw value
    const rawValue = row.getValue(columnId);

    // Special handling for order ID column
    if (columnId === 'id' && typeof value === 'string') {
      // Remove "ORD-" prefix from search value if present
      const searchValue = value.replace(/^ORD-/i, '');
      // Remove "ORD-" prefix from cell value if present
      const cellValue = String(rawValue).replace(/^ORD-/i, '');

      const itemRank = rankItem(cellValue, searchValue);
      addMeta({ itemRank });
      return itemRank.passed;
    }

    // Default fuzzy matching for other columns
    const itemRank = rankItem(rawValue, value);
    addMeta({ itemRank });
    return itemRank.passed;
  };

  const table = useReactTable({
    data,
    columns,
    globalFilterFn: 'fuzzy',
    filterFns: { fuzzy: fuzzyFilter },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    getPaginationRowModel: getPaginationRowModel(),
    state: { globalFilter, columnVisibility, pagination },
  });

  const hasData = data?.length !== 0;
  const hasFilteredData = table.getRowModel().rows.length > 0;
  const shouldShowHeader = hasData || globalFilter || headerActions;

  return (
    <Stack gap="xs">
      {shouldShowHeader && (
        <MainTableHeader
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          columns={table.getAllLeafColumns()}
          additionalActions={headerActions}
        />
      )}

      <Paper className={classes.card}>
        {hasFilteredData ? (
          <Table className={classes.table} striped highlightOnHover {...tableProps}>
            <Table.Thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <Table.Tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <Table.Th key={header.id} className={classes.th}>
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
                <Table.Tr key={row.id}>
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

      {hasFilteredData && <MainTablePagination<T> table={table} />}
    </Stack>
  );
}
