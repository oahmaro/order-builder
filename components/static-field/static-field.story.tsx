import type { Meta, StoryObj } from '@storybook/react';

import StaticField from './static-field';

const meta: Meta<typeof StaticField> = {
  title: 'StaticField',
  tags: ['autodocs'],
  component: StaticField,
};

export default meta;

type Story = StoryObj<typeof StaticField>;

export const Default: Story = {
  args: {},
};
