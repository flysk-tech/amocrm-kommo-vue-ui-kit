<template>
  <div :class="styles.wrapper" :style="theme">
    <VisuallyHiddenInput
      v-bind="$attrs"
      ref="inputRef"
      :class="styles.input"
      type="checkbox"
      :isDisabled="props.isDisabled"
      :isReadonly="props.isReadonly"
      :isChecked="props.isChecked"
      :isDefaultChecked="props.isDefaultChecked"
      :value="props.value"
      :name="props.name"
      :id="props.id"
    />
    <span :class="styles.switcher" />
  </div>
</template>

<script setup lang="ts">
defineOptions({ inheritAttrs: false })

import { ref } from 'vue'
import VisuallyHiddenInput from '@/components/VisuallyHiddenInput/VisuallyHiddenInput.vue'
import type { SwitcherProps } from './Switcher.types'
import styles from './Switcher.module.scss'

type Props = SwitcherProps

const props = defineProps<Props>()

const inputRef = ref<InstanceType<typeof VisuallyHiddenInput> | null>(null)

defineExpose({
  inputRef,
})
</script>
