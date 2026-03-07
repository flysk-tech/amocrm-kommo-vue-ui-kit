<template>
  <li
    :class="styles.item"
    :style="theme"
    @click="handleClick"
  >
    <Checkbox
      :theme="checkboxTheme"
      :is-checked="isChecked"
      :checked-style="checkedStyle"
      :tabindex="-1"
      @click.stop
    />
    <Option>{{ label }}</Option>
  </li>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Checkbox from '@/components/Checkbox/Checkbox.vue'
import { CheckboxLightTheme } from '@/components/Checkbox/Checkbox.themes'
import Option from '@/components/Select/components/Option/Option.vue'
import { useMultiSelectContext } from '../../MultiSelect.context'
import type { MultiSelectItemThemeType } from '../Item/Item.themes'
import type { CheckedStyleType } from '@/components/Checkbox/Checkbox.types'
import styles from '../Item/Item.module.scss'

const DISPLAY_NAME = 'MultiSelect.All'

const props = withDefaults(defineProps<{
  theme: MultiSelectItemThemeType
  label?: string
}>(), {
  label: 'Выбрать всё',
})

const multiSelectContext = useMultiSelectContext(DISPLAY_NAME)

const checkboxTheme = CheckboxLightTheme

const isAllSelected = computed(() => multiSelectContext.isAllSelected())
const isPartiallySelected = computed(() => multiSelectContext.isPartiallySelected())

const isChecked = computed(() =>
  isAllSelected.value || isPartiallySelected.value
)

const checkedStyle = computed<CheckedStyleType>(() =>
  isAllSelected.value ? 'mark' : 'indeterminate'
)

const handleClick = (e: MouseEvent) => {
  e.preventDefault()
  multiSelectContext.onToggleAll()
}
</script>
