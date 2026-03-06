<template>
  <div>
    <DesignTokens v-if="colorValues.length > 0" :color-values="colorValues" />
    <NumericValues v-if="numericValues.length > 0" :numeric-values="numericValues" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Rule } from 'css';

import DesignTokens from './DesignTokens/DesignTokens.vue';
import NumericValues from './NumericValues/NumericValues.vue';
import { getParsedCss } from './helper/getParsedCss';
import { getThemeValues } from './helper/getThemeValues';
import type { CrmUiKitCSSProperties } from '@storybook-utils/types/theme';

interface Props {
  theme: CrmUiKitCSSProperties;
}

const props = defineProps<Props>();

const { colorValues, numericValues } = computed(() => {
  const parsedCss = getParsedCss();

  if (!parsedCss.stylesheet) {
    throw new Error('Failed to parse stylesheet');
  }

  return getThemeValues(parsedCss.stylesheet.rules as Rule[], props.theme);
}).value;
</script>
