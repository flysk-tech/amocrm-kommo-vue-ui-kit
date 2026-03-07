<template>
  <li
    v-if="isVisible"
    ref="itemRef"
    v-bind="$attrs"
    role="option"
    :aria-selected="isSelected"
    :class="[
      styles.item,
      {
        [styles.selected]: isSelected,
        [styles.hovered]: isHovered,
      },
    ]"
    :style="theme"
    :title="item.option"
    @click="handleClick"
  >
    <Checkbox
      v-if="multiSelectContext.mode === 'multi'"
      :theme="checkboxTheme"
      :is-checked="isSelected"
      :tabindex="-1"
      @click.stop
    />
    <slot>
      <Option>{{ item.option }}</Option>
    </slot>
  </li>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Checkbox from '@/components/Checkbox/Checkbox.vue'
import { CheckboxLightTheme } from '@/components/Checkbox/Checkbox.themes'
import Option from '@/components/Select/components/Option/Option.vue'
import { useMultiSelectContext } from '../../MultiSelect.context'
import type { MultiSelectItem as MultiSelectItemType } from '../../MultiSelect.types'
import type { MultiSelectItemThemeType } from './Item.themes'
import styles from './Item.module.scss'

const DISPLAY_NAME = 'MultiSelect.Item'

const props = defineProps<{
  item: MultiSelectItemType
  theme: MultiSelectItemThemeType
}>()

const multiSelectContext = useMultiSelectContext(DISPLAY_NAME)

const itemRef = ref<HTMLLIElement | null>(null)

const checkboxTheme = CheckboxLightTheme

const isVisible = computed(() => multiSelectContext.isItemMatchingSearch(props.item))
const isSelected = computed(() => multiSelectContext.values.has(props.item.value))
const isHovered = computed(() => multiSelectContext.hoveredItemValue === props.item.value)

const handleClick = (e: MouseEvent) => {
  e.preventDefault()
  multiSelectContext.onToggleItem(props.item)
}

defineExpose({
  itemRef,
})
</script>
