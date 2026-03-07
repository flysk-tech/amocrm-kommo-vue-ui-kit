<template>
  <div
    :class="[
      styles.wrapper,
      {
        [styles.touchable]: isTouchable
      }
    ]"
    :style="theme"
  >
    <VisuallyHiddenInput
      v-bind="$attrs"
      :id="props.id"
      ref="inputRef"
      :class="styles.input"
      type="checkbox"
      :is-disabled="props.isDisabled"
      :is-readonly="props.isReadonly"
      :is-checked="props.isChecked"
      :is-default-checked="props.isDefaultChecked"
      :value="props.value"
      :name="props.name"
    />
    <span
      :class="[
        styles.checkbox,
        {
          [styles.indeterminate]: checkedStyle === 'indeterminate',
          [styles.invalid]: isInvalid
        }
      ]"
    />
  </div>
</template>

<script setup lang="ts">
defineOptions({ inheritAttrs: false })

import { ref, onMounted } from 'vue'
import VisuallyHiddenInput from '@/components/VisuallyHiddenInput/VisuallyHiddenInput.vue'
import type { CheckboxProps } from './Checkbox.types'
import { isTouchableDevice } from '@/lib/utils'
import styles from './Checkbox.module.scss'

type Props = CheckboxProps

const props = withDefaults(defineProps<Props>(), {
  checkedStyle: 'mark',
  isInvalid: false,
})

const inputRef = ref<InstanceType<typeof VisuallyHiddenInput> | null>(null)
const isTouchable = ref(false)

onMounted(() => {
  isTouchable.value = isTouchableDevice()
})

defineExpose({
  inputRef,
})
</script>
