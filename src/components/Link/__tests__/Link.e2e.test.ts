import { test } from '@/tests/e2e/index.playwright'

import LinkPlayground from './LinkPlayground.vue'

test('Link', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  await mount(LinkPlayground, { props: { appearance } })
  await expectScreenshotClippedToContent()
})
