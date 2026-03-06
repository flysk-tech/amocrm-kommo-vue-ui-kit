import type { FilterTabsThemeType } from './FilterTabs.themes'

export type FilterTabsOrientation = 'horizontal' | 'vertical'

export type FilterTabsChangeEvent = <T>(
  updatedValues: T[],
  trigger?: T
) => void

export interface FilterTabsContextProps {
  values: string[]
  isMultiSelect?: boolean
  isDisabled?: boolean
  onChange: (name?: string) => void
  registerActiveName: (name: string) => void
}

export interface FilterTabsProps {
  onChange: FilterTabsChangeEvent
  theme: FilterTabsThemeType
  orientation?: FilterTabsOrientation
  isMultiSelect?: boolean
  isDisabled?: boolean
  className?: string
  id?: string
}
