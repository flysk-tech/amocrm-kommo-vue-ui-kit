import { ref, type Ref } from 'vue'
import type { AnimationRefType } from '../Button.types'

// Vue версия useShowInvalidAnimation хука из React
export function useShowInvalidAnimation() {
  const shouldShowInvalidAnimation = ref(false)

  // Функция для запуска анимации ошибки - логика идентична React версии
  const showInvalidAnimation = (onAnimationEnd = () => {}) => {
    shouldShowInvalidAnimation.value = true

    setTimeout(() => {
      shouldShowInvalidAnimation.value = false
      onAnimationEnd()
    }, 400) // Тот же таймаут 400мс
  }

  return {
    shouldShowInvalidAnimation,
    showInvalidAnimation
  }
}

// Vue версия useShowSuccessfulState хука из React
export function useShowSuccessfulState() {
  const shouldShowSuccessfulState = ref(false)

  // Функция для показа состояния успеха - логика идентична React версии
  const showSuccessfulState = (onAnimationEnd = () => {}) => {
    shouldShowSuccessfulState.value = true

    setTimeout(() => {
      shouldShowSuccessfulState.value = false
      onAnimationEnd()
    }, 1500) // Тот же таймаут 1500мс
  }

  return {
    shouldShowSuccessfulState,
    showSuccessfulState
  }
}