<template>
  <SelectButton
    ref="buttonRef"
    v-bind="$attrs"
    :theme="theme"
    :is-disabled="selectContext.isDisabled"
    :is-invalid="selectContext.isInvalid"
    @toggle="handleToggle"
  >
    <slot />
  </SelectButton>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import SelectButton from '@/components/SelectButton/SelectButton.vue'
import type { SelectButtonThemeType } from '@/components/SelectButton'
import { useSelectContext } from '../../Select.context'

const DISPLAY_NAME = 'Select.Button'

defineProps<{
  theme: SelectButtonThemeType
}>()

const selectContext = useSelectContext(DISPLAY_NAME)

const buttonRef = ref<InstanceType<typeof SelectButton> | null>(null)

const handleToggle = () => {
  selectContext.onOpen(!selectContext.isOpened)
}

// After closing the list, focus back on the button
watch(
  () => selectContext.isOpened,
  (newVal, oldVal) => {
    if (oldVal && !newVal) {
      buttonRef.value?.buttonRef?.focus()
    }
  }
)

defineExpose({
  buttonRef,
})
</script>
