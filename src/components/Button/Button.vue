<template>
  <button
    v-bind="$attrs"
    :type="type"
    :class="[
      styles.button,
      {
        [styles.invalid]: shouldShowInvalidAnimation,
        [styles.success]: shouldShowSuccessfulState,
        [styles.disabled]: isDisabled
      }
    ]"
    :style="theme"
    :disabled="(isDisabled || isLoading) && !isClickableWhileDisabled"
    @click="handleClick"
  >
    <span :class="styles.content">
      <!-- Состояние успеха -->
      <span v-if="shouldShowSuccessfulState">
        {{ successfulStateText || children }}
      </span>

      <!-- Состояние загрузки -->
      <span v-else-if="isLoading" :class="styles.spinner_container">
        <Spinner
          :theme="isDisabled ? spinnerThemes.disabledTheme : spinnerThemes.defaultTheme"
          :isCentered="true"
        />
      </span>

      <!-- Обычное состояние -->
      <template v-else>
        <span v-if="before" :class="styles.before">
          <slot name="before">{{ before }}</slot>
        </span>

        <span>
          <slot>{{ children }}</slot>
        </span>

        <span v-if="after" :class="styles.after">
          <slot name="after">{{ after }}</slot>
        </span>
      </template>
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import Spinner from '../Spinner/Spinner.vue'
import { useShowInvalidAnimation, useShowSuccessfulState } from './composables/useButtonAnimations'
import type { ButtonProps } from './Button.types'
import type { ButtonThemeType } from './Button.themes'
import styles from './Button.module.scss'

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'button',
  isLoading: false,
  isDisabled: false,
  isClickableWhileDisabled: false
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

// Композиционные функции для анимаций - переиспользуют React логику
const { shouldShowInvalidAnimation, showInvalidAnimation } = useShowInvalidAnimation()
const { shouldShowSuccessfulState, showSuccessfulState } = useShowSuccessfulState()

// Реактивно устанавливаем функции в refs
watchEffect(() => {
  if (props.showInvalidAnimationRef) {
    props.showInvalidAnimationRef.value = showInvalidAnimation
  }
})

watchEffect(() => {
  if (props.showSuccessfulStateRef) {
    props.showSuccessfulStateRef.value = showSuccessfulState
  }
})

// Mapping тем для Spinner - точно как в React версии
const spinnerThemes = computed(() => {
  const defaultTheme = {
    '--crm-ui-kit-spinner-border-color': props.theme?.['--crm-ui-kit-button-spinner-border-color'],
    '--crm-ui-kit-spinner-border-width': props.theme?.['--crm-ui-kit-button-spinner-border-width'],
    '--crm-ui-kit-spinner-circle-size': props.theme?.['--crm-ui-kit-button-spinner-circle-size'],
    '--crm-ui-kit-spinner-border-style': props.theme?.['--crm-ui-kit-button-spinner-border-style'],
  }

  const disabledTheme = {
    ...defaultTheme,
    '--crm-ui-kit-spinner-border-color': props.theme?.['--crm-ui-kit-button-spinner-disabled-border-color'],
  }

  return { defaultTheme, disabledTheme }
})

// Обработка клика - идентична React версии
const handleClick = (event: MouseEvent) => {
  // Если кнопка disabled и не clickableWhileDisabled - не вызываем onClick
  if (props.isDisabled && !props.isClickableWhileDisabled) {
    return
  }

  if (props.isLoading) {
    return
  }

  emit('click', event)
}
</script>