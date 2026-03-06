import { ref, watch, onBeforeUnmount } from 'vue'
import type { CrmUiKitCSSProperties } from '@/lib/theme'

const DEFAULT_PREFIX = 'crm-ui-kit-theme'

let counter = 0

const stylesMap = new Map<object, { className: string; styleElement: HTMLStyleElement; refCount: number }>()

const createClass = <T extends CrmUiKitCSSProperties>(newTheme: T) => {
  const className = `${DEFAULT_PREFIX}-${++counter}`
  const styleElement = document.createElement('style')
  const stylesString = Object.entries(newTheme)
    .map(([key, value]) => `${key}: ${value};`)
    .join('\n  ')

  styleElement.textContent = `.${className} {\n  ${stylesString}\n}`
  document.head.appendChild(styleElement)

  return { className, styleElement }
}

export const useThemeClassName = <T extends CrmUiKitCSSProperties>(
  theme: T
) => {
  const className = ref<string>('')
  let currentTheme: object = theme
  let currentEntry: { className: string; styleElement: HTMLStyleElement; refCount: number } | undefined

  const updateClassName = (newTheme: T) => {
    // Уменьшаем счётчик для предыдущей темы
    if (currentEntry) {
      currentEntry.refCount--
      if (currentEntry.refCount === 0) {
        // Удаляем стиль из DOM, если больше никто не использует
        currentEntry.styleElement.remove()
        stylesMap.delete(currentTheme)
      }
    }

    currentTheme = newTheme
    const existedEntry = stylesMap.get(newTheme)

    if (existedEntry) {
      // Увеличиваем счётчик ссылок
      existedEntry.refCount++
      className.value = existedEntry.className
      currentEntry = existedEntry
    } else {
      // Создаём новый класс
      const { className: themeClassName, styleElement } = createClass(newTheme)
      const entry = { className: themeClassName, styleElement, refCount: 1 }
      stylesMap.set(newTheme, entry)
      className.value = themeClassName
      currentEntry = entry
    }
  }

  // Инициализация
  updateClassName(theme)

  // Следим за изменениями темы
  watch(() => theme, updateClassName)

  // Очистка при размонтировании
  onBeforeUnmount(() => {
    if (currentEntry) {
      currentEntry.refCount--
      if (currentEntry.refCount === 0) {
        currentEntry.styleElement.remove()
        stylesMap.delete(currentTheme)
      }
    }
  })

  return className
}
