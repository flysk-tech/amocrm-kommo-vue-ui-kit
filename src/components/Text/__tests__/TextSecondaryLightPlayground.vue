<template>
  <ComponentPlayground :appearance="appearance" :prop-sets="propSets">
    <template #default="{ props: itemProps }">
      <Text v-bind="itemProps" :theme="TextSecondaryLightTheme">
        Text
      </Text>
    </template>
  </ComponentPlayground>
</template>

<script setup lang="ts">
import ComponentPlayground from '@/tests/e2e/ComponentPlayground.vue'
import Text from '../Text.vue'
import { TextSecondaryLightTheme } from '../Text.themes'
import { Appearance } from '@/lib/appearance'

interface Props {
  appearance: Appearance
}

defineProps<Props>()

const propSets = [{ size: ['s', 'm', 'ms', 'l', 'xl'] }]
</script>
