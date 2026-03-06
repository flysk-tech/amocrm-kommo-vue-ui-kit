import { provide, inject, ref, computed, readonly } from 'vue'
import type { Ref } from 'vue'
import type { ThemeConfig, ThemeMode } from '@/types/theme'
import { Appearance } from '@/lib/appearance'

// Ключ для provide/inject
export const THEME_PROVIDER_KEY = Symbol('theme-provider')

// Интерфейс контекста темы
export interface ThemeContext {
  themeConfig: Readonly<Ref<ThemeConfig>>
  appearance: Readonly<Ref<Appearance>>
  setTheme: (config: Partial<ThemeConfig>) => void
  setAppearance: (appearance: Appearance) => void
  toggleTheme: () => void
}

// Функция для предоставления темы
export function provideTheme(initialConfig?: Partial<ThemeConfig>): ThemeContext {
  const themeConfig = ref<ThemeConfig>({
    mode: 'light',
    customVariables: {},
    ...initialConfig
  })

  const appearance = computed<Appearance>(() => {
    return themeConfig.value.mode === 'dark' ? Appearance.ALTERNATIVE : Appearance.DEFAULT
  })

  const setTheme = (config: Partial<ThemeConfig>) => {
    themeConfig.value = {
      ...themeConfig.value,
      ...config
    }
    updateDocumentTheme(themeConfig.value)
  }

  const setAppearance = (newAppearance: Appearance) => {
    const mode: ThemeMode = newAppearance === Appearance.ALTERNATIVE ? 'dark' : 'light'
    setTheme({ mode })
  }

  const toggleTheme = () => {
    const newMode: ThemeMode = themeConfig.value.mode === 'light' ? 'dark' : 'light'
    setTheme({ mode: newMode })
  }

  // Инициализация темы в DOM
  updateDocumentTheme(themeConfig.value)

  const context: ThemeContext = {
    themeConfig: readonly(themeConfig),
    appearance: readonly(appearance),
    setTheme,
    setAppearance,
    toggleTheme
  }

  provide(THEME_PROVIDER_KEY, context)
  return context
}

// Функция для использования темы
export function useTheme(): ThemeContext {
  const context = inject<ThemeContext>(THEME_PROVIDER_KEY)

  if (!context) {
    throw new Error(
      'useTheme must be used within a component that has provideTheme() called in a parent component'
    )
  }

  return context
}

// Функция для обновления DOM с темой
function updateDocumentTheme(config: ThemeConfig) {
  if (typeof document === 'undefined') return

  // Устанавливаем data-theme атрибут
  document.documentElement.setAttribute('data-theme', config.mode)

  // Устанавливаем кастомные CSS переменные
  if (config.customVariables) {
    Object.entries(config.customVariables).forEach(([property, value]) => {
      document.documentElement.style.setProperty(property, value)
    })
  }
}

// Хук для получения текущего режима темы
export function useThemeMode(): Readonly<Ref<ThemeMode>> {
  const { themeConfig } = useTheme()
  return computed(() => themeConfig.value.mode)
}

// Хук для CSS переменных темы
export function useThemeVariables(): Readonly<Ref<Record<string, string>>> {
  const { themeConfig } = useTheme()
  return computed(() => themeConfig.value.customVariables || {})
}