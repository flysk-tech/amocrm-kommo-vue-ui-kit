// Главный файл экспорта библиотеки @flysk-tech/amocrm-kommo-vue-ui-kit

// Стили
import './styles/index.scss'

// Типы
export * from './types'

// Композиционные функции
export * from './composables'

// Утилиты
export * from './utils'

// Компоненты
export * from './components'

// Версия библиотеки
export const version = '0.0.1'

// Функция для установки библиотеки как плагина Vue
import type { App } from 'vue'

export interface AmoCrmUiKitOptions {
  // Опции конфигурации будут добавлены позже
}

export function install(app: App, options?: AmoCrmUiKitOptions) {
  // Регистрация компонентов будет добавлена по мере их создания
  // Plugin installation — component registration will be added as components are completed
}

// Экспорт по умолчанию для использования как плагин
export default {
  install,
  version
}