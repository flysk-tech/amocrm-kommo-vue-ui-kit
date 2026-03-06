<template>
  <div
    v-bind="$attrs"
    ref="calloutRef"
    :class="styles.wrapper"
    :style="themeStyles"
  >
    <component
      v-if="isIconAvailable"
      :is="theme.Icon"
      :class="styles.icon"
    />
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { CalloutProps } from './Callout.types'
import styles from './Callout.module.scss'

type Props = CalloutProps

const props = withDefaults(defineProps<Props>(), {
  isIconAvailable: true,
})

const calloutRef = ref<HTMLDivElement | null>(null)

const themeStyles = computed(() => {
  const { Icon, ...cssVars } = props.theme
  return cssVars
})

defineExpose({
  calloutRef,
})
</script>
