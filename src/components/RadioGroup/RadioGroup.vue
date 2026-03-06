<template>
  <div
    v-bind="$attrs"
    ref="radiogroupRef"
    role="radiogroup"
    :class="[
      styles.radiogroup,
      {
        [styles.horizontal]: orientation === 'horizontal'
      }
    ]"
    :style="theme"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, watchEffect } from 'vue'
import { provideRadioGroupContext, DISPLAY_NAME } from './RadioGroup.context'
import type { RadioGroupProps } from './RadioGroup.types'
import styles from './RadioGroup.module.scss'

type Props = RadioGroupProps

const props = withDefaults(defineProps<Props>(), {
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
}

// Provide reactive context for child components
const context = reactive({
  name: props.name,
  value: props.value,
  defaultValue: props.defaultValue,
  isDisabled: props.isDisabled,
  onChange: handleChange,
})

watchEffect(() => {
  context.name = props.name
  context.value = props.value
  context.defaultValue = props.defaultValue
  context.isDisabled = props.isDisabled
})

provideRadioGroupContext(context as any)

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
