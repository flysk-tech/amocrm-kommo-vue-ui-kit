# @amocrm/vue-ui-kit

> Готовые к использованию Vue 3 компоненты, реализующие дизайн amoCRM

[![npm version](https://badge.fury.io/js/%40amocrm%2Fvue-ui-kit.svg)](https://badge.fury.io/js/%40amocrm%2Fvue-ui-kit)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![Vue 3](https://img.shields.io/badge/Vue-3-4FC08D?logo=vue.js)](https://vuejs.org/)

## 🚀 Особенности

- ✅ **Vue 3 + Composition API** - современная архитектура
- ✅ **TypeScript** - полная типизация из коробки
- ✅ **Темная/светлая тема** - автоматическое переключение
- ✅ **Русская локализация** - адаптировано для российского рынка
- ✅ **Tree-shaking** - импортируйте только нужные компоненты
- ✅ **CSS модули** - изолированные стили компонентов
- ✅ **Accessibility** - поддержка WCAG 2.1
- ✅ **SSR/SSG** - совместимость с Nuxt и другими

## 📦 Установка

```bash
# npm
npm install @amocrm/vue-ui-kit

# yarn
yarn add @amocrm/vue-ui-kit

# pnpm
pnpm add @amocrm/vue-ui-kit
```

## 🎯 Быстрый старт

### Полная установка

```typescript
// main.ts
import { createApp } from 'vue'
import AmoCrmUiKit from '@amocrm/vue-ui-kit'

const app = createApp(App)
app.use(AmoCrmUiKit)
app.mount('#app')
```

### Выборочный импорт (рекомендуется)

```vue
<template>
  <ThemeProvider :theme="{ mode: 'light' }">
    <Button
      :theme="buttonTheme"
      @click="handleClick"
    >
      Нажмите меня
    </Button>
  </ThemeProvider>
</template>

<script setup lang="ts">
import { ThemeProvider, Button } from '@amocrm/vue-ui-kit'
import { buttonPrimaryTheme } from '@amocrm/vue-ui-kit/themes'

const buttonTheme = buttonPrimaryTheme

const handleClick = () => {
  console.log('Кнопка нажата!')
}
</script>
```

## 🎨 Система тем

```vue
<template>
  <ThemeProvider :theme="themeConfig">
    <div class="app">
      <Button @click="toggleTheme">
        Переключить тему
      </Button>
      <!-- Ваши компоненты -->
    </div>
  </ThemeProvider>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ThemeProvider, useTheme } from '@amocrm/vue-ui-kit'

const themeConfig = ref({
  mode: 'light' as const,
  customVariables: {
    '--crm-ui-kit-color-primary': '#007bff'
  }
})

const { toggleTheme } = useTheme()
</script>
```

## 📚 Компоненты

### Формы
- **Button** - кнопки с различными состояниями
- **Input** - поля ввода с валидацией
- **TextArea** - многострочный ввод
- **Select** - выпадающие списки
- **Checkbox** - чекбоксы и группы
- **RadioGroup** - радиокнопки
- **Switcher** - переключатели

### Интерфейс
- **Text** - типографика
- **Link** - ссылки
- **Spinner** - индикаторы загрузки
- **Portal** - телепортация компонентов

### Контент
- **ContentBlock** - блоки контента
- **Callout** - уведомления
- **Accordion** - аккордеоны

## 🛠️ Разработка

```bash
# Установка зависимостей
yarn install

# Запуск dev сервера
yarn dev

# Сборка библиотеки
yarn build

# Запуск тестов
yarn test

# Линтинг
yarn lint

# Storybook
yarn storybook
```

## 📖 Документация

Полная документация доступна в [Storybook](https://amocrm.github.io/vue-ui-kit-storybook)

## 🔧 Системные требования

- Vue 3.4+
- Node.js 18+
- TypeScript 5.5+ (опционально)

## 🤝 Совместимость с React версией

Эта библиотека является Vue.js портом [@kommo-crm/crm-react-ui-kit](https://www.npmjs.com/package/@kommo-crm/crm-react-ui-kit). API максимально совместим для упрощения миграции.

### Миграция с React

```typescript
// React
import { Button } from '@kommo-crm/crm-react-ui-kit'
<Button isLoading={true} onClick={handleClick}>Кнопка</Button>

// Vue
import { Button } from '@amocrm/vue-ui-kit'
<Button :is-loading="true" @click="handleClick">Кнопка</Button>
```

## 📄 Лицензия

MIT © amoCRM

## 🐛 Сообщить об ошибке

Если вы нашли ошибку, [создайте issue](https://github.com/amocrm/vue-ui-kit/issues/new) в нашем репозитории.

## 🎯 Roadmap

- [ ] Полный набор из 23 компонентов
- [ ] Storybook документация
- [ ] Accessibility тесты
- [ ] Performance benchmarks
- [ ] Nuxt 3 плагин
- [ ] Figma интеграция