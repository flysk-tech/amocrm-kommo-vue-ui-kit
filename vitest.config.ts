import { defineConfig } from 'vitest/config'
import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'

export default defineConfig({
  plugins: [vue(), svgLoader()],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/__tests__/**/*.test.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: ['src/**/*.e2e.test.{js,ts}', 'node_modules/**', 'dist/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/**/*.stories.{js,ts}',
        'src/**/*.d.ts',
        'src/**/*.e2e.test.{js,ts}',
        'src/**/*.e2e-playground.{js,ts,vue}',
        'dist/',
        'playground/',
        'docs/',
        '.storybook/',
        'storybook-static/',
        'playwright/',
        'playwright-report/'
      ]
    },
    setupFiles: ['./tests/setup.ts']
  },

  css: {
    modules: {
      classNameStrategy: 'non-scoped'
    }
  }
})