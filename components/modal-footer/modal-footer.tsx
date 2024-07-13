import { Button, Group } from '@mantine/core';
import { modals } from '@mantine/modals';

import classes from './modal-footer.module.css';

export interface ModalFooterProps {
  cancelLabel?: string;
  submitLabel?: string;
  onSubmit?(): void;
  onCancel?(): void;
}

export default function ModalFooter({
  submitLabel = 'Create',
  cancelLabel = 'Cancel',
  onSubmit,
  onCancel,
}: ModalFooterProps) {
  return (
    <Group className={classes.root}>
      <Button
        className={classes.cancelButton}
        variant="white"
        onClick={() => {
          modals.closeAll();
          onCancel?.();
        }}
      >
        {cancelLabel}
      </Button>

      <Button type="submit" onClick={onSubmit}>
        {submitLabel}
      </Button>
    </Group>
  );
}
