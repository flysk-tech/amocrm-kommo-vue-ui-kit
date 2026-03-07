import type { TabProps } from '../Tab/Tab.types'
import type { ItemRootThemeType } from '../ItemRoot/ItemRoot.themes'

export interface ItemRootResetProps {
  /**
   * A flag that determines whether the element is disabled.
   */
  isDisabled?: boolean
  /**
   * Object with CSS theme properties.
   */
  theme: ItemRootThemeType
  class?: string
}

export type TabItemResetContextProps = Omit<
  ItemRootResetProps,
  'theme' | 'class'
>
