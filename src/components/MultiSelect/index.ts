export { default as MultiSelect } from './MultiSelect.vue'
export * from './MultiSelect.types'
export * from './MultiSelect.themes'

// Subcomponent themes
export { MultiSelectItemTheme, type MultiSelectItemThemeType } from './components/Item'
export { MultiSelectGroupTheme, type MultiSelectGroupThemeType } from './components/Group'
export {
  MultiSelectComboboxTheme,
  MultiSelectComboboxInlineTheme,
  type MultiSelectComboboxThemeType,
} from './components/Combobox'
export { MultiSelectSearchTheme, type MultiSelectSearchThemeType } from './components/Search'

// Subcomponents
export { MultiSelectTrigger } from './components/Trigger'
export { MultiSelectList } from './components/List'
export { MultiSelectItem } from './components/Item'
export { MultiSelectGroup } from './components/Group'
export { MultiSelectAll } from './components/All'
export { MultiSelectValue } from './components/Value'
export { MultiSelectSearch } from './components/Search'
export { MultiSelectCombobox } from './components/Combobox'

export { useMultiSelectContext } from './MultiSelect.context'
