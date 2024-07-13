import { Column } from '@tanstack/react-table';
import {
  ActionIcon,
  Box,
  Group,
  Popover,
  PopoverDropdown,
  PopoverTarget,
  Stack,
  Switch,
} from '@mantine/core';
import { IconSettings } from '@tabler/icons-react';

import classes from './main-table-header.module.css';

export interface MainTableHeaderProps<T> {
  columns: Array<Column<T, unknown>>;
}

export default function MainTableHeader<T>({ columns }: MainTableHeaderProps<T>) {
  return (
    <Group className={classes.root}>
      <Popover>
        <PopoverTarget>
          <ActionIcon className={classes.settings} size="lg" variant="white">
            <IconSettings size={16} />
          </ActionIcon>
        </PopoverTarget>

        <PopoverDropdown>
          <Stack gap={0}>
            {columns.map((column) => (
              <Switch
                key={column.id}
                disabled={!column.getCanHide()}
                checked={column.getIsVisible()}
                onChange={column.getToggleVisibilityHandler()}
                labelPosition="left"
                size="xs"
                label={column.columnDef.header as string}
                classNames={{
                  root: classes.switchRoot,
                  body: classes.switchBody,
                  label: classes.switchLabel,
                  track: classes.switchTrack,
                }}
              />
            ))}
          </Stack>
        </PopoverDropdown>
      </Popover>

      <Box />
    </Group>
  );
}
