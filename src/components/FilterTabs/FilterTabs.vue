<template>
  <div
    v-bind="$attrs"
    ref="filterTabsRef"
    :class="[
      styles.filter_tabs,
      {
        [styles.horizontal]: orientation === 'horizontal'
      },
      className
    ]"
    :style="theme"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { provideFilterTabsContext, DISPLAY_NAME } from './FilterTabs.context'
import type { FilterTabsProps } from './FilterTabs.types'
import styles from './FilterTabs.module.scss'

type Props = FilterTabsProps & {
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  className: '',
  isDisabled: false,
  orientation: 'horizontal',
})

const filterTabsRef = ref<HTMLDivElement | null>(null)
const state = ref<string[]>([])

const handleManageState = (name?: string) => {
  const prev = state.value

  let updatedState = prev

  if (!name && state.value.length) {
    updatedState = []
  }

  if (name) {
    const isSelected = state.value.includes(name)

    if (props.isMultiSelect) {
      updatedState = isSelected
        ? prev.filter((item) => item !== name)
        : [...prev, name]
    }

    if (!props.isMultiSelect && !isSelected) {
      updatedState = [name]
    }
  }

  state.value = updatedState
  props.onChange(updatedState, name)
}

const registerActiveName = (name: string) => {
  const prev = state.value

  if (props.isMultiSelect) {
    state.value = [...prev, name]
    return
  }

  if (!props.isMultiSelect && !prev.length) {
    state.value = [name]
  }
}

const contextValue = computed(() => ({
  values: state.value,
  onChange: handleManageState,
  registerActiveName,
  isDisabled: props.isDisabled,
}))

provideFilterTabsContext(contextValue.value)

watch(
  () => contextValue.value,
  (newVal) => {
    provideFilterTabsContext(newVal)
  }
)

defineExpose({
  filterTabsRef,
})
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: DISPLAY_NAME,
})
</script>
