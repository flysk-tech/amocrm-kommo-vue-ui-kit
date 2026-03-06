import { create } from 'storybook/theming'

// Общие свойства брендинга и шрифтов
const fontProps = {
  fontBase: 'PT Sans, Nunito Sans, sans-serif',
  fontCode: 'monospace',
}

const brandingProps = {
  brandTitle: 'amoCRM Vue UI Kit',
  brandUrl: 'https://github.com/amocrm',
  brandTarget: '_blank',
}

// Создаем темы
export const darkTheme = create({
  base: 'dark',
  ...fontProps,
  ...brandingProps,
})

export const lightTheme = create({
  base: 'light',
  ...fontProps,
  ...brandingProps,
})

// Функция получения темы
export const getTheme = (appearance) => {
  return appearance === 'default' ? lightTheme : darkTheme
}

// Получить текущую тему из URL или localStorage
export const getCurrentAppearance = () => {
  // Сначала проверяем URL параметры
  try {
    const params = new URLSearchParams(window.location.search)
    const globals = params.get('globals')
    if (globals) {
      const parsed = globals.split(';').reduce((acc, item) => {
        const [key, value] = item.split(':')
        acc[key] = value
        return acc
      }, {})
      if (parsed.appearance) {
        return parsed.appearance
      }
    }
  } catch (e) {
    console.log('Failed to parse appearance from URL:', e)
  }

  // Затем проверяем localStorage
  try {
    const stored = localStorage.getItem('storybook-globals')
    if (stored) {
      const globals = JSON.parse(stored)
      if (globals.appearance) {
        return globals.appearance
      }
    }
  } catch (e) {
    console.log('Failed to parse appearance from localStorage:', e)
  }

  // Затем проверяем системные настройки
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'alternative'
  }

  return 'default'
}
