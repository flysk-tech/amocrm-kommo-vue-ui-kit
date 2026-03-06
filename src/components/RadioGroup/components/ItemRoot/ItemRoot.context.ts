import { createComponentContext } from '@/lib/vue'
import type { RadioItemContextProps } from './ItemRoot.types'

const DISPLAY_NAME = 'RadioGroup.ItemRoot'

const [provideRadioItemRootContext, useRadioItemRootContext] =
  createComponentContext<RadioItemContextProps>(DISPLAY_NAME)

export { provideRadioItemRootContext, useRadioItemRootContext, DISPLAY_NAME }
