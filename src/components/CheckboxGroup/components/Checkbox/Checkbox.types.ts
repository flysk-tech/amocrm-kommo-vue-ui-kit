import type { CheckboxProps as CheckboxCoreProps } from '@/components/Checkbox/Checkbox.types'

export type CheckboxProps = Omit<
  CheckboxCoreProps,
  'onChange' | 'value' | 'isDisabled' | 'isChecked' | 'isDefaultChecked'
>
