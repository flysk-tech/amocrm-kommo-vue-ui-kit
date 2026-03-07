<template>
  <li :class="styles.search" :style="theme">
    <input
      ref="inputRef"
      :class="styles.input"
      type="text"
      :placeholder="placeholder"
      :value="multiSelectContext.searchQuery"
      @input="handleInput"
      @keydown.stop
    />
  </li>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { useMultiSelectContext } from '../../MultiSelect.context'
import type { MultiSelectSearchThemeType } from './Search.themes'
import styles from './Search.module.scss'

const DISPLAY_NAME = 'MultiSelect.Search'

const props = withDefaults(defineProps<{
  theme: MultiSelectSearchThemeType
  placeholder?: string
}>(), {
  placeholder: 'Поиск...',
})

const multiSelectContext = useMultiSelectContext(DISPLAY_NAME)

const inputRef = ref<HTMLInputElement | null>(null)

const handleInput = (e: Event) => {
  multiSelectContext.onSearchChange((e.target as HTMLInputElement).value)
}

// Auto-focus when list opens
watch(
  () => multiSelectContext.isOpened,
  (opened) => {
    if (opened) {
      nextTick(() => {
        setTimeout(() => inputRef.value?.focus(), 0)
      })
    }
  }
)
</script>
