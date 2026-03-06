import { test } from '@/tests/e2e/index.playwright'

import SpinnerPlayground from './SpinnerPlayground.vue'

test('Spinner', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  await mount(SpinnerPlayground, { props: { appearance } })
  await expectScreenshotClippedToContent()
})
