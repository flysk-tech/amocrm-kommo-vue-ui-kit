import { test } from '@/tests/e2e/index.playwright'

import CheckboxLightPlayground from './CheckboxLightPlayground.vue'
import CheckboxSmallLightPlayground from './CheckboxSmallLightPlayground.vue'
import CheckboxDarkPlayground from './CheckboxDarkPlayground.vue'
import CheckboxSmallDarkPlayground from './CheckboxSmallDarkPlayground.vue'

test('Checkbox Light', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  await mount(CheckboxLightPlayground, { props: { appearance } })
  await expectScreenshotClippedToContent()
})

test('Checkbox Small Light', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  await mount(CheckboxSmallLightPlayground, { props: { appearance } })
  await expectScreenshotClippedToContent()
})

test('Checkbox Dark', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  await mount(CheckboxDarkPlayground, { props: { appearance } })
  await expectScreenshotClippedToContent()
})

test('Checkbox Small Dark', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  await mount(CheckboxSmallDarkPlayground, { props: { appearance } })
  await expectScreenshotClippedToContent()
})
