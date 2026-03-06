import { createComponentContext } from '@/lib/vue'
import type { AccordionContextProps } from './Accordion.types'

const DISPLAY_NAME = 'Accordion'

const [provideAccordionContext, useAccordionContext] =
  createComponentContext<AccordionContextProps>(DISPLAY_NAME)

export { provideAccordionContext, useAccordionContext, DISPLAY_NAME }
