import { createComponentContext } from '@/lib/vue'
import type { TabItemContextProps } from './ItemRoot.types'

const DISPLAY_NAME = 'FilterTabs.ItemRoot'

const [provideTabItemRootContext, useTabItemRootContext] =
  createComponentContext<TabItemContextProps>(DISPLAY_NAME)

export { provideTabItemRootContext, useTabItemRootContext, DISPLAY_NAME }
