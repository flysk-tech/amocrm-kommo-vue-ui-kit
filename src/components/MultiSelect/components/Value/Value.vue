<template>
  <slot v-if="$slots.default" />
  <template v-else>
    <Option ref="optionRef" :class="styles.text">
      {{ displayText }}
    </Option>
  </template>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Option from '@/components/Select/components/Option/Option.vue'
import { useMultiSelectContext } from '../../MultiSelect.context'
import styles from './Value.module.scss'

const DISPLAY_NAME = 'MultiSelect.Value'

const props = withDefaults(defineProps<{
  placeholder?: string
  displayMode?: 'count' | 'names'
  maxDisplayItems?: number
  countTemplate?: string
  class?: string
}>(), {
  placeholder: '',
  displayMode: 'count',
  maxDisplayItems: 2,
  countTemplate: '{n} выбрано',
})

const multiSelectContext = useMultiSelectContext(DISPLAY_NAME)

const optionRef = ref<InstanceType<typeof Option> | null>(null)

const displayText = computed(() => {
  const selected = multiSelectContext.selectedItems

  if (selected.length === 0) {
    return props.placeholder
  }

  if (props.displayMode === 'count') {
    return props.countTemplate.replace('{n}', String(selected.length))
  }

  // names mode
  const visible = selected.slice(0, props.maxDisplayItems)
  const rest = selected.length - visible.length
  const names = visible.map(item => item.option).join(', ')

  if (rest > 0) {
    return `${names} +${rest}`
  }
  return names
})

defineExpose({
  optionRef,
})
</script>
