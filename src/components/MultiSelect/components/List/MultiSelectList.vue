<template>
  <Teleport v-if="container" :to="container">
    <ul
      v-if="multiSelectContext.isOpened"
      ref="listRef"
      v-bind="$attrs"
      tabindex="0"
      role="listbox"
      :aria-multiselectable="multiSelectContext.mode === 'multi' ? 'true' : undefined"
      :class="[
        'custom-scroll',
        styles.list,
        props.class,
      ]"
      :style="theme"
      @keydown="handleKeyDown"
    >
      <slot />
      <li v-if="itemsCount === 0" :class="styles.empty">
        {{ emptyText }}
      </li>
    </ul>
  </Teleport>
  <template v-else>
    <ul
      v-if="multiSelectContext.isOpened"
      ref="listRef"
      v-bind="$attrs"
      tabindex="0"
      role="listbox"
      :aria-multiselectable="multiSelectContext.mode === 'multi' ? 'true' : undefined"
      :class="[
        'custom-scroll',
        styles.list,
        props.class,
      ]"
      :style="theme"
      @keydown="handleKeyDown"
    >
      <slot />
      <li v-if="itemsCount === 0" :class="styles.empty">
        {{ emptyText }}
      </li>
    </ul>
  </template>
</template>

<script setup lang="ts">
import { ref, computed, watch, useSlots, type VNode, nextTick } from 'vue'
import type { ListThemeType } from '@/components/List'
import { useMultiSelectContext } from '../../MultiSelect.context'
import { useOnOutsideClick } from '@/composables/useOnOutsideClick'
import type { MultiSelectItem } from '../../MultiSelect.types'
import styles from './MultiSelectList.module.scss'

const DISPLAY_NAME = 'MultiSelect.List'

const props = withDefaults(defineProps<{
  theme: ListThemeType
  class?: string
  container?: Element | DocumentFragment | null
  emptyText?: string
}>(), {
  emptyText: 'Нет элементов',
})

const multiSelectContext = useMultiSelectContext(DISPLAY_NAME)

const listRef = ref<HTMLUListElement | null>(null)

// Build items array from slot children for keyboard navigation
const slots = useSlots()

function extractItems(vnodes: VNode[]): MultiSelectItem[] {
  const result: MultiSelectItem[] = []
  for (const vnode of vnodes) {
    if (vnode.props?.item) {
      result.push(vnode.props.item as MultiSelectItem)
    }
    // Recurse into Fragment children (e.g. v-for, groups)
    if (Array.isArray(vnode.children)) {
      result.push(...extractItems(vnode.children as VNode[]))
    }
  }
  return result
}

const items = computed(() => {
  if (!slots.default) return [] as MultiSelectItem[]
  const children = slots.default()
  return extractItems(children)
})

const itemsCount = computed(() => items.value.length)

const itemsMap = computed(() => {
  const map: Record<string, number> = {}
  items.value.forEach((item, index) => {
    if (item?.value !== undefined) {
      map[String(item.value)] = index
    }
  })
  return map
})

// Local hovered index for keyboard navigation
const localHoveredIndex = ref(-1)

// Sync local index when context hovered value changes externally
const currentHoveredIndex = computed(() => {
  const val = multiSelectContext.hoveredItemValue
  if (val === null) return -1
  const idx = itemsMap.value[String(val)]
  return idx ?? -1
})

// Update local when list opens
watch(
  () => multiSelectContext.isOpened,
  (opened) => {
    if (opened) {
      localHoveredIndex.value = currentHoveredIndex.value
    }
  }
)

const handleKeyDown = (event: KeyboardEvent) => {
  const total = itemsCount.value
  let idx = localHoveredIndex.value

  switch (event.code) {
    case 'ArrowDown':
      event.preventDefault()
      if (idx < total - 1) {
        idx++
        localHoveredIndex.value = idx
        const item = items.value[idx]
        if (item) {
          multiSelectContext.onHoveredItemChange(item.value)
        }
      }
      break

    case 'ArrowUp':
      event.preventDefault()
      if (idx > 0) {
        idx--
        localHoveredIndex.value = idx
        const item = items.value[idx]
        if (item) {
          multiSelectContext.onHoveredItemChange(item.value)
        }
      }
      break

    case 'Enter':
    case 'Space':
      event.preventDefault()
      if (idx >= 0 && idx < total) {
        const item = items.value[idx]
        if (item) {
          multiSelectContext.onToggleItem(item)
        }
      }
      break

    case 'Escape':
      event.preventDefault()
      multiSelectContext.onOpen(false)
      break
  }
}

// Outside click to close
useOnOutsideClick({
  ref: listRef,
  handler: () => {
    if (multiSelectContext.isOpened) {
      multiSelectContext.onOpen(false)
    }
  },
})

// Focus the list when opened
watch(
  () => multiSelectContext.isOpened,
  (opened) => {
    if (opened) {
      // nextTick handled by Vue reactivity — the ref is available after v-if renders
      setTimeout(() => {
        listRef.value?.focus()
      }, 0)
    }
  }
)

defineExpose({
  listRef,
  items,
  itemsMap,
})
</script>
