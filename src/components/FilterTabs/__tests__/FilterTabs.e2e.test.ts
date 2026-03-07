import { test } from '@/tests/e2e/index.playwright'
import FilterTabsPlayground from './FilterTabs.e2e-playground.vue'

test('FilterTabs', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  await mount(FilterTabsPlayground, {
    props: {
      appearance,
    },
  })
  await expectScreenshotClippedToContent()
})
