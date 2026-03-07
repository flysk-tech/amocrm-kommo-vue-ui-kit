import type { MultiSelectRootThemeType } from './MultiSelect.themes'

export interface MultiSelectItem {
  value: string | number
  option: string
  group?: string | number
  isOnline?: boolean
}

export interface MultiSelectGroup {
  id: string | number
  label: string
  color?: string
}

export interface MultiSelectProps {
  theme: MultiSelectRootThemeType
  mode?: 'single' | 'multi'
  groupSelectable?: boolean
  value?: MultiSelectItem[]
  defaultValue?: MultiSelectItem[]
  items?: MultiSelectItem[]
  isInvalid?: boolean
  isDisabled?: boolean
  isOpen?: boolean
  isDefaultOpen?: boolean
}

export interface MultiSelectContextProps {
  // State (reactive getters)
  values: Set<string | number>
  selectedItems: MultiSelectItem[]
  isOpened: boolean
  isDisabled: boolean
  isInvalid: boolean
  hoveredItemValue: string | number | null
  mode: 'single' | 'multi'
  groupSelectable: boolean
  searchQuery: string

  // Actions
  onOpen: (isOpen: boolean) => void
  onToggleItem: (item: MultiSelectItem) => void
  onToggleGroup: (groupId: string | number) => void
  onToggleAll: () => void
  onHoveredItemChange: (value: string | number | null) => void
  onSearchChange: (query: string) => void

  // Search helpers
  isItemMatchingSearch: (item: MultiSelectItem) => boolean
  isGroupMatchingSearch: (groupId: string | number) => boolean

  // Group helpers
  getGroupItems: (groupId: string | number) => MultiSelectItem[]
  isGroupAllSelected: (groupId: string | number) => boolean
  isGroupPartiallySelected: (groupId: string | number) => boolean
  isAllSelected: () => boolean
  isPartiallySelected: () => boolean
}
