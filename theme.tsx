'use client';

import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  ScrollArea,
  Select,
  TextInput,
  createTheme,
} from '@mantine/core';

import classes from './theme.module.css';

export const theme = createTheme({
  primaryColor: 'dark',

  components: {
    ModalContent: ModalContent.extend({ defaultProps: { pos: 'relative' } }),
    ModalCloseButton: ModalCloseButton.extend({
      defaultProps: { size: 'md' },
    }),
    ModalOverlay: ModalOverlay.extend({ defaultProps: { backgroundOpacity: 0.3, color: '#000' } }),
    Modal: Modal.extend({
      defaultProps: {
        size: 'xl',
        shadow: 'lg',
        radius: 'lg',
        scrollAreaComponent: ScrollArea.Autosize,
        transitionProps: { transition: 'pop' },
      },
      classNames: {
        header: classes.modalHeader,
        title: classes.modalTitle,
        close: classes.modalClose,
        body: classes.modalBody,
      },
    }),
    TextInput: TextInput.extend({
      classNames: {
        input: classes.input,
      },
    }),

    Select: Select.extend({
      defaultProps: {
        comboboxProps: {
          shadow: 'xs',
        },
      },
      classNames: {
        input: classes.input,
      },
    }),
  },
});
