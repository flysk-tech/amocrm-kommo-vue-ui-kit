import type { InputTheme } from './Input.themes'

export type InputInvalidDescriptionPlacement = 'bottom' | 'right'

// Основные пропсы для Input компонента
export interface InputProps {
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
  // Common input attributes
  value?: string | number
  placeholder?: string
  name?: string
  id?: string
  autocomplete?: string
  type?: string
  maxlength?: number
  minlength?: number
  pattern?: string
  required?: boolean
  onInput?: (event: any) => void
  onChange?: (event: any) => void
  onFocus?: (event: any) => void
  onBlur?: (event: any) => void
  /**
   * Valid value is entered or not.
   *
   * If true, the appropriate styles will be applied.
   * @default false
   */
  isInvalid?: boolean
  /**
   * Adds an icon on the right.
   */
  after?: string
  /**
   * Error message
   */
  invalidDescription?: string
  /**
   * Error message placement
   */
  invalidDescriptionPlacement?: InputInvalidDescriptionPlacement
  /**
   * Object with CSS properties of the theme.
   * Optional - if not provided, global CSS variables will be used.
   */
  theme?: InputTheme
  /**
   * Additional CSS class name
   */
  className?: string
}

export type InputThemeType = InputTheme