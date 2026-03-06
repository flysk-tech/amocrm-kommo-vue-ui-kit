import type { AccordionItemThemeType } from './Item.themes'

export interface ItemProps {
  /**
   * Object with CSS theme properties
   */
  theme: AccordionItemThemeType
  /**
   * Item value.
   */
  value: string
  /**
   * Title.
   */
  title: string
  /**
   * Content to the left of the title.
   */
  before?: any
}
