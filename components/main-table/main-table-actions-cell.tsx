import { ReactNode } from 'react';
import { Menu, ActionIcon } from '@mantine/core';
import { IconDotsVertical } from '@tabler/icons-react';

interface TableAction<T> {
  label: string;
  color?: string;
  icon?: ReactNode;
  onClick: (row: T) => void;
  show?: (row: T) => boolean;
}

interface MainTableActionsCellProps<T> {
  row: T;
  actions: TableAction<T>[];
}

export function MainTableActionsCell<T>({ row, actions }: MainTableActionsCellProps<T>) {
  const visibleActions = actions.filter((action) => !action.show || action.show(row));

  return (
    <Menu position="bottom-end" withinPortal>
      <Menu.Target>
        <ActionIcon variant="subtle" color="gray">
          <IconDotsVertical size={16} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        {visibleActions.map((action, index) => (
          <Menu.Item
            key={index}
            onClick={() => action.onClick(row)}
            color={action.color}
            leftSection={action.icon}
          >
            {action.label}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
