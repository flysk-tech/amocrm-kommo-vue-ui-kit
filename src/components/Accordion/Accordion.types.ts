import type { AccordionThemeType } from './Accordion.themes'
import type {
  AccordionMultipleProps,
  AccordionMultipleImplProps,
  AccordionMultipleContextProps,
} from './components/AccordionMultiple/AccordionMultiple.types'
import type {
  AccordionSingleProps,
  AccordionSingleImplProps,
  AccordionSingleContextProps,
} from './components/AccordionSingle/AccordionSingle.types'

export interface BaseAccordionProps {
  /**
   * Object with CSS theme properties.
   */
  theme: AccordionThemeType
}

export type AccordionProps = AccordionSingleImplProps | AccordionMultipleImplProps

export type AccordionContextProps =
  | AccordionSingleContextProps
  | AccordionMultipleContextProps

// Re-export types for convenience
export type {
  AccordionSingleProps,
  AccordionSingleImplProps,
  AccordionSingleContextProps,
  AccordionMultipleProps,
  AccordionMultipleImplProps,
  AccordionMultipleContextProps,
}
