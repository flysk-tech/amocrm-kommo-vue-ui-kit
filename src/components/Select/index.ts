export { default as Select } from './Select.vue'
export * from './Select.types'
export * from './Select.themes'

export { SelectItemTheme, type SelectItemThemeType } from './components/Item'
export { SelectArrowTheme, type SelectArrowThemeType } from './components/Arrow'
export { SelectIconTheme, type SelectIconThemeType } from './components/Icon'

export {
  ListTheme as SelectListTheme,
  type ListThemeType as SelectListThemeType,
} from '../List'

// Subcomponents
export { SelectTrigger } from './components/Button'
export { SelectList } from './components/List'
export { SelectItem } from './components/Item'
export { SelectValue } from './components/Value'
export { SelectArrow } from './components/Arrow'
export { SelectIcon } from './components/Icon'
export { Option as SelectOption } from './components/Option'
