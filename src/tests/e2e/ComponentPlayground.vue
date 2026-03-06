<template>
  <ConfigProvider :appearance="appearance">
    <div
      :style="{
        border: '8px solid var(--playwright-border)',
        background: 'var(--playwright-background)',
      }"
    >
      <div v-for="(propSet, i) in propsCombinations" :key="i">
        <div :class="TEST_CLASS_NAMES.PARAMS_CONTENT">
          {{ prettyProps(propSet) }}
        </div>
        <div>
          <slot :props="propSet" />
        </div>
      </div>
    </div>
  </ConfigProvider>
</template>

<script setup lang="ts" generic="P extends object">
import { computed } from 'vue'
import ConfigProvider from '@/components/ConfigProvider/ConfigProvider.vue'
import { Appearance } from '@/lib/appearance'
import { multiCartesian, prettyProps } from './utils'
import { TEST_CLASS_NAMES } from './constants'

export interface Props {
  appearance: Appearance
  propSets?: Parameters<typeof multiCartesian>[0]
}

const props = withDefaults(defineProps<Props>(), {
  propSets: () => [{}]
})

const propsCombinations = computed(() => {
  return multiCartesian(props.propSets)
})
</script>
