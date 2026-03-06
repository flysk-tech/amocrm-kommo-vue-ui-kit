import { test } from '@/tests/e2e/index.playwright'
import AccordionPlayground from './Accordion.e2e-playground.vue'

test('Accordion', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  await mount(AccordionPlayground, {
    props: {
      appearance,
    },
  })
  await expectScreenshotClippedToContent()
})
