import type { RadioGroupThemeType } from './RadioGroup.themes'

export type LabelGroupOrientation = 'horizontal' | 'vertical'

export type RadioContextProps = {
  /**
   * Currently selected value.
   */
  value?: string
  /**
   * The initial selected value of the Radio button.
   * Applies to a single Radio button.
   *
   * Used for the Uncontrolled RadioGroup.
   */
  defaultValue?: string
  /**
   * `name` attribute for `Radio`.
   *
   * Automatically applied to all Radio buttons.
   */
  name: string
  /**
   * `disabled` attribute for `Radio`.
   *
   * Automatically applied to all Radio buttons.
   */
  isDisabled?: boolean
  /**
   * Handler for the selected value.
   *
   * Automatically applied to all Radio buttons.
   */
  onChange: (e: Event) => void
}

export interface RadioGroupProps {
  /**
   * Object with CSS theme properties.
   */
  theme: RadioGroupThemeType
  /**
   * Responsible for vertical or horizontal alignment of RadioGroup.
   * @default 'vertical'
   */
  orientation?: LabelGroupOrientation
  /**
   * Currently selected value.
   */
  value?: string
  /**
   * The initial selected value.
   */
  defaultValue?: string
  /**
   * `name` attribute for Radio buttons.
   */
  name: string
  /**
   * `disabled` attribute for Radio buttons.
   */
  isDisabled?: boolean
}
