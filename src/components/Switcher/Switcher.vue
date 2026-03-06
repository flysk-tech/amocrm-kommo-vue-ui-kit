<template>
  <div :class="[styles.wrapper, className]" :style="theme">
    <VisuallyHiddenInput
      v-bind="$attrs"
      ref="inputRef"
      :className="styles.input"
      type="checkbox"
      :value="value"
    />
    <span :class="styles.switcher" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import VisuallyHiddenInput from '@/components/VisuallyHiddenInput/VisuallyHiddenInput.vue'
import type { SwitcherProps } from './Switcher.types'
import styles from './Switcher.module.scss'

type Props = SwitcherProps & {
  className?: string
  value?: string
}

const props = withDefaults(defineProps<Props>(), {
  className: '',
  value: 'Y',
})

const inputRef = ref<InstanceType<typeof VisuallyHiddenInput> | null>(null)

defineExpose({
  inputRef,
})
</script>
