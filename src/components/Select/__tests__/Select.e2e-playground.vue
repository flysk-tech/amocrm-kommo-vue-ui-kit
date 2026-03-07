<template>
  <!-- Disabled / enabled -->
  <ComponentPlayground :appearance="appearance" :prop-sets="disabledPropSets">
    <template #default="{ props: itemProps }">
      <div style="margin: 0 20px">
        <Select v-bind="itemProps" :theme="SelectRootTheme">
          <SelectTrigger :theme="SelectButtonLightTheme">
            <SelectValue placeholder="Select option" />
            <SelectArrow :theme="SelectArrowTheme" />
          </SelectTrigger>
          <SelectList :theme="ListTheme">
            <SelectItem
              v-for="(item, index) in items"
              :key="item.value"
              :item="item"
              :index="index"
              :theme="SelectItemTheme"
            />
          </SelectList>
        </Select>
      </div>
    </template>
  </ComponentPlayground>

  <!-- Invalid / valid -->
  <ComponentPlayground :appearance="appearance" :prop-sets="invalidPropSets">
    <template #default="{ props: itemProps }">
      <div style="margin: 0 20px">
        <Select v-bind="itemProps" :theme="SelectRootTheme">
          <SelectTrigger :theme="SelectButtonLightTheme">
            <SelectValue placeholder="Select option" />
            <SelectArrow :theme="SelectArrowTheme" />
          </SelectTrigger>
          <SelectList :theme="ListTheme">
            <SelectItem
              v-for="(item, index) in items"
              :key="item.value"
              :item="item"
              :index="index"
              :theme="SelectItemTheme"
            />
          </SelectList>
        </Select>
      </div>
    </template>
  </ComponentPlayground>

  <!-- Closed state -->
  <ComponentPlayground :appearance="appearance" :prop-sets="closedPropSets">
    <template #default="{ props: itemProps }">
      <div style="margin: 0 20px">
        <Select v-bind="itemProps" :theme="SelectRootTheme">
          <SelectTrigger :theme="SelectButtonLightTheme">
            <SelectValue placeholder="Select option" />
            <SelectArrow :theme="SelectArrowTheme" />
          </SelectTrigger>
          <SelectList :theme="ListTheme">
            <SelectItem
              v-for="(item, index) in items"
              :key="item.value"
              :item="item"
              :index="index"
              :theme="SelectItemTheme"
            />
          </SelectList>
        </Select>
      </div>
    </template>
  </ComponentPlayground>

  <!-- Open state -->
  <ComponentPlayground :appearance="appearance" :prop-sets="openPropSets">
    <template #default="{ props: itemProps }">
      <div style="margin: 0 20px">
        <div style="height: 110px">
          <Select v-bind="itemProps" :theme="SelectRootTheme">
            <SelectTrigger :theme="SelectButtonLightTheme">
              <SelectValue placeholder="Select option" />
              <SelectArrow :theme="SelectArrowTheme" />
            </SelectTrigger>
            <SelectList :theme="ListTheme">
              <SelectItem
                v-for="(item, index) in items"
                :key="item.value"
                :item="item"
                :index="index"
                :theme="SelectItemTheme"
              />
            </SelectList>
          </Select>
        </div>
      </div>
    </template>
  </ComponentPlayground>

  <!-- Open state with default value -->
  <ComponentPlayground :appearance="appearance" :prop-sets="openWithValuePropSets">
    <template #default="{ props: itemProps }">
      <div style="margin: 0 20px">
        <div style="height: 110px">
          <Select v-bind="itemProps" :theme="SelectRootTheme">
            <SelectTrigger :theme="SelectButtonLightTheme">
              <SelectValue placeholder="Select option" />
              <SelectArrow :theme="SelectArrowTheme" />
            </SelectTrigger>
            <SelectList :theme="ListTheme">
              <SelectItem
                v-for="(item, index) in items"
                :key="item.value"
                :item="item"
                :index="index"
                :theme="SelectItemTheme"
              />
            </SelectList>
          </Select>
        </div>
      </div>
    </template>
  </ComponentPlayground>
</template>

<script setup lang="ts">
import ComponentPlayground from '@/tests/e2e/ComponentPlayground.vue'
import { SelectButtonLightTheme } from '@/components/SelectButton'
import { ListTheme } from '@/components/List'
import {
  Select,
  SelectRootTheme,
  SelectArrowTheme,
  SelectItemTheme,
  SelectTrigger,
  SelectList,
  SelectItem,
  SelectValue,
  SelectArrow,
} from '../index'
import type { SelectItem as SelectItemType } from '../Select.types'
import type { Appearance } from '@/lib/appearance'

defineProps<{ appearance: Appearance }>()

const items: SelectItemType[] = [
  { value: 'option1', option: 'Option 1' },
  { value: 'option2', option: 'Option 2' },
  { value: 'option3', option: 'Option 3' },
]

const disabledPropSets = [
  {
    isDisabled: [true, false],
  },
]

const invalidPropSets = [
  {
    isInvalid: [true, false],
  },
]

const closedPropSets = [
  {
    isDefaultOpen: [false],
  },
]

const openPropSets = [
  {
    isDefaultOpen: [true],
  },
]

const openWithValuePropSets = [
  {
    isDefaultOpen: [true],
    defaultValue: [items[0]],
  },
]
</script>
