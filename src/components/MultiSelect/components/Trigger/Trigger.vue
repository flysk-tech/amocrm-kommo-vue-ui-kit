<template>
  <SelectButton
    ref="buttonRef"
    v-bind="$attrs"
    :theme="theme"
    :is-disabled="multiSelectContext.isDisabled"
    :is-invalid="multiSelectContext.isInvalid"
    @toggle="handleToggle"
  >
    <slot />
  </SelectButton>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import SelectButton from '@/components/SelectButton/SelectButton.vue'
import type { SelectButtonThemeType } from '@/components/SelectButton'
import { useMultiSelectContext } from '../../MultiSelect.context'

const DISPLAY_NAME = 'MultiSelect.Trigger'

defineProps<{
  theme: SelectButtonThemeType
}>()

const multiSelectContext = useMultiSelectContext(DISPLAY_NAME)

const buttonRef = ref<InstanceType<typeof SelectButton> | null>(null)

const handleToggle = () => {
  multiSelectContext.onOpen(!multiSelectContext.isOpened)
}

// After closing the list, focus back on the button
watch(
  () => multiSelectContext.isOpened,
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
