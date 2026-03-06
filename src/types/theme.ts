// Типы для системы темизации

export type ThemeMode = 'light' | 'dark'

export interface ThemeConfig {
  mode: ThemeMode
  customVariables?: Record<string, string>
}

export type ComponentThemeVariables = Record<string, string>

// Тип для CSS переменных компонента
export type CSSVariables = Record<`--crm-ui-kit-${string}`, string>

// Базовый интерфейс для тем компонентов
export interface BaseComponentTheme {
  [key: string]: string | number
}