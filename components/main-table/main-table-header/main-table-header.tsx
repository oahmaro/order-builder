import { ReactNode } from 'react';
import { Column } from '@tanstack/react-table';
import { IconSearch, IconSettings, IconX } from '@tabler/icons-react';

import {
  ActionIcon,
  Box,
  Button,
  Group,
  Popover,
  PopoverDropdown,
  PopoverTarget,
  Stack,
  Switch,
  TextInput,
  ThemeIcon,
} from '@mantine/core';

import classes from './main-table-header.module.css';
import { mainTableHeaderContent, MainTableHeaderPhrases } from './main-table-header.content';

export interface MainTableHeaderProps<T> {
  globalFilter: string;
  columns: Array<Column<T, unknown>>;
  setGlobalFilter: (filter: string) => void;
  additionalActions?: ReactNode;
}

export default function MainTableHeader<T>({
  columns,
  globalFilter,
  setGlobalFilter,
  additionalActions,
}: MainTableHeaderProps<T>) {
  return (
    <Group>
      <TextInput
        w={300}
        size="sm"
        value={globalFilter}
        onChange={(event) => setGlobalFilter(event.currentTarget.value)}
        placeholder={mainTableHeaderContent.t(MainTableHeaderPhrases.SEARCH)}
        leftSection={
          <ThemeIcon variant="transparent" size="lg" fz={14} color="dark">
            <IconSearch size={16} />
          </ThemeIcon>
        }
        {...(globalFilter.length > 0
          ? {
              rightSection: (
                <ActionIcon
                  size="sm"
                  color="gray"
                  variant="light"
                  onClick={() => setGlobalFilter('')}
                >
                  <IconX size={16} />
                </ActionIcon>
              ),
            }
          : {})}
      />

      <Popover shadow="lg" radius="lg">
        <PopoverTarget>
          <Button
            size="sm"
            variant="white"
            className={classes.settings}
            leftSection={<IconSettings size={16} />}
          >
            {mainTableHeaderContent.t(MainTableHeaderPhrases.COLUMNS)}
          </Button>
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

      {additionalActions}

      <Box />
    </Group>
  );
}
