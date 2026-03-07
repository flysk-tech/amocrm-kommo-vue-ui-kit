<template>
  <!-- Orientation variations: with descriptions -->
  <ComponentPlayground :appearance="appearance" :prop-sets="orientationPropSets">
    <template #default="{ props: itemProps }">
      <RadioGroup v-bind="itemProps" :theme="RadioGroupTheme" name="size">
        <ItemRoot :theme="RadioGroupItemRootTheme" value="s">
          <Label text-placement="right" :theme="LabelTheme">
            <template #description>
              <Text size="m" :theme="TextSecondaryLightTheme">
                Description of S Radio
              </Text>
            </template>
            <template #text>
              <Text size="l" :theme="TextPrimaryTheme">S Value</Text>
            </template>
            <Radio :theme="RadioPrimaryTheme" />
          </Label>
        </ItemRoot>
        <ItemRoot :theme="RadioGroupItemRootTheme" value="m">
          <Label text-placement="right" :theme="LabelTheme">
            <template #description>
              <Text size="m" :theme="TextSecondaryLightTheme">
                Description of M Radio
              </Text>
            </template>
            <template #text>
              <Text size="l" :theme="TextPrimaryTheme">M Value</Text>
            </template>
            <Radio :theme="RadioPrimaryTheme" />
          </Label>
        </ItemRoot>
      </RadioGroup>
    </template>
  </ComponentPlayground>

  <!-- Orientation variations: without descriptions -->
  <ComponentPlayground :appearance="appearance" :prop-sets="orientationPropSets">
    <template #default="{ props: itemProps }">
      <RadioGroup v-bind="itemProps" :theme="RadioGroupTheme" name="size">
        <ItemRoot :theme="RadioGroupItemRootTheme" value="s">
          <Label text-placement="right" :theme="LabelTheme">
            <template #text>
              <Text size="l" :theme="TextPrimaryTheme">S Value</Text>
            </template>
            <Radio :theme="RadioPrimaryTheme" />
          </Label>
        </ItemRoot>
        <ItemRoot :theme="RadioGroupItemRootTheme" value="m">
          <Label text-placement="right" :theme="LabelTheme">
            <template #text>
              <Text size="l" :theme="TextPrimaryTheme">M Value</Text>
            </template>
            <Radio :theme="RadioPrimaryTheme" />
          </Label>
        </ItemRoot>
      </RadioGroup>
    </template>
  </ComponentPlayground>

  <!-- Disabled state -->
  <ComponentPlayground :appearance="appearance" :prop-sets="disabledPropSets">
    <template #default="{ props: itemProps }">
      <RadioGroup v-bind="itemProps" :theme="RadioGroupTheme" name="size">
        <ItemRoot :theme="RadioGroupItemRootTheme" value="s">
          <Label text-placement="right" :theme="LabelTheme">
            <template #description>
              <Text size="m" :theme="TextSecondaryLightTheme">
                Description of S Radio
              </Text>
            </template>
            <template #text>
              <Text size="l" :theme="TextPrimaryTheme">S Value</Text>
            </template>
            <Radio :theme="RadioPrimaryTheme" />
          </Label>
        </ItemRoot>
        <ItemRoot :theme="RadioGroupItemRootTheme" value="m">
          <Label text-placement="right" :theme="LabelTheme">
            <template #description>
              <Text size="m" :theme="TextSecondaryLightTheme">
                Description of M Radio
              </Text>
            </template>
            <template #text>
              <Text size="l" :theme="TextPrimaryTheme">M Value</Text>
            </template>
            <Radio :theme="RadioPrimaryTheme" />
          </Label>
        </ItemRoot>
      </RadioGroup>
    </template>
  </ComponentPlayground>
</template>

<script setup lang="ts">
import ComponentPlayground from '@/tests/e2e/ComponentPlayground.vue'
import { Label, LabelTheme } from '@/components/Label'
import { Text, TextPrimaryTheme, TextSecondaryLightTheme } from '@/components/Text'
import {
  RadioGroup,
  RadioGroupTheme,
  RadioGroupItemRootTheme,
  ItemRoot,
  Radio,
  RadioPrimaryTheme,
} from '../index'
import type { Appearance } from '@/lib/appearance'

defineProps<{ appearance: Appearance }>()

const orientationPropSets = [
  {
    orientation: ['horizontal', 'vertical'] as const,
  },
]

const disabledPropSets = [
  {
    isDisabled: [true],
  },
]
</script>
