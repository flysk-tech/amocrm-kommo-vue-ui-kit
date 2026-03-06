import { createComponentContext } from '@/lib/vue'
import type { CheckboxContextProps } from './CheckboxGroup.types'

const DISPLAY_NAME = 'CheckboxGroup'

const [provideCheckboxGroupContext, useCheckboxGroupContext] =
  createComponentContext<CheckboxContextProps>(DISPLAY_NAME)

export { provideCheckboxGroupContext, useCheckboxGroupContext, DISPLAY_NAME }
