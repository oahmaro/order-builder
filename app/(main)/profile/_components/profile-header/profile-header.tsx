import { Button, Group, Title, rem } from '@mantine/core';
import { PiCheckBold } from 'react-icons/pi';

interface ProfileHeaderProps {
  title: string;
  isSaveDisabled?: boolean;
  isLoading?: boolean;
}

export default function ProfileHeader({ title, isSaveDisabled, isLoading }: ProfileHeaderProps) {
  return (
    <Group w="100%" justify="space-between">
      <Title order={1} size="h2">
        {title}
      </Title>

      <Button
        size="md"
        type="submit"
        loading={isLoading}
        disabled={!isSaveDisabled}
        rightSection={<PiCheckBold style={{ width: rem(16), height: rem(16) }} />}
      >
        להציל
      </Button>
    </Group>
  );
}
