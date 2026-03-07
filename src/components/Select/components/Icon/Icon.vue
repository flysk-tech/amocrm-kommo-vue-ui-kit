<template>
  <span v-if="$slots.default" ref="iconRef" :class="styles.wrapper" :style="theme">
    <slot />
  </span>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { SelectIconThemeType } from './Icon.themes'
import styles from './Icon.module.scss'

defineProps<{
  theme: SelectIconThemeType
}>()

const iconRef = ref<HTMLSpanElement | null>(null)

defineExpose({
  iconRef,
})
</script>
