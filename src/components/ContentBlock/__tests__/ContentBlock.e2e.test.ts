import { test } from '@/tests/e2e/index.playwright'

import ContentBlockPlayground from './ContentBlockPlayground.vue'

test('ContentBlock', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  await mount(ContentBlockPlayground, { props: { appearance } })
  await expectScreenshotClippedToContent()
})
