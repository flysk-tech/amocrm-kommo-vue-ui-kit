<template>
  <li
    ref="itemRef"
    v-bind="$attrs"
    :class="[
      styles.item,
      {
        [styles.selected]: isSelected,
        [styles.hovered]: isHovered,
      },
      props.class,
    ]"
    :style="theme"
    @click="handleClick"
  >
    <slot>
      <Option>{{ item.option }}</Option>
    </slot>
  </li>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useSelectContext } from '../../Select.context'
import type { SelectItem } from '../../Select.types'
import Option from '../Option/Option.vue'
import type { SelectItemThemeType } from './Item.themes'
import styles from './Item.module.scss'

const DISPLAY_NAME = 'Select.Item'

const props = defineProps<{
  item: SelectItem
  index: number
  class?: string
  theme: SelectItemThemeType
}>()

const selectContext = useSelectContext(DISPLAY_NAME)

const itemRef = ref<HTMLLIElement | null>(null)

const isSelected = computed(() => selectContext.value?.value === props.item.value)
const isHovered = computed(() => selectContext.hoveredIndex === props.index)

const handleClick = (e: MouseEvent) => {
  e.preventDefault()
  selectContext.onHoveredIndexChange(props.index)
  if (typeof selectContext.onChange === 'function') {
    selectContext.onChange(props.item)
  }
}

defineExpose({
  itemRef,
})
</script>
