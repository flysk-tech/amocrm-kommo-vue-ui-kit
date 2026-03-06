export interface SpinnerProps {
  /**
   * Центрировать спиннер абсолютным позиционированием
   */
  isCentered?: boolean
  /**
   * Дополнительный CSS класс
   */
  className?: string
  /**
   * Объект с CSS переменными темы
   */
  theme?: Record<string, string>
}
