import { test } from '@/tests/e2e/index.playwright'

import CalloutWarningPlayground from './CalloutWarningPlayground.vue'
import CalloutSuccessPlayground from './CalloutSuccessPlayground.vue'
import CalloutInfoPlayground from './CalloutInfoPlayground.vue'
import CalloutErrorPlayground from './CalloutErrorPlayground.vue'

test('CalloutWarning', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  await mount(CalloutWarningPlayground, { props: { appearance } })
  await expectScreenshotClippedToContent()
})

test('CalloutSuccess', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  await mount(CalloutSuccessPlayground, { props: { appearance } })
  await expectScreenshotClippedToContent()
})

test('CalloutInfo', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  await mount(CalloutInfoPlayground, { props: { appearance } })
  await expectScreenshotClippedToContent()
})

test('CalloutError', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  await mount(CalloutErrorPlayground, { props: { appearance } })
  await expectScreenshotClippedToContent()
})
