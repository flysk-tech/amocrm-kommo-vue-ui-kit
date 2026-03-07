<template>
  <ComponentPlayground :appearance="appearance" :prop-sets="propSets">
    <template #default="{ props: itemProps }">
      <InlineInput v-bind="itemProps" :theme="InlineInputPrimaryFixedWidthTheme" />
    </template>
  </ComponentPlayground>
</template>

<script setup lang="ts">
import ComponentPlayground from '@/tests/e2e/ComponentPlayground.vue'
import { InlineInput, InlineInputPrimaryTheme, type InlineInputTheme } from '../index'
import type { Appearance } from '@/lib/appearance'

defineProps<{ appearance: Appearance }>()

const InlineInputPrimaryFixedWidthTheme: InlineInputTheme = {
  ...InlineInputPrimaryTheme,
  '--crm-ui-kit-inline-input-width': '200px',
}

const propSets = [
  {
    value: ['Jhon', undefined],
    isDisabled: [true, false],
  },
  {
    value: ['Jhon', undefined],
    isDisabled: [true, false],
    placeholder: ['Placeholder'],
  },
  {
    isInvalid: [true],
    invalidDescription: ['Required field'],
    value: ['Jhon', undefined],
  },
]
</script>
