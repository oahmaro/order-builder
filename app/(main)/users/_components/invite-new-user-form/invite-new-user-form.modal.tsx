'use client';

import { ActionIcon, Box, Button, Group, Modal } from '@mantine/core';
import { IconX } from '@tabler/icons-react';

import InviteNewUserForm from './invite-new-user-form';
import classes from './invite-new-user-form.module.css';

export interface InviteNewUserFormModalProps {
  opened: boolean;
  onClose(): void;
}

export default function InviteNewUserFormModal({ opened, onClose }: InviteNewUserFormModalProps) {
  const handleCancel = () => {
    onClose();
  };

  const handleSubmit = () => {};

  return (
    <Modal.Root opened={opened} onClose={onClose} radius="lg" size="xl" shadow="lg" centered>
      <Modal.Overlay backgroundOpacity={0.2} color="#000" />
      <Modal.Content>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Modal.Header className={classes['modal-header']}>
            <Modal.Title fz={16} fw="bold">
              הזמן משתמש חדש
            </Modal.Title>

            <ActionIcon variant="white" c="gray.6" size="md" className={classes['close-button']}>
              <IconX size={16} />
            </ActionIcon>
          </Modal.Header>

          <Modal.Body p={32}>
            <InviteNewUserForm />
          </Modal.Body>

          <Group className={classes['modal-footer']}>
            <Button className={classes['cancel-button']} variant="white" onClick={handleCancel}>
              Cancel
            </Button>

            <Button type="submit">Invite user</Button>
          </Group>
        </Box>
      </Modal.Content>
    </Modal.Root>
  );
}
