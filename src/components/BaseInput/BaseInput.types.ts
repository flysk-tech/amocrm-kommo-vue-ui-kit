export interface BaseInputProps {
  /**
   * `disabled` status.
   */
  isDisabled?: boolean
  /**
   * `readonly` status.
   */
  isReadonly?: boolean
  /**
   * Is `placeholder` should be visible when Input in `focus`.
   */
  isPlaceholderVisibleOnFocus?: boolean
  // Common input attributes
  value?: string | number
  placeholder?: string
  name?: string
  id?: string
  autocomplete?: string
  type?: string
  maxlength?: number
  minlength?: number
  pattern?: string
  required?: boolean
  className?: string
  onInput?: (event: any) => void
  onChange?: (event: any) => void
  onFocus?: (event: any) => void
  onBlur?: (event: any) => void
}
