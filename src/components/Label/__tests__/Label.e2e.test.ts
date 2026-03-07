import { test } from '@/tests/e2e/index.playwright'

import LabelPlayground from './LabelPlayground.vue'

test('Label', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  await mount(LabelPlayground, { props: { appearance } })
  await expectScreenshotClippedToContent()
})
