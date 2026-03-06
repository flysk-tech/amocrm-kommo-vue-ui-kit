import { createComponentContext } from '@/lib/vue'
import type { RadioContextProps } from './RadioGroup.types'

const DISPLAY_NAME = 'RadioGroup'

const [provideRadioGroupContext, useRadioGroupContext] =
  createComponentContext<RadioContextProps>(DISPLAY_NAME)

export { provideRadioGroupContext, useRadioGroupContext, DISPLAY_NAME }
