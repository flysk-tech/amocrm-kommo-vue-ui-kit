<template>
  <ComponentPlayground :appearance="appearance" :prop-sets="propSets">
    <template #default="{ props: itemProps }">
      <Switcher v-bind="itemProps" :theme="SwitcherPrimaryTheme" />
    </template>
  </ComponentPlayground>
</template>

<script setup lang="ts">
import ComponentPlayground from '@/tests/e2e/ComponentPlayground.vue'
import { Switcher, SwitcherPrimaryTheme } from '../index'
import type { Appearance } from '@/lib/appearance'

defineProps<{ appearance: Appearance }>()

const propSets = [
  {
    isDisabled: [true, false],
    isDefaultChecked: [true, false],
  },
]
</script>
