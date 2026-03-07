<template>
  <ComponentPlayground :appearance="appearance" :prop-sets="propSets">
    <template #default="{ props: itemProps }">
      <Input v-bind="itemProps" :theme="InputLightFixedWidthTheme" />
    </template>
  </ComponentPlayground>
</template>

<script setup lang="ts">
import ComponentPlayground from '@/tests/e2e/ComponentPlayground.vue'
import Input from '../Input.vue'
import { InputLightTheme, type InputTheme } from '../Input.themes'
import { Appearance } from '@/lib/appearance'

interface Props {
  appearance: Appearance
}

defineProps<Props>()

const InputLightFixedWidthTheme: InputTheme = {
  ...InputLightTheme,
  '--crm-ui-kit-input-width': '200px',
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
    invalidDescriptionPlacement: ['bottom', 'right'],
    value: ['Jhon', undefined],
  },
]
</script>
