<template>
  <BaseInput
    ref="inputRef"
    :class="styles.input"
    v-bind="inputProps"
  />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
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

  return { defaultChecked: isDefaultChecked, ...rest }
})

defineExpose({
  inputRef,
})
</script>
