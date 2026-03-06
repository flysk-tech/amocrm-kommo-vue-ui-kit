<template>
  <div
    v-bind="$attrs"
    ref="blockRef"
    :class="styles.block"
    :style="theme"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { ContentBlockProps } from './ContentBlock.types'
import styles from './ContentBlock.module.scss'

type Props = ContentBlockProps

const props = defineProps<Props>()

const blockRef = ref<HTMLDivElement | null>(null)

defineExpose({
  blockRef,
})
</script>
