import type { Meta, StoryObj } from '@storybook/react';

import PageHeader from './page-header';

const meta: Meta<typeof PageHeader> = {
  title: 'PageHeader',
  tags: ['autodocs'],
  component: PageHeader,
};

export default meta;

type Story = StoryObj<typeof PageHeader>;

export const Default: Story = {
  args: {},
};
