import type { InternalCheckboxGroupChangeEvent } from '../../CheckboxGroup.types'
import type { ItemRootThemeType } from './ItemRoot.themes'

export interface ItemRootProps {
  name: string
  value: string
  isDisabled?: boolean
  isDefaultChecked?: boolean
  className?: string
  theme: ItemRootThemeType
}

export interface CheckboxItemContextProps
  extends Omit<ItemRootProps, 'theme' | 'className'> {
  onChange: (option: InternalCheckboxGroupChangeEvent) => void
}
