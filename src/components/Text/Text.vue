<template>
  <span
    v-bind="$attrs"
    :class="[
      styles.text,
      styles[size],
      {
        [styles.ellipsis]: isEllipsis,
        [styles.line_clamp]: isLineClampAllowed
      }
    ]"
    :style="{
      ...(isLineClampAllowed && { WebkitLineClamp: maxRows }),
      ...theme,
      ...style
    }"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { TextProps, TextSizes } from './Text.types'
import styles from './Text.module.scss'

type Props = TextProps & {}

const props = withDefaults(defineProps<Props>(), {
  isEllipsis: false,
  maxRows: 1,
  style: () => ({})
})

// Проверяем валидность размера и выбрасываем ошибку если нужно
const validSizes: TextSizes[] = ['s', 'm', 'ms', 'l', 'xl']
if (!validSizes.includes(props.size)) {
  throw new Error('Unknown size was presented')
}

// Определяем, разрешен ли line clamp
const isLineClampAllowed = computed(() => props.maxRows > 1)
</script>