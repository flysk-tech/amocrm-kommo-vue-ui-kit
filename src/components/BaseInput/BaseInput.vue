<template>
  <input
    v-bind="$attrs"
    ref="inputRef"
    :class="[
      styles.input,
      {
        [styles.placeholder_visible]: isPlaceholderVisibleOnFocus
      }
    ]"
    :disabled="isDisabled"
    :readonly="isReadonly"
  />
</template>

<script setup lang="ts">
defineOptions({ inheritAttrs: false })

import { ref } from 'vue'
import type { BaseInputProps } from './BaseInput.types'
import styles from './BaseInput.module.scss'

type Props = BaseInputProps

const props = withDefaults(defineProps<Props>(), {
  isDisabled: false,
  isReadonly: false,
  isPlaceholderVisibleOnFocus: false,
})

const inputRef = ref<HTMLInputElement | null>(null)

defineExpose({
  inputRef,
})
</script>
