import { test } from '@/tests/e2e/index.playwright'

import InlineInputPlayground from './InlineInputPlayground.vue'
import InlineInputPrimaryFocusedPlayground from './InlineInputPrimaryFocusedPlayground.vue'
import InlineInputWithFocusPlayground from './InlineInputWithFocusPlayground.vue'
import InlineInputInvalidWithFocusPlayground from './InlineInputInvalidWithFocusPlayground.vue'
import InlineInputPrimaryFocusedWithFocusPlayground from './InlineInputPrimaryFocusedWithFocusPlayground.vue'
import InlineInputPrimaryFocusedInvalidWithFocusPlayground from './InlineInputPrimaryFocusedInvalidWithFocusPlayground.vue'

test('Inline Input', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  await mount(InlineInputPlayground, { props: { appearance } })
  await expectScreenshotClippedToContent()
})

test('Inline Input Primary Focused', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  await mount(InlineInputPrimaryFocusedPlayground, { props: { appearance } })
  await expectScreenshotClippedToContent()
})

test('Inline Input With Focus', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
  setFocusOnElement,
}) => {
  await mount(InlineInputWithFocusPlayground, { props: { appearance } })
  await setFocusOnElement()
  await expectScreenshotClippedToContent()
})

test('Inline Input Invalid With Focus', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
  setFocusOnElement,
}) => {
  await mount(InlineInputInvalidWithFocusPlayground, { props: { appearance } })
  await setFocusOnElement()
  await expectScreenshotClippedToContent()
})

test('Inline Input Primary Focused With Focus', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
  setFocusOnElement,
}) => {
  await mount(InlineInputPrimaryFocusedWithFocusPlayground, { props: { appearance } })
  await setFocusOnElement()
  await expectScreenshotClippedToContent()
})

test('Inline Input Primary Focused Invalid With Focus', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
  setFocusOnElement,
}) => {
  await mount(InlineInputPrimaryFocusedInvalidWithFocusPlayground, { props: { appearance } })
  await setFocusOnElement()
  await expectScreenshotClippedToContent()
})
