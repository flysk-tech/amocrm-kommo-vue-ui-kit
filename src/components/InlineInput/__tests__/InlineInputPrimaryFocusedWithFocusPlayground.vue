<template>
  <ComponentPlayground :appearance="appearance" :prop-sets="propSets">
    <template #default="{ props: itemProps }">
      <InlineInput v-bind="itemProps" :theme="InlineInputPrimaryFocusedFixedWidthTheme" />
    </template>
  </ComponentPlayground>
</template>

<script setup lang="ts">
import ComponentPlayground from '@/tests/e2e/ComponentPlayground.vue'
import { InlineInput, InlineInputPrimaryFocusedTheme, type InlineInputTheme } from '../index'
import { FOCUSABLE_ELEMENT_ID } from '@/tests/e2e/constants'
import type { Appearance } from '@/lib/appearance'

defineProps<{ appearance: Appearance }>()

const InlineInputPrimaryFocusedFixedWidthTheme: InlineInputTheme = {
  ...InlineInputPrimaryFocusedTheme,
  '--crm-ui-kit-inline-input-width': '200px',
}

const propSets = [
  {
    value: ['Jhon'],
    id: [FOCUSABLE_ELEMENT_ID],
  },
]
</script>
