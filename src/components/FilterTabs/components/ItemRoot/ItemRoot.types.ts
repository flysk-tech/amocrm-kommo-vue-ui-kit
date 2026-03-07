import type { ItemRootThemeType } from './ItemRoot.themes'

export interface ItemRootProps {
  isDisabled?: boolean
  isDefaultActive?: boolean
  name: string
  theme: ItemRootThemeType
  class?: string
}

export type TabItemContextProps = Omit<
  ItemRootProps,
  'theme' | 'class' | 'isDefaultActive'
>
