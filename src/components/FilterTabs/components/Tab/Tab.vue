<template>
  <button
    ref="buttonRef"
    v-bind="restProps"
    :class="[
      styles.button,
      {
        [styles.selected]: isSelected
      },
      className
    ]"
    :style="theme"
    :name="name"
    :disabled="isDisabled || isItemRootDisabled"
    @click="handleChange"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useFilterTabsContext } from '../../FilterTabs.context'
import { useTabItemRootContext } from '../ItemRoot/ItemRoot.context'
import type { TabProps } from './Tab.types'
import styles from './Tab.module.scss'

const DISPLAY_NAME = 'FilterTabs.Tab'

type Props = TabProps & {
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  class: '',
})

const { theme, class: className, ...restProps } = props

const buttonRef = ref<HTMLButtonElement | null>(null)

const filterTabsContext = useFilterTabsContext(DISPLAY_NAME)

const { name, isDisabled: isItemRootDisabled } =
  useTabItemRootContext(DISPLAY_NAME)

const isSelected = computed(() => filterTabsContext.values.includes(name))
const isDisabled = computed(() => filterTabsContext.isDisabled)

const handleChange = () => {
  filterTabsContext.onChange(name)
}

defineExpose({
  buttonRef,
})
</script>
