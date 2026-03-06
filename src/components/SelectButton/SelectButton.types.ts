import type { SelectButtonThemeType } from './SelectButton.themes'

export interface SelectButtonProps {
  /**
   * Object with CSS theme properties.
   */
  theme: SelectButtonThemeType
  /**
   * Whether the button is invalid.
   *
   * If the value is `true`, the appropriate styles are applied.
   * @default false
   */
  isInvalid?: boolean
  /**
   * An attribute indicating whether the element is disabled.
   * If `true', the user will not be able to interact with the component.
   */
  isDisabled?: boolean
}
