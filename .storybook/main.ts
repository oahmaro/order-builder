import type { StorybookConfig } from '@storybook/nextjs';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../components/**/*.(stories|story).@(js|jsx|ts|tsx)'],

  addons: [
    '@storybook/addon-essentials',
    'storybook-dark-mode',
    '@storybook/addon-styling-webpack',
  ],

  webpackFinal: async (config) => {
    config.resolve = config.resolve || {};

    config.resolve.plugins = [
      ...(config.resolve.plugins || []),
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, '../tsconfig.json'),
      }),
    ];
    return config;
  },

  framework: {
    name: '@storybook/nextjs',
    options: {},
  },

  docs: {
    autodocs: true,
  },
};

export default config;
