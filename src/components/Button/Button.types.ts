import type { Ref } from 'vue'
import { type ButtonThemeType } from './Button.themes'

// Типы для анимационных реф-хуков
export type AnimationRefType = (onAnimationEnd?: () => void) => void | null

// Пропсы Button компонента
export interface ButtonProps {
  /**
   * HTML тип кнопки
   */
  type?: 'button' | 'submit' | 'reset'
  /**
   * Объект с CSS переменными темы
   */
  theme: ButtonThemeType
  /**
   * Показать состояние загрузки
   */
  isLoading?: boolean
  /**
   * Отключить кнопку
   */
  isDisabled?: boolean
  /**
   * Иконка слева
   */
  before?: any
  /**
   * Иконка справа
   */
  after?: any
  /**
   * Текст кнопки
   */
  children?: any
  /**
   * Ref для функции showInvalidAnimation, которая вызывает состояние ошибки
   */
  showInvalidAnimationRef?: Ref<AnimationRefType | null>
  /**
   * Ref для функции showSuccessfulState, которая вызывает состояние успеха
   */
  showSuccessfulStateRef?: Ref<AnimationRefType | null>
  /**
   * Текст для отображения в состоянии успеха
   */
  successfulStateText?: string
  /**
   * Будет ли обрабатываться клик по заблокированной кнопке
   */
  isClickableWhileDisabled?: boolean
}
