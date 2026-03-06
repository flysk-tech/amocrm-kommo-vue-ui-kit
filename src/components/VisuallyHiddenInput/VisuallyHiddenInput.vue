<template>
  <BaseInput
    ref="inputRef"
    :class="styles.input"
    v-bind="inputProps"
  />
</template>

<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue'
import BaseInput from '@/components/BaseInput/BaseInput.vue'
import type { VisuallyHiddenInputProps } from './VisuallyHiddenInput.types'
import styles from './VisuallyHiddenInput.module.scss'

const props = defineProps<VisuallyHiddenInputProps>()

const inputRef = ref<InstanceType<typeof BaseInput> | null>(null)

const inputProps = computed(() => {
  const { isChecked, isDefaultChecked, ...rest } = props

  if (isChecked !== undefined) {
    return { checked: isChecked, ...rest }
  }

  return rest
})

const getInputElement = (): HTMLInputElement | null => {
  return inputRef.value?.inputRef ?? null
}

onMounted(() => {
  if (props.isDefaultChecked) {
    const el = getInputElement()
    if (el) el.checked = true
  }
})

if (props.isChecked !== undefined) {
  watch(() => props.isChecked, (val) => {
    const el = getInputElement()
    if (el) el.checked = !!val
  })
}

defineExpose({
  inputRef,
})
</script>
