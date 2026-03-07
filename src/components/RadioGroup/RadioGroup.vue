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
import { ref, reactive } from 'vue'
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

// Use reactive getters for proper reactivity propagation
const context = reactive({
  get name() { return props.name },
  get value() { return props.value },
  get defaultValue() { return props.defaultValue },
  get isDisabled() { return props.isDisabled },
  onChange: handleChange,
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
