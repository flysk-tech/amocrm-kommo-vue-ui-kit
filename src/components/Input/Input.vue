<template>
  <div :class="[styles.wrapper, className]" :style="effectiveTheme">
    <div
      :class="[
        styles.input_wrapper,
        {
          [styles.invalid_description_right]: invalidDescriptionPlacement === 'right'
        }
      ]"
    >
      <div
        :class="[
          styles.input_container,
          {
            [styles.invalid]: isInvalid,
            [styles.disabled]: isDisabled
          }
        ]"
      >
        <BaseInput
          v-bind="$attrs"
          ref="inputRef"
          :className="[
            {
              [styles.has_after]: Boolean(after) || Boolean($slots.after)
            }
          ].filter(Boolean).join(' ')"
          :isDisabled="isDisabled"
          :isReadonly="isReadonly"
          :isPlaceholderVisibleOnFocus="isPlaceholderVisibleOnFocus"
          @input="handleInput"
          @change="handleChange"
          @focus="handleFocus"
          @blur="handleBlur"
        />
        <div v-if="after || $slots.after" :class="styles.after">
          <slot name="after">{{ after }}</slot>
        </div>
      </div>
      <div
        v-if="isInvalid && invalidDescription"
        :class="styles.invalid_description"
        :style="invalidTextTheme"
      >
        {{ invalidDescription }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { InputProps } from './Input.types'
import { InputInvalidTextTheme, InputLightTheme } from './Input.themes'
import BaseInput from '@/components/BaseInput/BaseInput.vue'
import styles from './Input.module.scss'

type Props = InputProps & {
  modelValue?: string | number
}

interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'input', event: Event): void
  (e: 'change', event: Event): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
}

const props = withDefaults(defineProps<Props>(), {
  className: '',
  isInvalid: false,
  isDisabled: false,
  isReadonly: false,
  isPlaceholderVisibleOnFocus: false,
  invalidDescriptionPlacement: 'bottom',
  modelValue: '',
  after: undefined,
  invalidDescription: undefined
})

const emit = defineEmits<Emits>()

// Ref для input элемента
const inputRef = ref<HTMLInputElement | null>(null)

// Вычисляемая тема - используем переданную или дефолтную
const effectiveTheme = computed(() => props.theme || InputLightTheme)

// Вычисляемая тема для текста ошибки
const invalidTextTheme = computed(() => ({
  ...InputInvalidTextTheme
}))

// Обработчики событий
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
  emit('input', event)
}

const handleChange = (event: Event) => {
  emit('change', event)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

// Экспорт ref для доступа к элементу input
defineExpose({
  inputRef
})
</script>

