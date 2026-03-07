<template>
  <div :class="[styles.wrapper, itemRootClassName]" :style="theme">
    <VisuallyHiddenInput
      ref="inputRef"
      :class="[styles.input, className]"
      type="radio"
      :value="value"
      :isDisabled="radioGroupContext.isDisabled || itemRootIsDisabled"
      v-bind="propsBasedOnType"
    />
    <span :class="styles.radio" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import VisuallyHiddenInput from '@/components/VisuallyHiddenInput/VisuallyHiddenInput.vue'
import { useRadioGroupContext } from '../../RadioGroup.context'
import { useRadioItemRootContext } from '../ItemRoot/ItemRoot.context'
import type { RadioProps } from './Radio.types'
import styles from './Radio.module.scss'

const DISPLAY_NAME = 'RadioGroup.Radio'

type Props = RadioProps & {
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  className: '',
})

const inputRef = ref<InstanceType<typeof VisuallyHiddenInput> | null>(null)

const radioGroupContext = useRadioGroupContext(DISPLAY_NAME)

const {
  value,
  isDisabled: itemRootIsDisabled,
  className: itemRootClassName,
  ...restItemRoot
} = useRadioItemRootContext(DISPLAY_NAME)

const propsBasedOnType = computed(() => {
  const baseProps = {
    name: radioGroupContext.name,
    onChange: radioGroupContext.onChange,
    ...restItemRoot,
  }

  if (radioGroupContext.defaultValue) {
    return {
      isDefaultChecked: radioGroupContext.defaultValue === value,
      ...baseProps,
    }
  }

  return {
    isChecked: radioGroupContext.value === value,
    ...baseProps,
  }
})

defineExpose({
  inputRef,
})
</script>
