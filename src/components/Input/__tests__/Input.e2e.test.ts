import { test } from '@/tests/e2e/index.playwright'

import InputLightPlayground from './InputLightPlayground.vue'
import InputDarkPlayground from './InputDarkPlayground.vue'

test('Input Light', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  await mount(InputLightPlayground, { props: { appearance } })
  await expectScreenshotClippedToContent()
})

test('Input Dark', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  await mount(InputDarkPlayground, { props: { appearance } })
  await expectScreenshotClippedToContent()
})
