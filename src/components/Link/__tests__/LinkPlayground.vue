<template>
  <ComponentPlayground :appearance="appearance" :prop-sets="propSets">
    <template #default="{ props: itemProps }">
      <Link v-bind="itemProps" :theme="LinkPrimaryTheme">
        Go to Dashboard
      </Link>
    </template>
  </ComponentPlayground>
</template>

<script setup lang="ts">
import ComponentPlayground from '@/tests/e2e/ComponentPlayground.vue'
import { Link, LinkPrimaryTheme } from '../index'
import type { Appearance } from '@/lib/appearance'

defineProps<{ appearance: Appearance }>()

const propSets = [{}]
</script>
