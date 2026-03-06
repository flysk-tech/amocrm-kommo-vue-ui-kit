import type { Ref } from 'vue'
import type { BaseAccordionProps } from '../../Accordion.types'

export interface AccordionMultipleProps extends BaseAccordionProps {
  /**
   * Opened item.
   */
  value?: string[]
  /**
   * Default value.
   * Used for Uncontrolled Accordion.
   */
  defaultValue?: string[]
}

export interface AccordionMultipleImplProps extends AccordionMultipleProps {
  /**
   * The type of accordion in which there may be several opened items.
   */
  type: 'multiple'
}

export interface AccordionMultipleContextProps {
  /**
   * Opened item.
   */
  value?: string[] | Ref<string[]>
  /**
   * Default value.
   */
  defaultValue?: string[] | Ref<string[] | undefined>
  /**
   * Callback for changing the opened item.
   */
  onChange: (value: string) => void
}
