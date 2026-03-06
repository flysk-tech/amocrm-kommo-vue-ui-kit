<template>
  <div
    v-bind="$attrs"
    ref="filterTabsRef"
    :class="[
      styles.filter_tabs,
      {
        [styles.horizontal]: orientation === 'horizontal'
      },
    ]"
    :style="theme"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watchEffect } from 'vue'
import { provideFilterTabsContext, DISPLAY_NAME } from './FilterTabs.context'
import type { FilterTabsProps } from './FilterTabs.types'
import styles from './FilterTabs.module.scss'

type Props = FilterTabsProps

const props = withDefaults(defineProps<Props>(), {
  isDisabled: false,
  orientation: 'horizontal',
})

const emit = defineEmits<{
  (e: 'change', updatedValues: string[], trigger?: string): void
}>()

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
  emit('change', updatedState, name)
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

const context = reactive({
  values: state.value,
  onChange: handleManageState,
  registerActiveName,
  isDisabled: props.isDisabled,
})

watchEffect(() => {
  context.values = state.value
  context.isDisabled = props.isDisabled
})

provideFilterTabsContext(context as any)

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
