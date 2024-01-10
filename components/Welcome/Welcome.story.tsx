import type { Meta, StoryObj } from '@storybook/react';

import { Welcome } from './welcome';

const meta: Meta<typeof Welcome> = {
  title: 'Welcome',
  tags: ['autodocs'],
  component: Welcome,
};

export default meta;

type Story = StoryObj<typeof Welcome>;

export const Default: Story = {
  args: {},
};
