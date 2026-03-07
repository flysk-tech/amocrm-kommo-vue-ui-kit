<template>
  <ComponentPlayground :appearance="appearance" :prop-sets="propSets">
    <template #default="{ props: itemProps }">
      <Label v-bind="itemProps" :theme="LabelTheme">
        <template #text>
          <Text :theme="TextPrimaryTheme" size="l">
            Label
          </Text>
        </template>
        <template v-if="itemProps.hasDescription" #description>
          <Text :theme="TextSecondaryLightTheme" size="m">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Obcaecati, autem.
          </Text>
        </template>
        <Text :theme="TextPrimaryTheme" size="l">
          Label Children
        </Text>
      </Label>
    </template>
  </ComponentPlayground>
</template>

<script setup lang="ts">
import ComponentPlayground from '@/tests/e2e/ComponentPlayground.vue'
import { Label, LabelTheme } from '../index'
import { Text, TextPrimaryTheme, TextSecondaryLightTheme } from '@/components/Text'
import type { Appearance } from '@/lib/appearance'

defineProps<{ appearance: Appearance }>()

const propSets = [
  {
    textPlacement: ['left', 'right', 'top'] as const,
    hasDescription: [true, false],
  },
  {
    isCentered: [true],
    textPlacement: ['left', 'right'] as const,
  },
]
</script>
