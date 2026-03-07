import { ref, watch, nextTick, type Ref } from 'vue'
import type {
  InternalCheckboxGroupChangeEvent,
  RegisterHandlerType,
  CheckboxStateType,
  CheckboxGroupChangeEvent,
} from '../CheckboxGroup.types'

export interface UseCheckboxGroupStateArgs {
  isDisabled?: boolean
  onChange: Ref<CheckboxGroupChangeEvent | undefined>
}

export const useCheckboxGroupState = ({
  isDisabled,
  onChange,
}: UseCheckboxGroupStateArgs) => {
  const state = ref<Map<string, CheckboxStateType>>(new Map())
  const registeredComponents = ref<Record<string, boolean>>({})
  const queueComponents = ref<CheckboxStateType[]>([])

  const handleChange = (changeEvent: InternalCheckboxGroupChangeEvent) => {
    const copyState = new Map(state.value)

    if (changeEvent.type === 'selectAll' && !isDisabled) {
      const isSomeChecked = Array.from(copyState.values()).some(
        (checkbox) => checkbox.isChecked && !checkbox.isDisabled
      )

      copyState.forEach((checkbox) => {
        if (!checkbox.isDisabled) {
          checkbox.isChecked = !isSomeChecked
        }
      })
    }

    if (changeEvent.type === 'checkbox' && !isDisabled) {
      const currentCheckbox = copyState.get(changeEvent.name)

      if (currentCheckbox && !currentCheckbox.isDisabled) {
        copyState.set(currentCheckbox.name, {
          ...currentCheckbox,
          isChecked: !currentCheckbox.isChecked,
        })
      }
    }

    state.value = copyState
    if (typeof onChange.value === 'function') {
      onChange.value([...copyState.values()], changeEvent)
    }
  }

  watch(
    () => queueComponents.value.length,
    async () => {
      if (queueComponents.value.length) {
        await nextTick()
        const queue = [...queueComponents.value]
        queueComponents.value = []

        const copyState = new Map(state.value)
        queue.forEach((checkbox) => copyState.set(checkbox.name, checkbox))
        state.value = copyState
      }
    },
    { flush: 'post' }
  )

  const register: RegisterHandlerType = (name, options = {}) => {
    if (name !== 'selectAll' && !registeredComponents.value[name]) {
      registeredComponents.value[name] = true

      queueComponents.value.push({
        name,
        isChecked: Boolean(options.isDefaultChecked),
        isDisabled: Boolean(options.isDisabled),
      })
    }

    return {
      name,
      onChange: handleChange,
      ...options,
    }
  }

  return {
    state,
    register,
  }
}
