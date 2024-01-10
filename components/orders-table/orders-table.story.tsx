import type { Meta, StoryObj } from '@storybook/react';

import OrdersTable from './orders-table';

const meta: Meta<typeof OrdersTable> = {
  title: 'OrdersTable',
  tags: ['autodocs'],
  component: OrdersTable,
};

export default meta;

type Story = StoryObj<typeof OrdersTable>;

export const Default: Story = {
  args: {},
};
