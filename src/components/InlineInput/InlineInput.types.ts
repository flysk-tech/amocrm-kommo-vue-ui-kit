import type { InlineInputTheme } from './InlineInput.themes'

export interface InlineInputProps {
  /**
   * `disabled` status.
   */
  isDisabled?: boolean
  /**
   * `readonly` status.
   */
  isReadonly?: boolean
  /**
   * Is `placeholder` should be visible when Input in `focus`.
   */
  isPlaceholderVisibleOnFocus?: boolean
  /**
   * Valid value is entered or not.
   *
   * If true, the appropriate styles will be applied.
   * @default false
   */
  isInvalid?: boolean
  /**
   * Error message
   */
  invalidDescription?: string
  /**
   * Adds an icon on the right.
   */
  after?: any
  /**
   * Object with CSS properties of the theme.
   */
  theme: InlineInputTheme
}
