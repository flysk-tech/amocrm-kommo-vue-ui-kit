import { createComponentContext } from '@/lib/vue'
import type { FilterTabsContextProps } from './FilterTabs.types'

const DISPLAY_NAME = 'FilterTabs'

const [provideFilterTabsContext, useFilterTabsContext] =
  createComponentContext<FilterTabsContextProps>(DISPLAY_NAME)

export { provideFilterTabsContext, useFilterTabsContext, DISPLAY_NAME }
