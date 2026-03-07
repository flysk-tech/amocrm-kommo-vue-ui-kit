<template>
  <li v-if="isVisible" :class="styles.group" role="group" :aria-label="group.label">
    <div
      :class="[
        styles.header,
        {
          [styles.headerSelectable]: multiSelectContext.groupSelectable
        }
      ]"
      :style="headerStyle"
      :title="group.label"
      @click="handleHeaderClick"
    >
      <Checkbox
        v-if="multiSelectContext.groupSelectable"
        :theme="checkboxTheme"
        :is-checked="isChecked"
        :checked-style="checkedStyle"
        :tabindex="-1"
        @click.stop
      />
      <span :class="styles.label">{{ group.label }}</span>
    </div>
    <ul :class="styles.children">
      <slot />
      <li v-if="hasNoChildren" :class="styles.empty">
        {{ emptyText }}
      </li>
    </ul>
  </li>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'
import Checkbox from '@/components/Checkbox/Checkbox.vue'
import { CheckboxLightTheme } from '@/components/Checkbox/Checkbox.themes'
import { useMultiSelectContext } from '../../MultiSelect.context'
import type { MultiSelectGroup as MultiSelectGroupType } from '../../MultiSelect.types'
import type { CheckedStyleType } from '@/components/Checkbox/Checkbox.types'
import styles from './Group.module.scss'

const DISPLAY_NAME = 'MultiSelect.Group'

const COLOR_PATTERN = /^(#[\da-f]{3,8}|rgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*(,\s*(0|1|0?\.\d+))?\s*\)|hsla?\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*(,\s*(0|1|0?\.\d+))?\s*\)|[a-z]{3,20})$/i

import type { MultiSelectGroupThemeType } from './Group.themes'

const props = withDefaults(defineProps<{
  group: MultiSelectGroupType
  theme: MultiSelectGroupThemeType
  emptyText?: string
}>(), {
  emptyText: 'Нет элементов',
})

const multiSelectContext = useMultiSelectContext(DISPLAY_NAME)

const isVisible = computed(() => multiSelectContext.isGroupMatchingSearch(props.group.id))

const checkboxTheme = CheckboxLightTheme

const slots = useSlots()
const hasNoChildren = computed(() => {
  if (!slots.default) return true
  const children = slots.default()
  return children.length === 0
})

const isGroupAllSelected = computed(() =>
  multiSelectContext.isGroupAllSelected(props.group.id)
)
const isGroupPartiallySelected = computed(() =>
  multiSelectContext.isGroupPartiallySelected(props.group.id)
)

const isChecked = computed(() =>
  isGroupAllSelected.value || isGroupPartiallySelected.value
)

const checkedStyle = computed<CheckedStyleType>(() =>
  isGroupAllSelected.value ? 'mark' : 'indeterminate'
)

const isValidColor = (color: string): boolean => {
  return COLOR_PATTERN.test(color.trim())
}

const headerStyle = computed(() => {
  const base = { ...props.theme } as Record<string, string>
  if (props.group.color && isValidColor(props.group.color)) {
    base.backgroundColor = props.group.color
  }
  return base
})

const handleHeaderClick = () => {
  if (multiSelectContext.groupSelectable) {
    multiSelectContext.onToggleGroup(props.group.id)
  }
}
</script>
