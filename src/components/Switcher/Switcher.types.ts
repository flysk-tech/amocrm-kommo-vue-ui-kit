import type { VisuallyHiddenInputProps } from '@/components/VisuallyHiddenInput'
import type { SwitcherTheme } from './Switcher.themes'

type BaseSwitcherProps = {
  /**
   * Object with CSS properties of the theme.
   */
  theme: SwitcherTheme
}

export type SwitcherProps = VisuallyHiddenInputProps & BaseSwitcherProps
