'use client';

import { ReactNode } from 'react';
import { Paper, Table } from '@mantine/core';

import classes from './custom-table.module.css';

export interface TableColumn<T> {
  header: string;
  sortable?: boolean;
  render(data: T): ReactNode;
}

export interface CustomTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
}

export default function CustomTable<T>({ data, columns }: CustomTableProps<T>) {
  return (
    <Paper className={classes.card}>
      <Table.ScrollContainer minWidth={500}>
        <Table striped highlightOnHover stickyHeader>
          <Table.Thead h={56}>
            <Table.Tr>
              {columns.map((column, columnIndex) => (
                <Table.Th key={columnIndex}>{column.header}</Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>
            {data.map((rowData, rowIndex) => (
              <Table.Tr key={rowIndex}>
                {columns.map((column, columnIndex) => (
                  <Table.Td key={columnIndex}>{column.render(rowData)}</Table.Td>
                ))}
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </Paper>
  );
}
