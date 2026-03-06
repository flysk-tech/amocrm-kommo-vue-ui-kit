import type { SelectRootThemeType } from './Select.themes'

export interface SelectItem {
  value: number | string
  option: string
}

export interface SelectProps {
  theme: SelectRootThemeType
  value?: SelectItem
  defaultValue?: SelectItem
  isInvalid?: boolean
  isDisabled?: boolean
  isOpen?: boolean
  isDefaultOpen?: boolean
}

export interface SelectContextProps {
  value?: SelectItem
  defaultValue?: SelectItem
  isInvalid?: boolean
  isDisabled?: boolean
  onChange?: (item: SelectItem) => void
  onOpen: (isOpen: boolean) => void
  onHoveredIndexChange: (index: number) => void
  hoveredIndex: number
  isOpened: boolean
}
