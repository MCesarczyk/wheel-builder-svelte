import type { Preview } from '@storybook/svelte';
import '../src/app.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#f1f5f9',
        },
        {
          name: 'dark',
          value: '#1e293b',
        },
        {
          name: 'white',
          value: '#ffffff',
        },
      ],
    },
  },
};

export default preview;