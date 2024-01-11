import type { Meta, StoryObj } from '@storybook/react';

import TableFooter from './table-footer';

const meta: Meta<typeof TableFooter> = {
  title: 'TableFooter',
  tags: ['autodocs'],
  component: TableFooter,
};

export default meta;

type Story = StoryObj<typeof TableFooter>;

export const Default: Story = {
  args: {},
};
