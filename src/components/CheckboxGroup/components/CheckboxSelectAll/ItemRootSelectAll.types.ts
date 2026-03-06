import type { InternalCheckboxGroupChangeEvent } from '../../CheckboxGroup.types'
import type { ItemRootProps } from '../ItemRoot'

export type ItemRootSelectAllProps = Omit<
  ItemRootProps,
  'name' | 'isDefaultChecked' | 'value'
>

export interface CheckboxItemSelectAllContextValue
  extends Omit<ItemRootSelectAllProps, 'theme' | 'className'> {
  onChange: (option: InternalCheckboxGroupChangeEvent) => void
}
