import { createComponentContext } from '@/lib/vue'
import type { SelectContextProps } from './Select.types'

const DISPLAY_NAME = 'Select'

const [provideSelectContext, useSelectContext] =
  createComponentContext<SelectContextProps>(DISPLAY_NAME)

export { provideSelectContext, useSelectContext, DISPLAY_NAME }
