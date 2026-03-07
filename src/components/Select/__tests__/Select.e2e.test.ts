import { test } from '@/tests/e2e/index.playwright'
import SelectPlayground from './Select.e2e-playground.vue'

test('Select', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  await mount(SelectPlayground, {
    props: {
      appearance,
    },
  })
  await expectScreenshotClippedToContent()
})
