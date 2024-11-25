import { Button, Group } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

interface NothingFoundButtonProps {
  label: string;
  onClick: () => void;
}

export default function NothingFoundButton({ label, onClick }: NothingFoundButtonProps) {
  return (
    <Button
      c="dark"
      color="gray"
      w="100%"
      size="xs"
      variant="subtle"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
    >
      <Group gap={8}>
        <IconPlus size={14} stroke={1.5} />
        <span>{label}</span>
      </Group>
    </Button>
  );
}
