<template>
  <!-- Closed states: disabled/enabled -->
  <ComponentPlayground :appearance="appearance" :prop-sets="disabledPropSets">
    <template #default="{ props: itemProps }">
      <div style="margin: 0 20px">
        <MultiSelect v-bind="itemProps" :theme="MultiSelectRootTheme" :items="flatItems" :value="[]">
          <MultiSelectCombobox :theme="MultiSelectComboboxTheme" placeholder="Select items" />
          <MultiSelectList :theme="ListTheme">
            <MultiSelectItem
              v-for="item in flatItems"
              :key="item.value"
              :item="item"
              :theme="MultiSelectItemTheme"
            />
          </MultiSelectList>
        </MultiSelect>
      </div>
    </template>
  </ComponentPlayground>

  <!-- Invalid/valid -->
  <ComponentPlayground :appearance="appearance" :prop-sets="invalidPropSets">
    <template #default="{ props: itemProps }">
      <div style="margin: 0 20px">
        <MultiSelect v-bind="itemProps" :theme="MultiSelectRootTheme" :items="flatItems" :value="[]">
          <MultiSelectCombobox :theme="MultiSelectComboboxTheme" placeholder="Select items" />
          <MultiSelectList :theme="ListTheme">
            <MultiSelectItem
              v-for="item in flatItems"
              :key="item.value"
              :item="item"
              :theme="MultiSelectItemTheme"
            />
          </MultiSelectList>
        </MultiSelect>
      </div>
    </template>
  </ComponentPlayground>

  <!-- Multi mode open with checkboxes -->
  <ComponentPlayground :appearance="appearance" :prop-sets="openMultiPropSets">
    <template #default="{ props: itemProps }">
      <div style="margin: 0 20px">
        <div style="height: 180px">
          <MultiSelect v-bind="itemProps" :theme="MultiSelectRootTheme" :items="flatItems">
            <MultiSelectCombobox :theme="MultiSelectComboboxTheme" placeholder="Select items" />
            <MultiSelectList :theme="ListTheme">
              <MultiSelectAll :theme="MultiSelectItemTheme" />
              <MultiSelectItem
                v-for="item in flatItems"
                :key="item.value"
                :item="item"
                :theme="MultiSelectItemTheme"
              />
            </MultiSelectList>
          </MultiSelect>
        </div>
      </div>
    </template>
  </ComponentPlayground>

  <!-- Grouped with colored headers -->
  <ComponentPlayground :appearance="appearance" :prop-sets="openGroupedPropSets">
    <template #default="{ props: itemProps }">
      <div style="margin: 0 20px">
        <div style="height: 220px">
          <MultiSelect v-bind="itemProps" :theme="MultiSelectRootTheme" :items="groupedItems" :group-selectable="true">
            <MultiSelectCombobox :theme="MultiSelectComboboxTheme" :groups="groups" placeholder="Select users" />
            <MultiSelectList :theme="ListTheme">
              <template v-for="group in groups" :key="group.id">
                <MultiSelectGroup :group="group" :theme="MultiSelectGroupTheme">
                  <MultiSelectItem
                    v-for="item in groupedItems.filter(i => i.group === group.id)"
                    :key="item.value"
                    :item="item"
                    :theme="MultiSelectItemTheme"
                  />
                </MultiSelectGroup>
              </template>
            </MultiSelectList>
          </MultiSelect>
        </div>
      </div>
    </template>
  </ComponentPlayground>

  <!-- With selection (count mode) -->
  <ComponentPlayground :appearance="appearance" :prop-sets="selectedPropSets">
    <template #default="{ props: itemProps }">
      <div style="margin: 0 20px">
        <MultiSelect v-bind="itemProps" :theme="MultiSelectRootTheme" :items="flatItems">
          <MultiSelectCombobox :theme="MultiSelectComboboxTheme" placeholder="Select items" />
          <MultiSelectList :theme="ListTheme">
            <MultiSelectItem
              v-for="item in flatItems"
              :key="item.value"
              :item="item"
              :theme="MultiSelectItemTheme"
            />
          </MultiSelectList>
        </MultiSelect>
      </div>
    </template>
  </ComponentPlayground>
</template>

<script setup lang="ts">
import ComponentPlayground from '@/tests/e2e/ComponentPlayground.vue'
import { ListTheme } from '@/components/List'
import type { Appearance } from '@/lib/appearance'

import MultiSelect from '../MultiSelect.vue'
import MultiSelectCombobox from '../components/Combobox/Combobox.vue'
import MultiSelectList from '../components/List/MultiSelectList.vue'
import MultiSelectItem from '../components/Item/Item.vue'
import MultiSelectGroup from '../components/Group/Group.vue'
import MultiSelectAll from '../components/All/All.vue'
import { MultiSelectRootTheme } from '../MultiSelect.themes'
import { MultiSelectItemTheme } from '../components/Item'
import { MultiSelectGroupTheme } from '../components/Group'
import { MultiSelectComboboxTheme } from '../components/Combobox'

import type { MultiSelectItem as MultiSelectItemType, MultiSelectGroup as MultiSelectGroupType } from '../MultiSelect.types'

defineProps<{ appearance: Appearance }>()

const flatItems: MultiSelectItemType[] = [
  { value: 1, option: 'Option 1' },
  { value: 2, option: 'Option 2' },
  { value: 3, option: 'Option 3' },
]

const groupedItems: MultiSelectItemType[] = [
  { value: 1, option: 'User 1', group: 'sales' },
  { value: 2, option: 'User 2', group: 'sales' },
  { value: 3, option: 'User 3', group: 'support' },
  { value: 4, option: 'User 4', group: 'support' },
]

const groups: MultiSelectGroupType[] = [
  { id: 'sales', label: 'Sales', color: '#e8f5e9' },
  { id: 'support', label: 'Support', color: '#e3f2fd' },
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

const openMultiPropSets = [
  {
    isDefaultOpen: [true],
    value: [[]],
  },
]

const openGroupedPropSets = [
  {
    isDefaultOpen: [true],
    value: [[]],
  },
]

const selectedPropSets = [
  {
    value: [[flatItems[0], flatItems[1]]],
  },
]
</script>
