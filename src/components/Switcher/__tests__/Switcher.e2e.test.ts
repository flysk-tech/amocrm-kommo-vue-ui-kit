import { test } from '@/tests/e2e/index.playwright'

import SwitcherPlayground from './SwitcherPlayground.vue'

test('Switcher', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  await mount(SwitcherPlayground, { props: { appearance } })
  await expectScreenshotClippedToContent()
})
