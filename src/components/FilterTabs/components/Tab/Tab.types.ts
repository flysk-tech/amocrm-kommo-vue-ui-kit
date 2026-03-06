import type { TabThemeType } from './Tab.themes'

export interface TabProps {
  className?: string
  theme: TabThemeType
  onClick?: (event: MouseEvent) => void
}
