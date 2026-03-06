import type { LabelGroupThemeType, LabelThemeType } from './Label.themes'

export type LabelPlacementType = 'left' | 'right' | 'top'

export interface LabelProps {
  /**
   * Object with CSS theme properties.
   */
  theme: LabelThemeType
  /**
   * Child text element.
   *
   * Use the Text component.
   */
  text?: any
  /**
   * Child element description.
   *
   * Use the Text component.
   */
  description?: any
  /**
   * Text alignment relative to the child element.
   *
   * @default 'top'.
   */
  textPlacement?: LabelPlacementType
  /**
   * Align the control with the text in the center.
   */
  isCentered?: boolean
}

export interface LabelGroupProps {
  /**
   * Object with CSS theme properties.
   */
  theme: LabelGroupThemeType
}
