import type { Meta, StoryObj } from '@storybook/svelte';
import WheelBuilder from './WheelBuilder.svelte';

const meta = {
  title: 'Components/WheelBuilder',
  component: WheelBuilder,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Professional bicycle wheel spoke length calculator component. Calculates required spoke length based on rim diameter, spoke count, cross pattern, and hub flange diameter using the standard wheel building formula.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<WheelBuilder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default configuration with standard 700C wheel specifications (622mm rim, 32 spokes, 3-cross pattern, 60mm hub flange).',
      },
    },
  },
};

export const Road700C: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Typical road bike wheel configuration - 700C rim with high spoke count for durability.',
      },
    },
  },
};

export const Mountain26Inch: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Classic 26-inch mountain bike wheel configuration with robust spoke pattern.',
      },
    },
  },
};

export const RadialPattern: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Radial (0-cross) spoke pattern - commonly used for front wheels or lightweight applications.',
      },
    },
  },
};

export const HighCrossPattern: Story = {
  parameters: {
    docs: {
      description: {
        story: '4-cross pattern for maximum strength - typically used for heavy-duty applications like cargo bikes.',
      },
    },
  },
};

export const LowSpokeCount: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Low spoke count configuration (20 spokes) - common in aerodynamic or lightweight wheel builds.',
      },
    },
  },
};