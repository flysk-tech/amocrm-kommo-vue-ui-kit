<template>
  <div :class="[styles.wrapper, className]" :style="theme">
    <div
      :class="[
        styles.textarea_container,
        {
          [styles.invalid]: isInvalid,
          [styles.disabled]: isDisabled
        }
      ]"
    >
      <textarea
        v-bind="$attrs"
        ref="textareaRef"
        :class="[
          styles.textarea,
          {
            [styles.placeholder_visible]: isPlaceholderVisibleOnFocus
          }
        ]"
        :style="{ maxHeight: maxHeight ? `${maxHeight}px` : undefined }"
        :disabled="isDisabled"
        :readonly="isReadOnly"
        :value="modelValue"
        @input="handleInput"
      />
    </div>
    <div
      v-if="isInvalid && invalidDescription"
      :class="styles.invalid_description"
    >
      {{ invalidDescription }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import type { TextAreaProps } from './TextArea.types'
import styles from './TextArea.module.scss'

type Props = TextAreaProps & {
  className?: string
  modelValue?: string | number
}

interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'autosize'): void
}

const props = withDefaults(defineProps<Props>(), {
  className: '',
  isInvalid: false,
  isDisabled: false,
  isReadOnly: false,
  isAutosized: false,
  isPlaceholderVisibleOnFocus: false,
  modelValue: '',
})

const emit = defineEmits<Emits>()

const textareaRef = ref<HTMLTextAreaElement | null>(null)

const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)

  if (props.isAutosized) {
    autoResize()
  }
}

const autoResize = () => {
  if (!textareaRef.value || !props.isAutosized) return

  nextTick(() => {
    if (textareaRef.value) {
      textareaRef.value.style.height = 'auto'
      textareaRef.value.style.height = `${textareaRef.value.scrollHeight}px`
      emit('autosize')
    }
  })
}

watch(
  () => props.modelValue,
  () => {
    if (props.isAutosized) {
      autoResize()
    }
  }
)

watch(
  () => props.isAutosized,
  (newValue) => {
    if (newValue) {
      autoResize()
    }
  }
)

defineExpose({
  textareaRef,
})
</script>
