<template>
  <div
    v-bind="$attrs"
    ref="selectRef"
    :class="[
      styles.select,
      {
        [styles.opened]: isOpen
      }
    ]"
    :style="theme"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, watchEffect } from 'vue'
import { provideSelectContext, DISPLAY_NAME } from './Select.context'
import type { SelectProps, SelectItem } from './Select.types'
import styles from './Select.module.scss'

const BASE_HOVER_INDEX = -1

type Props = SelectProps

const props = withDefaults(defineProps<Props>(), {
  isDisabled: false,
  isOpen: false,
  isDefaultOpen: false,
  isInvalid: false,
})

const emit = defineEmits<{
  (e: 'change', item: SelectItem): void
  (e: 'openChange', open: boolean): void
}>()

const selectRef = ref<HTMLDivElement | null>(null)
const internalIsOpened = ref(props.isDefaultOpen)
const internalHoveredIndex = ref(BASE_HOVER_INDEX)
const internalDefaultValue = ref<SelectItem | undefined>(props.defaultValue)

const isControlled = computed(() => 'value' in props && props.value !== undefined)
const isOpenControlled = computed(() => 'isOpen' in props)

const selected = computed(() =>
  isControlled.value ? props.value : internalDefaultValue.value
)

const isOpen = computed(() =>
  isOpenControlled.value ? props.isOpen : internalIsOpened.value
)

const handleOpen = (open: boolean) => {
  if (!props.isDisabled && !isOpenControlled.value) {
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

// Provide reactive context — provide once, update reactively
const context = reactive({
  hoveredIndex: internalHoveredIndex.value,
  onHoveredIndexChange: handleHoveredIndexChange,
  onChange: handleChange,
  isOpened: isOpen.value,
  onOpen: handleOpen,
  isDisabled: props.isDisabled,
  isInvalid: props.isInvalid,
  value: selected.value,
  defaultValue: props.defaultValue,
})

watchEffect(() => {
  context.hoveredIndex = internalHoveredIndex.value
  context.isOpened = isOpen.value
  context.isDisabled = props.isDisabled
  context.isInvalid = props.isInvalid
  context.value = selected.value
  context.defaultValue = props.defaultValue
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
