import { createComponentContext } from '@/lib/vue'
import type { CheckboxItemSelectAllContextValue } from './ItemRootSelectAll.types'

const DISPLAY_NAME = 'CheckboxGroup.ItemRootSelectAll'

const [
  provideCheckboxItemRootSelectAllContext,
  useCheckboxItemRootSelectAllContext,
] = createComponentContext<CheckboxItemSelectAllContextValue>(DISPLAY_NAME)

export {
  provideCheckboxItemRootSelectAllContext,
  useCheckboxItemRootSelectAllContext,
  DISPLAY_NAME,
}
