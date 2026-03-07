import { test } from '@/tests/e2e/index.playwright'
import MultiSelectPlayground from './MultiSelect.e2e-playground.vue'

test('MultiSelect', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  await mount(MultiSelectPlayground, {
    props: {
      appearance,
    },
  })
  await expectScreenshotClippedToContent()
})
