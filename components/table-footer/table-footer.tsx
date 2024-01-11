'use client';

import { forwardRef } from 'react';
import { Group, Pagination, Select, Text } from '@mantine/core';
import classes from './table-footer.module.css';

export interface TableFooterProps {}

const TableFooter = forwardRef<HTMLDivElement, TableFooterProps>((props, ref) => (
  <div ref={ref} className={classes.root}>
    <Pagination total={1} value={1} onChange={() => {}} />

    <Group>
      <Text c="dimmed" fz="sm">
        ערכים לדף
      </Text>
      <Select
        data={['10', '20', '50', '100']}
        defaultValue="10"
        allowDeselect={false}
        withCheckIcon={false}
        w={80}
      />
    </Group>
  </div>
));

TableFooter.displayName = 'TableFooter';

export default TableFooter;
