<template>
  <ComponentPlayground :appearance="appearance" :prop-sets="propSets">
    <template #default="{ props: itemProps }">
      <TextArea v-bind="itemProps" :theme="TextareaLightTheme" />
    </template>
  </ComponentPlayground>
</template>

<script setup lang="ts">
import ComponentPlayground from '@/tests/e2e/ComponentPlayground.vue'
import { TextArea, TextareaLightTheme } from '../index'
import type { Appearance } from '@/lib/appearance'

defineProps<{ appearance: Appearance }>()

const propSets = [
  {
    isDisabled: [true, false],
    placeholder: ['Name', undefined],
    value: ['Jhon', undefined],
  },
  {
    isInvalid: [true],
    invalidDescription: ['Required field'],
    value: ['Jhon', undefined],
    isDisabled: [true, false],
  },
]
</script>
