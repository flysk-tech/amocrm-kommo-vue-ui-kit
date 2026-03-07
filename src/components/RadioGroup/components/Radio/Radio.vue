<template>
  <div :class="[styles.wrapper, itemRootClass]" :style="theme">
    <VisuallyHiddenInput
      ref="inputRef"
      :class="[styles.input, props.class]"
      type="radio"
      :value="value"
      :is-disabled="radioGroupContext.isDisabled || itemRootIsDisabled"
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
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  class: '',
})

const inputRef = ref<InstanceType<typeof VisuallyHiddenInput> | null>(null)

const radioGroupContext = useRadioGroupContext(DISPLAY_NAME)

const {
  value,
  isDisabled: itemRootIsDisabled,
  class: itemRootClass,
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
