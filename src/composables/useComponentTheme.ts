import { computed, readonly } from 'vue'
import type { Ref } from 'vue'
import type { ComponentThemeVariables, CSSVariables } from '@/types/theme'

// Композиционная функция для работы с темами компонентов
export function useComponentTheme<T extends ComponentThemeVariables>(
  componentName: string,
  theme: T | Ref<T>
) {
  const themeRef = typeof theme === 'object' && 'value' in theme ? theme : computed(() => theme)

  // Генерируем CSS переменные с префиксом компонента
  const cssVariables = computed<CSSVariables>(() => {
    const vars: CSSVariables = {}

    Object.entries(themeRef.value).forEach(([key, value]) => {
      const cssVarName = `--crm-ui-kit-${componentName}-${key}` as keyof CSSVariables
      vars[cssVarName] = String(value)
    })

    return vars
  })

  // Объект стилей для привязки к элементу
  const styleVars = computed(() => {
    const styles: Record<string, string> = {}

    Object.entries(cssVariables.value).forEach(([property, value]) => {
      styles[property] = value
    })

    return styles
  })

  return {
    cssVariables: readonly(cssVariables),
    styleVars: readonly(styleVars)
  }
}

// Хелпер для создания темы компонента
export function createComponentTheme<T extends ComponentThemeVariables>(
  componentName: string,
  defaultTheme: T
) {
  return function useTheme(customTheme?: Partial<T>) {
    const theme = computed(() => ({
      ...defaultTheme,
      ...customTheme
    }))

    return useComponentTheme(componentName, theme)
  }
}