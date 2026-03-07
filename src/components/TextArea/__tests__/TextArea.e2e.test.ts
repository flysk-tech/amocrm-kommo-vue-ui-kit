import { test } from '@/tests/e2e/index.playwright'

import TextAreaLightPlayground from './TextAreaLightPlayground.vue'
import TextAreaDarkPlayground from './TextAreaDarkPlayground.vue'

test('TextArea Light', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  await mount(TextAreaLightPlayground, { props: { appearance } })
  await expectScreenshotClippedToContent()
})

test('TextArea Dark', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  await mount(TextAreaDarkPlayground, { props: { appearance } })
  await expectScreenshotClippedToContent()
})
