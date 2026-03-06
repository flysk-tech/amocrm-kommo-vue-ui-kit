<template>
  <ul
    v-if="isOpened"
    v-bind="$attrs"
    ref="listRef"
    tabindex="0"
    role="list"
    :class="[
      'custom-scroll',
      styles.list,
      {
        [styles.opened]: isOpened
      },
      className
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

type Props = ListProps & {
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  className: '',
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
        const newIndex = hoveredIndex + 1
        emit('hoveredIndexChange', newIndex)
        if (props.onHoveredIndexChange) {
          props.onHoveredIndexChange(newIndex)
        }
      }
      break

    case 'ArrowUp':
      event.preventDefault()
      if (hoveredIndex > 0) {
        const newIndex = hoveredIndex - 1
        emit('hoveredIndexChange', newIndex)
        if (props.onHoveredIndexChange) {
          props.onHoveredIndexChange(newIndex)
        }
      }
      break

    case 'Enter':
    case 'Space':
      event.preventDefault()
      emit('select', hoveredIndex)
      if (props.onSelect) {
        props.onSelect(hoveredIndex)
      }
      break

    case 'Escape':
      event.preventDefault()
      emit('toggle', false)
      if (props.onToggle) {
        props.onToggle(false)
      }
      break
  }
}

defineExpose({
  listRef,
})
</script>
