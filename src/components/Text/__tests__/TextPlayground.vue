<template>
  <ComponentPlayground :appearance="appearance" :prop-sets="propSets">
    <template #default="{ props: itemProps }">
      <Text :style="{ width: '100px' }" v-bind="itemProps" :theme="TextPrimaryTheme">
        Long text that will be truncated.
      </Text>
    </template>
  </ComponentPlayground>
</template>

<script setup lang="ts">
import ComponentPlayground from '@/tests/e2e/ComponentPlayground.vue'
import Text from '../Text.vue'
import { TextPrimaryTheme } from '../Text.themes'
import { Appearance } from '@/lib/appearance'

interface Props {
  appearance: Appearance
}

defineProps<Props>()

const propSets = [
  {
    size: ['m'],
    isEllipsis: [true, false],
    maxRows: [undefined, 2],
  },
]
</script>
