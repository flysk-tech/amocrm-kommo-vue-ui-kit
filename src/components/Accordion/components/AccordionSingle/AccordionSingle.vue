<template>
  <div
    v-bind="$attrs"
    ref="accordionRef"
    :class="[styles.wrapper, themeClassName, className]"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, toRef } from 'vue'
import { provideAccordionContext } from '../../Accordion.context'
import { useThemeClassName } from '@/composables/useThemeClassName'
import type { AccordionSingleProps } from '../../Accordion.types'
import type { AccordionThemeType } from '../../Accordion.themes'
import styles from '../../Accordion.module.scss'

type Props = AccordionSingleProps & {
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  className: '',
  isCollapsible: false,
})

const emit = defineEmits<{
  (e: 'change', value?: string): void
}>()

const accordionRef = ref<HTMLDivElement | null>(null)
const internalValue = ref<string | undefined>(props.defaultValue)

const themeClassName = useThemeClassName<AccordionThemeType>(props.theme)

const isControlled = computed(() => 'value' in props && props.value !== undefined)
const currentValue = computed(() =>
  isControlled.value ? props.value : internalValue.value
)

const getCorrectValue = (newValue: string) => {
  if (props.isCollapsible) {
    return newValue === currentValue.value ? undefined : newValue
  }
  return newValue
}

const handleChange = (newValue: string) => {
  const correctValue = getCorrectValue(newValue)

  if (!isControlled.value) {
    internalValue.value = correctValue
  }

  emit('change', correctValue)
  if (props.onChange) {
    props.onChange(correctValue)
  }
}

// Provide context - просто передаём computed ref напрямую
// Vue автоматически отслеживает изменения в computed
provideAccordionContext({
  value: currentValue, // computed ref
  defaultValue: toRef(() => props.defaultValue),
  onChange: handleChange,
})

defineExpose({
  accordionRef,
})
</script>
