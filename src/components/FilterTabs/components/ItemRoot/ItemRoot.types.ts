import type { ItemRootThemeType } from './ItemRoot.themes'

export interface ItemRootProps {
  isDisabled?: boolean
  isDefaultActive?: boolean
  name: string
  theme: ItemRootThemeType
  className?: string
}

export type TabItemContextProps = Omit<
  ItemRootProps,
  'theme' | 'className' | 'isDefaultActive'
>
