import type { CheckboxGroupThemeType } from './CheckboxGroup.themes'

export type LabelGroupOrientation = 'horizontal' | 'vertical'

export type CheckboxGroupChangeEvent = (
  values: CheckboxStateType[],
  changedValue: InternalCheckboxGroupChangeEvent
) => void

export type InternalCheckboxGroupChangeEvent =
  | {
      type: 'selectAll'
      name: 'selectAll'
    }
  | {
      type: 'checkbox'
      name: string
    }

export interface RegisterOptionsType {
  isDisabled?: boolean
  isDefaultChecked?: boolean
}

export interface CheckboxStateType {
  name: string
  isChecked: boolean
  isDisabled?: boolean
}

export type RegisterHandlerResult = RegisterOptionsType & {
  name: string
  onChange: (option: InternalCheckboxGroupChangeEvent) => void
}

export type RegisterHandlerType = (
  name: string,
  options?: RegisterOptionsType
) => RegisterHandlerResult

export interface CheckboxContextProps {
  values: Map<string, CheckboxStateType>
  isDisabled?: boolean
  register: RegisterHandlerType
}

export interface CheckboxGroupProps {
  onChange: CheckboxGroupChangeEvent
  orientation?: LabelGroupOrientation
  theme: CheckboxGroupThemeType
  isDisabled?: boolean
}
