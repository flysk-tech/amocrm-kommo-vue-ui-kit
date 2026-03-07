<template>
  <span ref="optionRef" :class="[styles.text, className]">
    <Text :theme="OptionTextTheme" size="l" :isEllipsis="true">
      <slot />
    </Text>
  </span>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Text from '@/components/Text/Text.vue'
import { TextPrimaryTheme, type TextTheme } from '@/components/Text'
import styles from './Option.module.scss'

defineProps<{
  className?: string
}>()

const OptionTextTheme: TextTheme = {
  ...TextPrimaryTheme,
  '--crm-ui-kit-text-color': 'inherit',
}

const optionRef = ref<HTMLSpanElement | null>(null)

defineExpose({
  optionRef,
})
</script>
