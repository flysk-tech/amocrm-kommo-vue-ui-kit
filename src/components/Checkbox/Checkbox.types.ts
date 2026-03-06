import type { VisuallyHiddenInputProps } from '@/components/VisuallyHiddenInput'
import type { CheckboxThemeType } from './Checkbox.themes'

export type CheckedStyleType = 'mark' | 'indeterminate'

export type BaseCheckboxProps = {
  /**
   * Type of icon.
   *
   * @default mark
   */
  checkedStyle?: CheckedStyleType
  /**
   * Indicates if the checkbox is invalid.
   *
   * If `true`, applies corresponding styles.
   * @default false
   */
  isInvalid?: boolean
  /**
   * Object with CSS properties of the theme.
   */
  theme: CheckboxThemeType
}

export type CheckboxProps = VisuallyHiddenInputProps & BaseCheckboxProps
