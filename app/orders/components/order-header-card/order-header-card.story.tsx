import type { Meta, StoryObj } from '@storybook/react';

import OrderHeaderCard from './order-header-card';

const meta: Meta<typeof OrderHeaderCard> = {
  title: 'OrderHeaderCard',
  tags: ['autodocs'],
  component: OrderHeaderCard,
};

export default meta;

type Story = StoryObj<typeof OrderHeaderCard>;

export const Default: Story = {
  args: {},
};
