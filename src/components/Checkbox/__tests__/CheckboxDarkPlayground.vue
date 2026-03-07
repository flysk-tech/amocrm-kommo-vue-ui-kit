<template>
  <ComponentPlayground :appearance="appearance" :prop-sets="propSets">
    <template #default="{ props: itemProps }">
      <div>
        <Checkbox v-bind="itemProps" :theme="CheckboxDarkTheme" />
      </div>
    </template>
  </ComponentPlayground>
</template>

<script setup lang="ts">
import ComponentPlayground from '@/tests/e2e/ComponentPlayground.vue'
import { Checkbox, CheckboxDarkTheme } from '../index'
import type { Appearance } from '@/lib/appearance'

defineProps<{ appearance: Appearance }>()

const propSets = [
  {
    isDisabled: [false, true],
    checkedStyle: ['mark', 'indeterminate'] as const,
    isDefaultChecked: [true, false],
  },
  {
    isInvalid: [true],
    isDisabled: [false, true],
    isDefaultChecked: [true, false],
  },
]
</script>
