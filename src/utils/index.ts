// Утилитарные функции

// Функция-заглушка (аналог noop из React версии)
export const noop = () => {}

// Функция для генерации уникальных ID
export function generateId(prefix: string = 'amocrm'): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`
}

// Функция для работы с CSS классами (аналог classnames)
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

// Функция для debounce
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }

    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Функция для throttle
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean

  return function (this: unknown, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Функция для проверки, является ли значение объектом
export function isObject(value: any): value is Record<string, any> {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

// Функция для глубокого слияния объектов
export function deepMerge<T extends Record<string, any>>(target: T, source: Partial<T>): T {
  const result = { ...target }

  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      const sourceValue = source[key]
      const targetValue = result[key]

      if (isObject(sourceValue) && isObject(targetValue)) {
        result[key] = deepMerge(targetValue, sourceValue as Partial<typeof targetValue>)
      } else {
        result[key] = sourceValue as T[Extract<keyof T, string>]
      }
    }
  }

  return result
}

// Функция для проверки поддержки браузером определенной функции
export function isSupported(feature: string): boolean {
  if (typeof window === 'undefined') return false

  switch (feature) {
    case 'IntersectionObserver':
      return 'IntersectionObserver' in window
    case 'ResizeObserver':
      return 'ResizeObserver' in window
    case 'MutationObserver':
      return 'MutationObserver' in window
    default:
      return false
  }
}