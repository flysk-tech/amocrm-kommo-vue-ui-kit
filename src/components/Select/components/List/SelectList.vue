<template>
  <Teleport v-if="container" :to="container">
    <BaseList
      ref="listRef"
      :class="props.class"
      :is-opened="selectContext.isOpened"
      :theme="theme"
      :hovered-index="effectiveHoveredIndex"
      @hovered-index-change="handleHoveredIndexChange"
      @toggle="handleListToggle"
      @select="handleItemSelect"
    >
      <slot />
    </BaseList>
  </Teleport>
  <BaseList
    v-else
    ref="listRef"
    :class="props.class"
    :is-opened="selectContext.isOpened"
    :theme="theme"
    :hovered-index="effectiveHoveredIndex"
    @hovered-index-change="handleHoveredIndexChange"
    @toggle="handleListToggle"
    @select="handleItemSelect"
  >
    <slot />
  </BaseList>
</template>

<script setup lang="ts">
import { ref, computed, watch, useSlots } from 'vue'
import BaseList from '@/components/List/List.vue'
import type { ListThemeType } from '@/components/List'
import { useSelectContext } from '../../Select.context'
import { useOnOutsideClick } from '@/composables/useOnOutsideClick'
import type { SelectItem } from '../../Select.types'

const DISPLAY_NAME = 'Select.List'

const props = defineProps<{
  theme: ListThemeType
  class?: string
  container?: Element | DocumentFragment | null
}>()

const selectContext = useSelectContext(DISPLAY_NAME)

const listRef = ref<InstanceType<typeof BaseList> | null>(null)

// Build items array from slot children for handleItemSelect
const slots = useSlots()
const items = computed(() => {
  if (!slots.default) return [] as SelectItem[]
  const children = slots.default()
  return children.map((child) => {
    return child.props?.item as SelectItem
  }).filter(Boolean)
})

const itemsMap = computed(() => {
  const map: Record<string, number> = {}
  items.value.forEach((item, index) => {
    if (item?.value !== undefined) {
      map[String(item.value)] = index
    }
  })
  return map
})

const effectiveHoveredIndex = computed(() => {
  if (selectContext.value) {
    const idx = itemsMap.value[String(selectContext.value.value)]
    if (idx !== undefined) return idx
  }
  return selectContext.hoveredIndex
})

const handleHoveredIndexChange = (index: number) => {
  selectContext.onHoveredIndexChange(index)
}

const handleListToggle = (toggle: boolean) => {
  selectContext.onOpen(toggle)
}

const handleItemSelect = (index: number) => {
  const item = items.value[index]
  if (item && typeof selectContext.onChange === 'function') {
    selectContext.onChange(item)
  }
}

// Outside click to close
const listElRef = computed(() => listRef.value?.listRef ?? null)

useOnOutsideClick({
  ref: listElRef,
  handler: () => {
    if (selectContext.isOpened) {
      selectContext.onOpen(false)
    }
  },
})

// Focus the list when opened
watch(
  () => selectContext.isOpened,
  (opened) => {
    if (opened) {
      listRef.value?.listRef?.focus()
    }
  }
)

defineExpose({
  listRef,
})
</script>
