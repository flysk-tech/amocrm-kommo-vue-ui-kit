import { createComponentContext } from '@/lib/vue'
import type { CheckboxItemContextProps } from './ItemRoot.types'

const DISPLAY_NAME = 'CheckboxGroup.ItemRoot'

const [provideCheckboxItemRootContext, useCheckboxItemRootContext] =
  createComponentContext<CheckboxItemContextProps>(DISPLAY_NAME)

export { provideCheckboxItemRootContext, useCheckboxItemRootContext, DISPLAY_NAME }
