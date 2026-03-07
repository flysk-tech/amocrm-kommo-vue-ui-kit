<template>
  <div
    v-bind="$attrs"
    ref="selectRef"
    :class="[
      styles.select,
      {
        [styles.opened]: currentIsOpen
      }
    ]"
    :style="theme"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, useAttrs, getCurrentInstance } from 'vue'
import { provideSelectContext, DISPLAY_NAME } from './Select.context'
import type { SelectProps, SelectItem } from './Select.types'
import styles from './Select.module.scss'

const BASE_HOVER_INDEX = -1

type Props = SelectProps

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'change', item: SelectItem): void
  (e: 'openChange', open: boolean): void
}>()

const selectRef = ref<HTMLDivElement | null>(null)
const internalIsOpened = ref(props.isDefaultOpen ?? false)
const internalHoveredIndex = ref(BASE_HOVER_INDEX)
const internalDefaultValue = ref<SelectItem | undefined>(props.defaultValue)

const isControlled = computed(() => props.value !== undefined)

// Check if isOpen was actually passed by the parent (Vue Boolean default is false)
const instance = getCurrentInstance()
const isOpenControlled = computed(() => {
  const vnode = instance?.vnode
  return vnode?.props ? ('isOpen' in vnode.props || 'is-open' in vnode.props) : false
})

const selected = computed(() =>
  isControlled.value ? props.value : internalDefaultValue.value
)

const currentIsOpen = computed(() =>
  isOpenControlled.value ? Boolean(props.isOpen) : internalIsOpened.value
)

const handleOpen = (open: boolean) => {
  if (!(props.isDisabled ?? false) && !isOpenControlled.value) {
    internalIsOpened.value = open
    emit('openChange', open)
  }
}

const handleChange = (item: SelectItem) => {
  if (!isControlled.value) {
    internalDefaultValue.value = item
  }

  emit('change', item)
  internalIsOpened.value = false
}

const handleHoveredIndexChange = (index: number) => {
  internalHoveredIndex.value = index
}

// Use getters for reactive context
const context = reactive({
  get hoveredIndex() { return internalHoveredIndex.value },
  set hoveredIndex(v) { internalHoveredIndex.value = v },
  onHoveredIndexChange: handleHoveredIndexChange,
  onChange: handleChange,
  get isOpened() { return currentIsOpen.value },
  onOpen: handleOpen,
  get isDisabled() { return props.isDisabled ?? false },
  get isInvalid() { return props.isInvalid ?? false },
  get value() { return selected.value },
  get defaultValue() { return props.defaultValue },
})

provideSelectContext(context as any)

defineExpose({
  selectRef,
})
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: DISPLAY_NAME,
})
</script>
