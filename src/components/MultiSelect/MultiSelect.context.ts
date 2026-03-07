import { createComponentContext } from '@/lib/vue'
import type { MultiSelectContextProps } from './MultiSelect.types'

const DISPLAY_NAME = 'MultiSelect'

const [provideMultiSelectContext, useMultiSelectContext] =
  createComponentContext<MultiSelectContextProps>(DISPLAY_NAME)

export { provideMultiSelectContext, useMultiSelectContext, DISPLAY_NAME }
