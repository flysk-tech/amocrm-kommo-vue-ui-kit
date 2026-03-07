<template>
  <ComponentPlayground :appearance="appearance" :prop-sets="propSets">
    <template #default="{ props: itemProps }">
      <Callout v-bind="itemProps" :theme="CalloutInfoTheme">
        <Text :theme="TextPrimaryTheme" size="l">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
          ipsam ducimus inventore minima optio error unde incidunt atque.
          Minima, maxime?
        </Text>
      </Callout>
    </template>
  </ComponentPlayground>
</template>

<script setup lang="ts">
import ComponentPlayground from '@/tests/e2e/ComponentPlayground.vue'
import { Callout, CalloutInfoTheme } from '../index'
import { Text, TextPrimaryTheme } from '@/components/Text'
import type { Appearance } from '@/lib/appearance'

defineProps<{ appearance: Appearance }>()

const propSets = [{}]
</script>
