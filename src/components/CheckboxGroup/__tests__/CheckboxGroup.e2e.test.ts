import { test } from '@/tests/e2e/index.playwright'
import CheckboxGroupPlayground from './CheckboxGroup.e2e-playground.vue'

test('CheckboxGroup', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  await mount(CheckboxGroupPlayground, {
    props: {
      appearance,
    },
  })
  await expectScreenshotClippedToContent()
})
