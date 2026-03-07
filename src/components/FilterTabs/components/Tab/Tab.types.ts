import type { TabThemeType } from './Tab.themes'

export interface TabProps {
  class?: string
  theme: TabThemeType
  onClick?: (event: MouseEvent) => void
}
