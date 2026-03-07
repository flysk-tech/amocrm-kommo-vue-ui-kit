import type { ItemRootThemeType } from './ItemRoot.themes'

export interface ItemRootProps {
  /**
   * Object with CSS theme properties.
   */
  theme: ItemRootThemeType
  /**
   * `disabled` status.
   */
  isDisabled?: boolean
  /**
   * `readonly` status.
   */
  isReadonly?: boolean
  // Common input attributes
  value?: string | number
  id?: string
  class?: string
  onInput?: any
  onFocus?: any
  onBlur?: any
}

// Explicitly defined without Omit to avoid Vue compiler issues
export interface RadioItemContextProps {
  isDisabled?: boolean
  isReadonly?: boolean
  value?: string | number
  id?: string
  class?: string
  onInput?: any
  onFocus?: any
  onBlur?: any
}
