<template>
  <ul
    v-if="isOpened"
    v-bind="$attrs"
    ref="listRef"
    tabindex="0"
    role="list"
    :class="[
      styles.list,
      {
        [styles.opened]: isOpened
      },
    ]"
    :style="theme"
    @keydown="handleKeyDown"
  >
    <slot />
  </ul>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ListProps } from './List.types'
import styles from './List.module.scss'

type Props = ListProps

const props = withDefaults(defineProps<Props>(), {
  hoveredIndex: 0,
})

const emit = defineEmits<{
  (e: 'select', index: number): void
  (e: 'toggle', toggle: boolean): void
  (e: 'hoveredIndexChange', index: number): void
}>()

const listRef = ref<HTMLUListElement | null>(null)

const slots = defineSlots()
const itemsLength = computed(() => {
  if (!slots.default) return 0
  const children = slots.default()
  return children.length
})

const handleKeyDown = (event: KeyboardEvent) => {
  const { hoveredIndex } = props

  switch (event.code) {
    case 'ArrowDown':
      event.preventDefault()
      if (hoveredIndex < itemsLength.value - 1) {
        emit('hoveredIndexChange', hoveredIndex + 1)
      }
      break

    case 'ArrowUp':
      event.preventDefault()
      if (hoveredIndex > 0) {
        emit('hoveredIndexChange', hoveredIndex - 1)
      }
      break

    case 'Enter':
    case 'Space':
      event.preventDefault()
      emit('select', hoveredIndex)
      break

    case 'Escape':
      event.preventDefault()
      emit('toggle', false)
      break
  }
}

defineExpose({
  listRef,
})
</script>
