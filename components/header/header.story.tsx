import type { Meta, StoryObj } from '@storybook/react';

import Header from './header';

const meta: Meta<typeof Header> = {
  title: 'Header',
  tags: ['autodocs'],
  component: Header,
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {},
};
