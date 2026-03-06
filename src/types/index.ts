// Главный файл экспорта типов

export * from './theme'

// Базовые типы для компонентов
export interface ComponentSize {
  small: string
  medium: string
  large: string
}

export type Size = keyof ComponentSize

export interface ComponentVariant {
  primary: string
  secondary: string
  outline: string
}

export type Variant = keyof ComponentVariant

// Общие пропсы для всех компонентов
export interface BaseComponentProps {
  class?: string
  style?: string | Record<string, string>
}