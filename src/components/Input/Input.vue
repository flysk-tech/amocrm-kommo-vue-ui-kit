<template>
  <div :class="[styles.wrapper, $attrs.class]" :style="effectiveTheme">
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
          v-bind="inputAttrs"
          ref="inputRef"
          :class="{ [styles.has_after]: Boolean(after) || Boolean($slots.after) }"
          :is-disabled="isDisabled"
          :is-readonly="isReadonly"
          :is-placeholder-visible-on-focus="isPlaceholderVisibleOnFocus"
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
import { computed, ref, useAttrs } from 'vue'
import type { InputProps } from './Input.types'

defineOptions({ inheritAttrs: false })
import { InputInvalidTextTheme, InputLightTheme } from './Input.themes'
import BaseInput from '@/components/BaseInput/BaseInput.vue'
import styles from './Input.module.scss'

type Props = InputProps & {
  modelValue?: string | number | null
}

const attrs = useAttrs()
const inputAttrs = computed(() => {
  const { class: _, style: __, ...rest } = attrs
  if (props.modelValue !== undefined) {
    return { ...rest, value: props.modelValue }
  }
  return rest
})

interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'input', event: Event): void
  (e: 'change', event: Event): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
}

const props = withDefaults(defineProps<Props>(), {
  isInvalid: false,
  isDisabled: false,
  isReadonly: false,
  isPlaceholderVisibleOnFocus: false,
  invalidDescriptionPlacement: 'bottom',
  modelValue: undefined,
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

