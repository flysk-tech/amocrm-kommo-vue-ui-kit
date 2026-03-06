<template>
  <div
    v-bind="$attrs"
    ref="blockRef"
    :class="[styles.block, className]"
    :style="theme"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { ContentBlockProps } from './ContentBlock.types'
import styles from './ContentBlock.module.scss'

type Props = ContentBlockProps & {
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  className: '',
})

const blockRef = ref<HTMLDivElement | null>(null)

defineExpose({
  blockRef,
})
</script>
