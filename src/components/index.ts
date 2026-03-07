// Экспорт компонентов

// Appearance enum and constants
export * from '../lib/appearance'

// Base components
export * from './BaseInput'
export * from './VisuallyHiddenInput'

// Form components
export * from './Button'
export * from './Input'
export * from './TextArea'
export * from './InlineInput'
export * from './Switcher'
export * from './SelectButton'
export * from './Select'
export * from './MultiSelect'

// Checkbox — explicit to avoid collision with CheckboxGroup's re-export
export { default as Checkbox } from './Checkbox/Checkbox.vue'
export type { CheckboxProps, CheckedStyleType, BaseCheckboxProps } from './Checkbox/Checkbox.types'
export {
  type CheckboxThemeType,
  CheckboxLightTheme,
  CheckboxSmallLightTheme,
  CheckboxDarkTheme,
  CheckboxSmallDarkTheme,
} from './Checkbox/Checkbox.themes'

// Layout components
export * from './Label'
export * from './Portal'
export * from './ContentBlock'
export * from './List'

// Typography
export * from './Text'
export * from './Link'

// Feedback components
export * from './Spinner'
export * from './Callout'

// Complex components
export * from './Accordion'
export * from './FilterTabs'

// CheckboxGroup — namespaced to avoid ItemRoot/ItemRootProps/LabelGroupOrientation collisions
export {
  CheckboxGroup,
  type CheckboxGroupProps,
  type CheckboxGroupChangeEvent,
  type CheckboxStateType,
  type RegisterHandlerType,
  type RegisterHandlerResult,
  type RegisterOptionsType,
  type InternalCheckboxGroupChangeEvent,
  type CheckboxContextProps,
  type CheckboxGroupThemeType,
  CheckboxGroupTheme,
  ItemRoot as CheckboxGroupItemRoot,
  CheckboxGroupItemRootTheme,
  type ItemRootProps as CheckboxGroupItemRootProps,
  type ItemRootThemeType as CheckboxGroupItemRootThemeType,
  type LabelGroupOrientation as CheckboxGroupLabelGroupOrientation,
  CheckboxSelectAll,
  ItemRootSelectAll,
  type ItemRootSelectAllProps,
} from './CheckboxGroup'

// RadioGroup — namespaced to avoid ItemRoot/ItemRootProps/LabelGroupOrientation collisions
export {
  RadioGroup,
  type RadioGroupProps,
  type RadioContextProps,
  type RadioGroupThemeType,
  RadioGroupTheme,
  ItemRoot as RadioGroupItemRoot,
  RadioGroupItemRootTheme,
  type ItemRootProps as RadioGroupItemRootProps,
  type ItemRootThemeType as RadioGroupItemRootThemeType,
  type LabelGroupOrientation,
  Radio,
  RadioPrimaryTheme,
  type RadioProps,
  type RadioThemeType,
} from './RadioGroup'

