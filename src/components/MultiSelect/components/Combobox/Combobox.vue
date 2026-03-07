<template>
  <div :class="styles.combobox" :style="theme">
    <div
      ref="containerRef"
      :class="[
        styles.inputContainer,
        {
          [styles.focused]: multiSelectContext.isOpened,
          [styles.invalid]: multiSelectContext.isInvalid,
          [styles.disabled]: multiSelectContext.isDisabled,
        }
      ]"
      @click="handleContainerClick"
    >
      <input
        ref="inputRef"
        :class="styles.input"
        type="text"
        :placeholder="placeholder"
        :value="multiSelectContext.isOpened ? multiSelectContext.searchQuery : displayText"
        :disabled="multiSelectContext.isDisabled"
        :readonly="!multiSelectContext.isOpened"
        @input="handleInput"
        @focus="handleFocus"
        @keydown="handleKeyDown"
      />
      <slot name="after">
        <span :class="[styles.arrow, { [styles.arrowOpen]: multiSelectContext.isOpened }]" />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { useMultiSelectContext } from '../../MultiSelect.context'
import type { MultiSelectGroup } from '../../MultiSelect.types'
import type { MultiSelectComboboxThemeType } from './Combobox.themes'
import styles from './Combobox.module.scss'

const DISPLAY_NAME = 'MultiSelect.Combobox'

const props = withDefaults(defineProps<{
  theme: MultiSelectComboboxThemeType
  placeholder?: string
  groups?: MultiSelectGroup[]
}>(), {
  placeholder: 'Поиск...',
})

const multiSelectContext = useMultiSelectContext(DISPLAY_NAME)

const inputRef = ref<HTMLInputElement | null>(null)
const containerRef = ref<HTMLDivElement | null>(null)

const groupsMap = computed(() => {
  if (!props.groups) return null
  const map = new Map<string | number, string>()
  for (const g of props.groups) {
    map.set(g.id, g.label)
  }
  return map
})

const displayText = computed(() => {
  if (multiSelectContext.isOpened) return ''
  const items = multiSelectContext.selectedItems
  if (items.length === 0) return ''
  if (items.length === 1) return items[0].option
  if (multiSelectContext.isAllSelected()) return `Все (${items.length})`

  // Group-aware display: show group name only when entire group is selected
  if (groupsMap.value && items.every(i => i.group != null)) {
    const groupIds = [...new Set(items.map(i => i.group!))]
    const fullySelectedGroups = groupIds.filter(id => multiSelectContext.isGroupAllSelected(id))

    if (fullySelectedGroups.length > 0 && fullySelectedGroups.length === groupIds.length) {
      if (fullySelectedGroups.length === 1) {
        const label = groupsMap.value.get(fullySelectedGroups[0])
        if (label) return `${label} (${items.length})`
      }
      const firstLabel = groupsMap.value.get(fullySelectedGroups[0])
      if (firstLabel) {
        return fullySelectedGroups.length === 2
          ? `${firstLabel}, ${groupsMap.value.get(fullySelectedGroups[1])}`
          : `${firstLabel} +${fullySelectedGroups.length - 1}`
      }
    }
  }

  return `${items[0].option} +${items.length - 1}`
})

const handleInput = (e: Event) => {
  const value = (e.target as HTMLInputElement).value
  multiSelectContext.onSearchChange(value)
}

const handleFocus = () => {
  if (!multiSelectContext.isDisabled) {
    multiSelectContext.onOpen(true)
  }
}

const handleContainerClick = () => {
  inputRef.value?.focus()
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.code === 'Escape') {
    multiSelectContext.onOpen(false)
    inputRef.value?.blur()
  }
}

// Keep input focused while dropdown is open
watch(() => multiSelectContext.isOpened, (opened) => {
  if (opened) {
    nextTick(() => inputRef.value?.focus())
  }
})

defineExpose({ inputRef })
</script>
