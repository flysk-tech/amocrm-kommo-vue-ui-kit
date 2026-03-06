<template>
  <CheckboxCore
    ref="checkboxRef"
    :className="className"
    :onChange="handleChange"
    :theme="theme"
    :value="SELECT_ALL"
    :isDisabled="isGlobalDisabled || isDisabled"
    :isChecked="propsBasedOnInternalState.isChecked"
    :checkedStyle="propsBasedOnInternalState.checkedStyle"
    v-bind="rest"
  />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import CheckboxCore from '@/components/Checkbox/Checkbox.vue'
import type { CheckedStyleType } from '@/components/Checkbox/Checkbox.types'
import { useCheckboxGroupContext } from '../../CheckboxGroup.context'
import { useCheckboxItemRootSelectAllContext } from './ItemRootSelectAll.context'
import type { CheckboxProps } from '../Checkbox/Checkbox.types'

const DISPLAY_NAME = 'CheckboxGroup.CheckboxSelectAll'
const SELECT_ALL = 'selectAll'

type Props = CheckboxProps & {
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  className: '',
})

const { theme, className, checkedStyle: _checkedStyle, ...rest } = props

const checkboxRef = ref<InstanceType<typeof CheckboxCore> | null>(null)

const { values, isDisabled: isGlobalDisabled } =
  useCheckboxGroupContext(DISPLAY_NAME)

const { onChange, isDisabled } =
  useCheckboxItemRootSelectAllContext(DISPLAY_NAME)

const handleChange = () => {
  onChange({ type: SELECT_ALL, name: SELECT_ALL })
}

const propsBasedOnInternalState = computed(() => {
  const allChecked = Array.from(values.values()).every(
    (checkbox) => checkbox.isChecked
  )
  const checkedStyle: CheckedStyleType = allChecked ? 'mark' : 'indeterminate'

  return {
    isChecked: Array.from(values.values()).some(
      (checkbox) => checkbox.isChecked
    ),
    checkedStyle,
  }
})

defineExpose({
  checkboxRef,
})
</script>
