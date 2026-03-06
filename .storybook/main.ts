import type { StorybookConfig } from '@storybook/vue3-vite';
import { resolve } from 'path';

const config: StorybookConfig = {
  "stories": [
    "../stories/**/*.mdx",
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-docs",
    "./addons/themes/register.js"
  ],
  "framework": {
    "name": "@storybook/vue3-vite",
    "options": {}
  },
  typescript: {
    check: false,
  },
  async viteFinal(config) {
    if (config.css?.preprocessorOptions?.scss) {
      config.css.preprocessorOptions.scss.api = 'modern-compiler'
    }

    // Добавляем алиас для @storybook-utils
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '@storybook-utils': resolve(__dirname, './'),
    };

    return config
  }
};
export default config;