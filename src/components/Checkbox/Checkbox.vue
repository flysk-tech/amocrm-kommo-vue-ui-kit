<template>
  <div
    :class="[
      styles.wrapper,
      className,
      {
        [styles.touchable]: isTouchable
      }
    ]"
    :style="theme"
  >
    <VisuallyHiddenInput
      v-bind="$attrs"
      ref="inputRef"
      :className="styles.input"
      type="checkbox"
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
import { ref, onMounted } from 'vue'
import VisuallyHiddenInput from '@/components/VisuallyHiddenInput/VisuallyHiddenInput.vue'
import type { CheckboxProps } from './Checkbox.types'
import { isTouchableDevice } from '@/lib/utils'
import styles from './Checkbox.module.scss'

type Props = CheckboxProps & {
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  className: '',
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
