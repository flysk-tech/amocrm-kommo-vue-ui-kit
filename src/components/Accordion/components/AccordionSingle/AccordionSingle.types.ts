import type { Ref } from 'vue'
import type { BaseAccordionProps } from '../../Accordion.types'

export interface AccordionSingleProps extends BaseAccordionProps {
  /**
   * Flag determining whether the accordion can be fully closed.
   */
  isCollapsible?: boolean
  /**
   * Opened item.
   */
  value?: string
  /**
   * Default value.
   * Used for Uncontrolled Accordion.
   */
  defaultValue?: string
  /**
   * Callback for changing the opened item.
   */
  onChange?: (value?: string) => void
}

export interface AccordionSingleImplProps extends AccordionSingleProps {
  /**
   * Accordion type where only one item can be opened.
   */
  type: 'single'
}

export interface AccordionSingleContextProps {
  /**
   * Opened item.
   */
  value?: string | Ref<string | undefined>
  /**
   * Default value.
   */
  defaultValue?: string | Ref<string | undefined>
  /**
   * Callback for changing the opened item.
   */
  onChange: (value: string) => void
}
