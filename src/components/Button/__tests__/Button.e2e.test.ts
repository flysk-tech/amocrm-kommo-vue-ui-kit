import { test } from '@/tests/e2e/index.playwright'

import ButtonPrimaryPlayground from './ButtonPrimaryPlayground.vue'
import ButtonNeutralPlayground from './ButtonNeutralPlayground.vue'
import ButtonSecondaryPlayground from './ButtonSecondaryPlayground.vue'

test('Button Primary', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  await mount(ButtonPrimaryPlayground, { props: { appearance } })
  await expectScreenshotClippedToContent()
})

test('Button Neutral', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  await mount(ButtonNeutralPlayground, { props: { appearance } })
  await expectScreenshotClippedToContent()
})

test('Button Secondary', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  await mount(ButtonSecondaryPlayground, { props: { appearance } })
  await expectScreenshotClippedToContent()
})
