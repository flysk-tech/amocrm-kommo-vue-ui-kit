import path from 'path'
import { fileURLToPath } from 'url'
import { defineConfig, devices } from '@playwright/experimental-ct-vue'
import { type ReporterDescription } from '@playwright/test'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'

import { Platform } from './src/lib/platform'
import { Appearance } from './src/lib/appearance'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const DEFAULT_REPORTER: ReporterDescription[] = [
  ['list'],
  ['json', { outputFile: 'e2e-results.json' }],
]

function generateProjects() {
  const appearances = [Appearance.DEFAULT, Appearance.ALTERNATIVE]
  const projects = appearances
    .map((appearance) => [
      {
        name: `android (chromium) | ${appearance}`,
        use: {
          appearance,
          platform: Platform.ANDROID,
          ...devices['Pixel 5'],
        },
      },

      {
        name: `ios (webkit) | ${appearance}`,
        use: {
          appearance,
          platform: Platform.IOS,
          ...devices['iPhone XR'],
        },
      },

      {
        name: `web (chromium) | ${appearance}`,
        use: {
          appearance,
          platform: Platform.WEB,
          ...devices['Desktop Chrome'],
        },
      },

      {
        name: `web (firefox) | ${appearance}`,
        use: {
          appearance,
          platform: Platform.WEB,
          ...devices['Desktop Firefox'],
        },
      },

      {
        name: `web (webkit) | ${appearance}`,
        use: {
          appearance,
          platform: Platform.WEB,
          ...devices['Desktop Safari'],
        },
      },
    ])
    .flat()

  return projects
}

export default defineConfig({
  testDir: path.join(__dirname, './src'),
  testMatch: '**/*.e2e.test.ts',

  outputDir: '__diff_output__/',
  snapshotPathTemplate: '{testDir}/{testFileDir}/../__image_snapshots__/{arg}{ext}',

  /**
   * Maximum time one test can run for
   */
  timeout: 30 * 1000,

  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     */
    timeout: 5000,
  },

  /**
   * Run tests in files in parallel
   */
  fullyParallel: true,

  /**
   * Fail the build on CI if you accidentally left test.only in the source code
   */
  forbidOnly: Boolean(process.env.CI),

  /**
   * Retry on CI only
   */
  retries: process.env.CI ? 1 : 0,

  /**
   * Limit the number of failures on CI to save resources
   */
  maxFailures: process.env.CI ? 10 : undefined,

  use: {
    /**
     * Collect trace when retrying the failed test
     */
    trace: 'on-first-retry',
    deviceScaleFactor: 1,

    ctViteConfig: {
      plugins: [vue(), svgLoader()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
          '@storybook-utils': path.resolve(__dirname, '.storybook'),
        },
      },
      css: {
        modules: {
          generateScopedName: '[name]__[local]___[hash:base64:5]',
          localsConvention: 'camelCase'
        },
        preprocessorOptions: {
          scss: {
            api: 'modern-compiler',
            additionalData: `@use "@/styles/abstracts/_variables.scss" as *; @use "@/styles/abstracts/_mixins.scss" as *;`
          }
        }
      },
    },
  },

  reporter: process.env.CI
    ? DEFAULT_REPORTER
    : [['html', { open: 'never' }], ...DEFAULT_REPORTER],

  projects: generateProjects(),
})
