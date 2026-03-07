<template>
  <div
    v-bind="$attrs"
    ref="multiSelectRef"
    :class="[
      styles.multiselect,
      {
        [styles.opened]: currentIsOpen
      }
    ]"
    :style="theme"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, watch, getCurrentInstance } from 'vue'
import { provideMultiSelectContext, DISPLAY_NAME } from './MultiSelect.context'
import type { MultiSelectProps, MultiSelectItem } from './MultiSelect.types'
import styles from './MultiSelect.module.scss'

type Props = MultiSelectProps

const props = withDefaults(defineProps<Props>(), {
  mode: 'multi',
  groupSelectable: false,
})

const emit = defineEmits<{
  (e: 'change', items: MultiSelectItem[]): void
  (e: 'openChange', open: boolean): void
}>()

const multiSelectRef = ref<HTMLDivElement | null>(null)
const internalIsOpened = ref(props.isDefaultOpen ?? false)
const internalHoveredValue = ref<string | number | null>(null)
const searchQuery = ref('')

// Internal values Set for uncontrolled mode
const internalValues = ref<Set<string | number>>(
  new Set((props.defaultValue ?? []).map(item => item.value))
)

const isControlled = computed(() => props.value !== undefined)

// Check if isOpen was actually passed by the parent
const instance = getCurrentInstance()
const isOpenControlled = computed(() => {
  const vnode = instance?.vnode
  return vnode?.props ? ('isOpen' in vnode.props || 'is-open' in vnode.props) : false
})

// Current values Set (controlled or internal)
const currentValues = computed(() => {
  if (isControlled.value) {
    return new Set((props.value ?? []).map(item => item.value))
  }
  return internalValues.value
})

const currentIsOpen = computed(() =>
  isOpenControlled.value ? Boolean(props.isOpen) : internalIsOpened.value
)

// All available items (flat list)
const allItems = computed(() => props.items ?? [])

// Resolve selected values back to full MultiSelectItem objects
const selectedItems = computed(() => {
  const vals = currentValues.value
  return allItems.value.filter(item => vals.has(item.value))
})

const handleOpen = (open: boolean) => {
  if (!(props.isDisabled ?? false)) {
    if (!isOpenControlled.value) {
      internalIsOpened.value = open
    }
    if (!open) {
      searchQuery.value = ''
    }
    emit('openChange', open)
  }
}

const handleToggleItem = (item: MultiSelectItem) => {
  if (props.mode === 'single') {
    // Single mode: select item, close dropdown
    if (!isControlled.value) {
      internalValues.value = new Set([item.value])
    }
    emit('change', [item])
    handleOpen(false)
  } else {
    // Multi mode: toggle item in Set, keep dropdown open
    const newValues = new Set(currentValues.value)
    if (newValues.has(item.value)) {
      newValues.delete(item.value)
    } else {
      newValues.add(item.value)
    }
    if (!isControlled.value) {
      internalValues.value = newValues
    }
    const selected = allItems.value.filter(i => newValues.has(i.value))
    emit('change', selected)
  }
}

const handleToggleGroup = (groupId: string | number) => {
  const groupItems = allItems.value.filter(item => item.group === groupId)
  if (groupItems.length === 0) return

  const allSelected = groupItems.every(item => currentValues.value.has(item.value))
  const newValues = new Set(currentValues.value)

  if (allSelected) {
    groupItems.forEach(item => newValues.delete(item.value))
  } else {
    groupItems.forEach(item => newValues.add(item.value))
  }

  if (!isControlled.value) {
    internalValues.value = newValues
  }
  const selected = allItems.value.filter(i => newValues.has(i.value))
  emit('change', selected)
}

const handleToggleAll = () => {
  const allSelected = allItems.value.length > 0 &&
    allItems.value.every(item => currentValues.value.has(item.value))
  const newValues = new Set<string | number>()

  if (!allSelected) {
    allItems.value.forEach(item => newValues.add(item.value))
  }

  if (!isControlled.value) {
    internalValues.value = newValues
  }
  const selected = allItems.value.filter(i => newValues.has(i.value))
  emit('change', selected)
}

const getGroupItems = (groupId: string | number): MultiSelectItem[] => {
  return allItems.value.filter(item => item.group === groupId)
}

const isGroupAllSelected = (groupId: string | number): boolean => {
  const groupItems = getGroupItems(groupId)
  return groupItems.length > 0 && groupItems.every(item => currentValues.value.has(item.value))
}

const isGroupPartiallySelected = (groupId: string | number): boolean => {
  const groupItems = getGroupItems(groupId)
  const selectedCount = groupItems.filter(item => currentValues.value.has(item.value)).length
  return selectedCount > 0 && selectedCount < groupItems.length
}

const isAllSelected = (): boolean => {
  return allItems.value.length > 0 &&
    allItems.value.every(item => currentValues.value.has(item.value))
}

const isPartiallySelected = (): boolean => {
  const selectedCount = allItems.value.filter(item => currentValues.value.has(item.value)).length
  return selectedCount > 0 && selectedCount < allItems.value.length
}

const handleHoveredItemChange = (value: string | number | null) => {
  internalHoveredValue.value = value
}

const handleSearchChange = (query: string) => {
  searchQuery.value = query
}

const isItemMatchingSearch = (item: MultiSelectItem): boolean => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return true
  return item.option.toLowerCase().includes(q)
}

const isGroupMatchingSearch = (groupId: string | number): boolean => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return true
  const groupItems = getGroupItems(groupId)
  return groupItems.some(item => item.option.toLowerCase().includes(q))
}

// Watch items prop — remove stale selected values
watch(
  () => props.items,
  (newItems) => {
    if (!newItems) return
    const validValues = new Set(newItems.map(item => item.value))
    const currentVals = currentValues.value
    const staleValues = [...currentVals].filter(v => !validValues.has(v))

    if (staleValues.length > 0) {
      const newValues = new Set(currentVals)
      staleValues.forEach(v => newValues.delete(v))

      if (!isControlled.value) {
        internalValues.value = newValues
      }
      const selected = newItems.filter(i => newValues.has(i.value))
      emit('change', selected)
    }
  },
  { deep: true }
)

const context = reactive({
  get values() { return currentValues.value },
  get selectedItems() { return selectedItems.value },
  get isOpened() { return currentIsOpen.value },
  get isDisabled() { return props.isDisabled ?? false },
  get isInvalid() { return props.isInvalid ?? false },
  get hoveredItemValue() { return internalHoveredValue.value },
  get mode() { return props.mode ?? 'multi' },
  get groupSelectable() { return props.groupSelectable ?? false },
  get searchQuery() { return searchQuery.value },
  onOpen: handleOpen,
  onToggleItem: handleToggleItem,
  onToggleGroup: handleToggleGroup,
  onToggleAll: handleToggleAll,
  onHoveredItemChange: handleHoveredItemChange,
  onSearchChange: handleSearchChange,
  isItemMatchingSearch,
  isGroupMatchingSearch,
  getGroupItems,
  isGroupAllSelected,
  isGroupPartiallySelected,
  isAllSelected,
  isPartiallySelected,
})

provideMultiSelectContext(context as any)

defineExpose({
  multiSelectRef,
})
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: DISPLAY_NAME,
})
</script>
