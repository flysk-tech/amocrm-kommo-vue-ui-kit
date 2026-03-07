<template>
  <ComponentPlayground :appearance="appearance" :prop-sets="propSets">
    <template #default="{ props: itemProps }">
      <div :style="{ padding: '10px 10px 15px' }">
        <ContentBlock v-bind="itemProps" :theme="ContentBlockTheme">
          <Text :theme="TextPrimaryTheme" size="l">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
            ipsam ducimus inventore minima optio error unde incidunt atque.
            Minima, maxime?
          </Text>
        </ContentBlock>
      </div>
    </template>
  </ComponentPlayground>
</template>

<script setup lang="ts">
import ComponentPlayground from '@/tests/e2e/ComponentPlayground.vue'
import { ContentBlock, ContentBlockTheme } from '../index'
import { Text, TextPrimaryTheme } from '@/components/Text'
import type { Appearance } from '@/lib/appearance'

defineProps<{ appearance: Appearance }>()

const propSets = [{}]
</script>
