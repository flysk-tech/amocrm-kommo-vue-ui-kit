<template>
  <ComponentPlayground :appearance="appearance" :prop-sets="propSets">
    <template #default="{ props: itemProps }">
      <div :style="{ position: 'relative', height: '20px' }">
        <Spinner v-bind="itemProps" :theme="SpinnerPrimaryTheme" />
      </div>
    </template>
  </ComponentPlayground>
</template>

<script setup lang="ts">
import ComponentPlayground from '@/tests/e2e/ComponentPlayground.vue'
import Spinner from '../Spinner.vue'
import { SpinnerTheme as SpinnerPrimaryTheme } from '../Spinner.themes'
import { Appearance } from '@/lib/appearance'

interface Props {
  appearance: Appearance
}

defineProps<Props>()

const propSets = [
  {
    isCentered: [true, false],
  },
]
</script>
