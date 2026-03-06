<template>
  <Source v-bind="$attrs" :dark="isDark" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Source } from '@storybook/addon-docs/blocks'
import { Appearance } from '@/components'
import { initialTheme } from '../../utils'

/**
 * Custom component that connects current Storybook's theme to the Source
 */
const isDark = computed(() => {
  const channel = (window as any).__STORYBOOK_ADDONS_CHANNEL__
  const appearance = channel?.data?.globalsUpdated?.[0]?.globals?.appearance || initialTheme
  return appearance === Appearance.ALTERNATIVE
})
</script>
