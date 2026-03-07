<template>
  <CheckboxCore
    ref="checkboxRef"
    :class="className"
    :theme="theme"
    :value="SELECT_ALL"
    :isDisabled="groupContext.isDisabled || selectAllContext.isDisabled"
    :isChecked="propsBasedOnInternalState.isChecked"
    :checkedStyle="propsBasedOnInternalState.checkedStyle"
    @change="handleChange"
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

const groupContext = useCheckboxGroupContext(DISPLAY_NAME)

const selectAllContext = useCheckboxItemRootSelectAllContext(DISPLAY_NAME)

const handleChange = () => {
  selectAllContext.onChange({ type: SELECT_ALL, name: SELECT_ALL })
}

const propsBasedOnInternalState = computed(() => {
  const vals = groupContext.values
  const allChecked = Array.from(vals.values()).every(
    (checkbox) => checkbox.isChecked
  )
  const checkedStyle: CheckedStyleType = allChecked ? 'mark' : 'indeterminate'

  return {
    isChecked: Array.from(vals.values()).some(
      (checkbox) => checkbox.isChecked
    ),
    checkedStyle,
  }
})

defineExpose({
  checkboxRef,
})
</script>
