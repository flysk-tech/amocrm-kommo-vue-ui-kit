<template>
  <div
    v-bind="$attrs"
    ref="checkboxGroupRef"
    :class="[
      styles.checkbox_group,
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
import { ref, reactive, watchEffect } from 'vue'
import { provideCheckboxGroupContext, DISPLAY_NAME } from './CheckboxGroup.context'
import { useCheckboxGroupState } from './composables/useCheckboxGroupState'
import type { CheckboxGroupProps } from './CheckboxGroup.types'
import styles from './CheckboxGroup.module.scss'

type Props = CheckboxGroupProps

const props = withDefaults(defineProps<Props>(), {
  isDisabled: false,
  orientation: 'vertical',
})

const checkboxGroupRef = ref<HTMLDivElement | null>(null)

const { register, state } = useCheckboxGroupState({
  onChange: props.onChange,
  isDisabled: props.isDisabled,
})

// Provide reactive context — provide once, update reactively
const context = reactive({
  values: state.value,
  register,
  isDisabled: props.isDisabled,
})

watchEffect(() => {
  context.values = state.value
  context.isDisabled = props.isDisabled
})

provideCheckboxGroupContext(context as any)

defineExpose({
  checkboxGroupRef,
})
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: DISPLAY_NAME,
})
</script>
