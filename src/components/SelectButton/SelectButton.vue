<template>
  <button
    ref="buttonRef"
    v-bind="$attrs"
    type="button"
    :class="[
      styles.button,
      className,
      {
        [styles.invalid]: isInvalid,
        [styles.disabled]: isDisabled
      }
    ]"
    :style="theme"
    :disabled="isDisabled"
    @click="handleClick"
    @keydown="handleKeyDown"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { SelectButtonProps } from './SelectButton.types'
import styles from './SelectButton.module.scss'

type Props = SelectButtonProps & {}

const props = withDefaults(defineProps<Props>(), {
  className: '',
  isInvalid: false,
  isDisabled: false,
})

const emit = defineEmits<{
  (e: 'toggle'): void
}>()

const buttonRef = ref<HTMLButtonElement | null>(null)

const ENTER = 'Enter'
const SPACEBAR = 'Space'

const handleClick = () => {
  if (props.onToggle) {
    props.onToggle()
  }
  emit('toggle')
}

const handleKeyDown = (e: KeyboardEvent) => {
  if ([ENTER, SPACEBAR].includes(e.code)) {
    e.preventDefault()
    handleClick()
  }
}

defineExpose({
  buttonRef,
})
</script>
