import type { Meta, StoryObj } from '@storybook/svelte';
import Counter from './Counter.svelte';

const meta = {
  title: 'Example/Counter',
  component: Counter,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A simple counter component demonstrating basic Svelte reactivity and event handling.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<Counter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default counter starting at 0. Click to increment the value.',
      },
    },
  },
};