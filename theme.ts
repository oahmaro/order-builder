'use client';

import { Select, TextInput, createTheme } from '@mantine/core';

import classes from './theme.module.css';

export const theme = createTheme({
  primaryColor: 'dark',

  components: {
    TextInput: TextInput.extend({
      classNames: {
        input: classes.input,
      },
    }),

    Select: Select.extend({
      classNames: {
        input: classes.input,
      },
    }),
  },
});
