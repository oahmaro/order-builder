import type { Meta, StoryObj } from '@storybook/react';

import OrderItemCard from './order-item-card';

const meta: Meta<typeof OrderItemCard> = {
  title: 'OrderItemCard',
  tags: ['autodocs'],
  component: OrderItemCard,
};

export default meta;

type Story = StoryObj<typeof OrderItemCard>;

export const Default: Story = {
  args: {},
};
