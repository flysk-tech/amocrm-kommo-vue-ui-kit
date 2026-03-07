<template>
  <CheckboxCore
    ref="checkboxRef"
    :class="className_"
    :name="name"
    :value="value"
    :theme="theme"
    :is-checked="isChecked"
    :is-disabled="isDisabled"
    v-bind="rest"
    @change="handleChange"
  />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import CheckboxCore from '@/components/Checkbox/Checkbox.vue'
import { useCheckboxGroupContext } from '../../CheckboxGroup.context'
import { useCheckboxItemRootContext } from '../ItemRoot/ItemRoot.context'
import type { CheckboxProps } from './Checkbox.types'

const DISPLAY_NAME = 'CheckboxGroup.Checkbox'

type Props = CheckboxProps & {
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  class: '',
})

const { theme, class: className_, name: _name, ...rest } = props

const checkboxRef = ref<InstanceType<typeof CheckboxCore> | null>(null)

const groupContext = useCheckboxGroupContext(DISPLAY_NAME)

const {
  isDisabled: isItemRootIsDisabled,
  name,
  value,
  onChange,
} = useCheckboxItemRootContext(DISPLAY_NAME)

const isDisabled = computed(
  () => groupContext.isDisabled || isItemRootIsDisabled
)

const isChecked = computed(() => Boolean(groupContext.values.get(name || '')?.isChecked))

const handleChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  onChange({ type: 'checkbox', name: target.name })
}

defineExpose({
  checkboxRef,
})
</script>
