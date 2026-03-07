<template>
  <span ref="arrowRef" :class="[styles.wrapper, props.class]" :style="theme">
    <slot>
      <svg xmlns="http://www.w3.org/2000/svg" :width="BASE_WIDTH" :height="BASE_HEIGHT" fill="none" viewBox="0 0 21 21">
        <path fill="currentColor" fill-rule="evenodd" d="m5.25 8.826 1-1 4.5 4.4 4.5-4.4 1 1-5.5 5.5-5.5-5.5Z" clip-rule="evenodd"/>
      </svg>
    </slot>
  </span>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { SelectArrowThemeType } from './Arrow.themes'
import styles from './Arrow.module.scss'

const BASE_WIDTH = 20
const BASE_HEIGHT = 20

const props = defineProps<{
  theme: SelectArrowThemeType
  class?: string
}>()

const arrowRef = ref<HTMLSpanElement | null>(null)

defineExpose({
  arrowRef,
})
</script>
