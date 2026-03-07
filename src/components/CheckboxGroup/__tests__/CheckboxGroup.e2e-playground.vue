<template>
  <!-- Orientation variations: with SelectAll -->
  <ComponentPlayground :appearance="appearance" :prop-sets="orientationPropSets">
    <template #default="{ props: itemProps }">
      <CheckboxGroup v-bind="itemProps" :theme="CheckboxGroupTheme">
        <ItemRootSelectAll :theme="CheckboxGroupItemRootTheme">
          <Label text-placement="right" :theme="LabelTheme">
            <template #text>
              <Text size="l" :theme="TextPrimaryTheme">Select All</Text>
            </template>
            <CheckboxSelectAll :theme="CheckboxLightTheme" />
          </Label>
        </ItemRootSelectAll>
        <ItemRoot
          :theme="CheckboxGroupItemRootTheme"
          name="s"
          value="s"
        >
          <Label text-placement="right" :theme="LabelTheme">
            <template #text>
              <Text size="l" :theme="TextPrimaryTheme">S Name</Text>
            </template>
            <Checkbox :theme="CheckboxLightTheme" />
          </Label>
        </ItemRoot>
        <ItemRoot
          :theme="CheckboxGroupItemRootTheme"
          name="m"
          value="m"
        >
          <Label text-placement="right" :theme="LabelTheme">
            <template #text>
              <Text size="l" :theme="TextPrimaryTheme">M Name</Text>
            </template>
            <Checkbox :theme="CheckboxLightTheme" />
          </Label>
        </ItemRoot>
      </CheckboxGroup>
    </template>
  </ComponentPlayground>

  <!-- Disabled state: without SelectAll -->
  <ComponentPlayground :appearance="appearance" :prop-sets="disabledPropSets">
    <template #default="{ props: itemProps }">
      <CheckboxGroup v-bind="itemProps" :theme="CheckboxGroupTheme">
        <ItemRoot
          :theme="CheckboxGroupItemRootTheme"
          name="s"
          value="s"
        >
          <Label text-placement="right" :theme="LabelTheme">
            <template #text>
              <Text size="l" :theme="TextPrimaryTheme">S Name</Text>
            </template>
            <Checkbox :theme="CheckboxLightTheme" />
          </Label>
        </ItemRoot>
        <ItemRoot
          :theme="CheckboxGroupItemRootTheme"
          name="m"
          value="m"
        >
          <Label text-placement="right" :theme="LabelTheme">
            <template #text>
              <Text size="l" :theme="TextPrimaryTheme">M Name</Text>
            </template>
            <Checkbox :theme="CheckboxLightTheme" />
          </Label>
        </ItemRoot>
      </CheckboxGroup>
    </template>
  </ComponentPlayground>

  <!-- Default checked: one checked -->
  <ComponentPlayground :appearance="appearance" :prop-sets="defaultPropSets">
    <template #default="{ props: itemProps }">
      <CheckboxGroup v-bind="itemProps" :theme="CheckboxGroupTheme">
        <ItemRootSelectAll :theme="CheckboxGroupItemRootTheme">
          <Label text-placement="right" :theme="LabelTheme">
            <template #text>
              <Text size="l" :theme="TextPrimaryTheme">Select All</Text>
            </template>
            <CheckboxSelectAll :theme="CheckboxLightTheme" />
          </Label>
        </ItemRootSelectAll>
        <ItemRoot
          :theme="CheckboxGroupItemRootTheme"
          :is-default-checked="true"
          name="s"
          value="s"
        >
          <Label text-placement="right" :theme="LabelTheme">
            <template #text>
              <Text size="l" :theme="TextPrimaryTheme">S Name</Text>
            </template>
            <Checkbox :theme="CheckboxLightTheme" />
          </Label>
        </ItemRoot>
        <ItemRoot
          :theme="CheckboxGroupItemRootTheme"
          name="m"
          value="m"
        >
          <Label text-placement="right" :theme="LabelTheme">
            <template #text>
              <Text size="l" :theme="TextPrimaryTheme">M Name</Text>
            </template>
            <Checkbox :theme="CheckboxLightTheme" />
          </Label>
        </ItemRoot>
      </CheckboxGroup>
    </template>
  </ComponentPlayground>

  <!-- Default checked: both checked -->
  <ComponentPlayground :appearance="appearance" :prop-sets="defaultPropSets">
    <template #default="{ props: itemProps }">
      <CheckboxGroup v-bind="itemProps" :theme="CheckboxGroupTheme">
        <ItemRootSelectAll :theme="CheckboxGroupItemRootTheme">
          <Label text-placement="right" :theme="LabelTheme">
            <template #text>
              <Text size="l" :theme="TextPrimaryTheme">Select All</Text>
            </template>
            <CheckboxSelectAll :theme="CheckboxLightTheme" />
          </Label>
        </ItemRootSelectAll>
        <ItemRoot
          :theme="CheckboxGroupItemRootTheme"
          :is-default-checked="true"
          name="s"
          value="s"
        >
          <Label text-placement="right" :theme="LabelTheme">
            <template #text>
              <Text size="l" :theme="TextPrimaryTheme">S Name</Text>
            </template>
            <Checkbox :theme="CheckboxLightTheme" />
          </Label>
        </ItemRoot>
        <ItemRoot
          :theme="CheckboxGroupItemRootTheme"
          :is-default-checked="true"
          name="m"
          value="m"
        >
          <Label text-placement="right" :theme="LabelTheme">
            <template #text>
              <Text size="l" :theme="TextPrimaryTheme">M Name</Text>
            </template>
            <Checkbox :theme="CheckboxLightTheme" />
          </Label>
        </ItemRoot>
      </CheckboxGroup>
    </template>
  </ComponentPlayground>
</template>

<script setup lang="ts">
import ComponentPlayground from '@/tests/e2e/ComponentPlayground.vue'
import { Label, LabelTheme } from '@/components/Label'
import { Text, TextPrimaryTheme } from '@/components/Text'
import { CheckboxLightTheme } from '@/components/Checkbox'
import {
  CheckboxGroup,
  CheckboxGroupTheme,
  CheckboxGroupItemRootTheme,
  ItemRoot,
  Checkbox,
  CheckboxSelectAll,
  ItemRootSelectAll,
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

const defaultPropSets = [{}]
</script>
