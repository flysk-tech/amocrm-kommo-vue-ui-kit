<template>
  <div
    v-bind="$attrs"
    ref="radiogroupRef"
    role="radiogroup"
    :class="[
      styles.radiogroup,
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
import { ref, computed } from 'vue'
import { provideRadioGroupContext, DISPLAY_NAME } from './RadioGroup.context'
import type { RadioGroupProps } from './RadioGroup.types'
import styles from './RadioGroup.module.scss'

type Props = RadioGroupProps & {
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  className: '',
  isDisabled: false,
  orientation: 'vertical',
})

const emit = defineEmits<{
  (e: 'change', value: string): void
}>()

const radiogroupRef = ref<HTMLDivElement | null>(null)

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('change', target.value)
  if (props.onChange) {
    props.onChange(target.value)
  }
}

// Provide context for child components
const contextValue = computed(() => ({
  name: props.name,
  value: props.value,
  defaultValue: props.defaultValue,
  isDisabled: props.isDisabled,
  onChange: handleChange,
}))

provideRadioGroupContext(contextValue.value)

defineExpose({
  radiogroupRef,
})
</script>

<script lang="ts">
import { defineComponent } from 'vue'
import Label from '@/components/Label/Label.vue'
import { ItemRoot } from './components/ItemRoot'
import { Radio } from './components/Radio'

export default defineComponent({
  name: DISPLAY_NAME,
})
</script>
