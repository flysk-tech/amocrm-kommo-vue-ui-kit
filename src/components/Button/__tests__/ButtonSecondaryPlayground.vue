<template>
  <ComponentPlayground :appearance="appearance" :propSets="[defaultPropsSet, iconsPropsSet]">
    <template #default="{ props: itemProps }">
      <Button v-bind="itemProps" :theme="ButtonSecondaryTheme">
        <template v-if="itemProps.before" #before>
          <span>📅</span>
        </template>
        Button
        <template v-if="itemProps.after" #after>
          <span>📋</span>
        </template>
      </Button>
    </template>
  </ComponentPlayground>
</template>

<script setup lang="ts">
import ComponentPlayground from '@/tests/e2e/ComponentPlayground.vue'
import Button from '../Button.vue'
import { ButtonSecondaryTheme } from '../Button.themes'
import { Appearance } from '@/lib/appearance'

interface Props {
  appearance: Appearance
}

defineProps<Props>()

const defaultPropsSet = {
  isLoading: [true, false],
  isDisabled: [true, false],
}

const iconsPropsSet = {
  before: [true, undefined],
  after: [true, undefined],
}
</script>
