import { test } from '@/tests/e2e/index.playwright'
import RadioGroupPlayground from './RadioGroup.e2e-playground.vue'

test('RadioGroup', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  await mount(RadioGroupPlayground, {
    props: {
      appearance,
    },
  })
  await expectScreenshotClippedToContent()
})
