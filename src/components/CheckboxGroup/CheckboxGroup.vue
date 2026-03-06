<template>
  <div
    v-bind="$attrs"
    ref="checkboxGroupRef"
    :class="[
      styles.checkbox_group,
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
import { provideCheckboxGroupContext, DISPLAY_NAME } from './CheckboxGroup.context'
import { useCheckboxGroupState } from './composables/useCheckboxGroupState'
import type { CheckboxGroupProps } from './CheckboxGroup.types'
import styles from './CheckboxGroup.module.scss'

type Props = CheckboxGroupProps & {
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  className: '',
  isDisabled: false,
  orientation: 'vertical',
})

const checkboxGroupRef = ref<HTMLDivElement | null>(null)

const { register, state } = useCheckboxGroupState({
  onChange: props.onChange,
  isDisabled: props.isDisabled,
})

const contextValue = computed(() => ({
  values: state.value,
  register,
  isDisabled: props.isDisabled,
}))

provideCheckboxGroupContext(contextValue.value)

watch(() => contextValue.value, (newVal) => {
  provideCheckboxGroupContext(newVal)
})

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
