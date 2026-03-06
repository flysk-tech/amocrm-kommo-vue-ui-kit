import { test } from '@/tests/e2e/index.playwright'

import TextPlayground from './TextPlayground.vue'
import TextPrimaryPlayground from './TextPrimaryPlayground.vue'
import TextSecondaryDarkPlayground from './TextSecondaryDarkPlayground.vue'
import TextSecondaryLightPlayground from './TextSecondaryLightPlayground.vue'
import TextErrorPlayground from './TextErrorPlayground.vue'

test('Text', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  await mount(TextPlayground, { props: { appearance } })
  await expectScreenshotClippedToContent()
})

test('Text Primary', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  await mount(TextPrimaryPlayground, { props: { appearance } })
  await expectScreenshotClippedToContent()
})

test('Text Secondary Dark', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  await mount(TextSecondaryDarkPlayground, { props: { appearance } })
  await expectScreenshotClippedToContent()
})

test('Text Secondary Light', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  await mount(TextSecondaryLightPlayground, { props: { appearance } })
  await expectScreenshotClippedToContent()
})

test('Text Error', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  await mount(TextErrorPlayground, { props: { appearance } })
  await expectScreenshotClippedToContent()
})
