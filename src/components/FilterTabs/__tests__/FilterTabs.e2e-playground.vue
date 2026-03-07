<template>
  <!-- Orientation variations -->
  <ComponentPlayground :appearance="appearance" :prop-sets="orientationPropSets">
    <template #default="{ props: itemProps }">
      <FilterTabs v-bind="itemProps" :theme="FilterTabsTheme">
        <ItemRootReset :theme="FilterTabsItemRootTheme">
          <TabReset :theme="TabPrimaryTheme">Select All</TabReset>
        </ItemRootReset>
        <ItemRoot :theme="FilterTabsItemRootTheme" name="s">
          <Tab :theme="TabPrimaryTheme">S Value</Tab>
        </ItemRoot>
        <ItemRoot :theme="FilterTabsItemRootTheme" name="m">
          <Tab :theme="TabPrimaryTheme">M Value</Tab>
        </ItemRoot>
      </FilterTabs>
    </template>
  </ComponentPlayground>

  <!-- Disabled state -->
  <ComponentPlayground :appearance="appearance" :prop-sets="disabledPropSets">
    <template #default="{ props: itemProps }">
      <FilterTabs v-bind="itemProps" :theme="FilterTabsTheme">
        <ItemRootReset :theme="FilterTabsItemRootTheme">
          <TabReset :theme="TabPrimaryTheme">Select All</TabReset>
        </ItemRootReset>
        <ItemRoot :theme="FilterTabsItemRootTheme" name="s">
          <Tab :theme="TabPrimaryTheme">S Value</Tab>
        </ItemRoot>
        <ItemRoot :theme="FilterTabsItemRootTheme" name="m">
          <Tab :theme="TabPrimaryTheme">M Value</Tab>
        </ItemRoot>
      </FilterTabs>
    </template>
  </ComponentPlayground>

  <!-- Multi-select with default active items -->
  <ComponentPlayground :appearance="appearance" :prop-sets="multiSelectPropSets">
    <template #default="{ props: itemProps }">
      <FilterTabs v-bind="itemProps" :theme="FilterTabsTheme">
        <ItemRootReset :theme="FilterTabsItemRootTheme">
          <TabReset :theme="TabPrimaryTheme">Select All</TabReset>
        </ItemRootReset>
        <ItemRoot :theme="FilterTabsItemRootTheme" :is-default-active="true" name="s">
          <Tab :theme="TabPrimaryTheme">S Value</Tab>
        </ItemRoot>
        <ItemRoot :theme="FilterTabsItemRootTheme" :is-default-active="true" name="m">
          <Tab :theme="TabPrimaryTheme">M Value</Tab>
        </ItemRoot>
      </FilterTabs>
    </template>
  </ComponentPlayground>
</template>

<script setup lang="ts">
import ComponentPlayground from '@/tests/e2e/ComponentPlayground.vue'
import {
  FilterTabs,
  FilterTabsTheme,
  FilterTabsItemRootTheme,
  ItemRoot,
  Tab,
  TabPrimaryTheme,
} from '../index'
import { ItemRootReset } from '../components/ItemRootReset'
import { TabReset } from '../components/Tab'
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

const multiSelectPropSets = [
  {
    isMultiSelect: [true],
  },
]
</script>
