import { createComponentContext } from '@/lib/vue/createComponentContext'
import type { TabItemResetContextProps } from './ItemRootReset.types'

export const DISPLAY_NAME = 'TabGroup.ItemRootReset'

export const [provideTabItemRootResetContext, useTabItemRootResetContext] =
  createComponentContext<TabItemResetContextProps>(DISPLAY_NAME)
