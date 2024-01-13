import { Stack } from '@mantine/core';
import { ChangePasswordCard, ProfileCard, ProfileHeader } from './components';

export default function ProfilePage() {
  return (
    <Stack component="form" gap={40}>
      <ProfileHeader />

      <Stack>
        <ProfileCard />
        <ChangePasswordCard />
      </Stack>
    </Stack>
  );
}
