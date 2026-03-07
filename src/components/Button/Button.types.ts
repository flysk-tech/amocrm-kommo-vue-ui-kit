import { type ButtonThemeType } from './Button.themes'

export interface ButtonProps {
  type?: 'button' | 'submit' | 'reset'
  theme: ButtonThemeType
  isLoading?: boolean
  isDisabled?: boolean
  before?: any
  after?: any
  successfulStateText?: string
  isClickableWhileDisabled?: boolean
}
