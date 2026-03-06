# Стандарт оформления компонентов amoCRM Vue UI Kit

**Дата обновления:** 7 октября 2025
**Версия:** 2.0

## Обзор

Данный документ описывает единый стандарт архитектуры и оформления компонентов в проекте amoCRM Vue UI Kit. Все компоненты должны следовать этой структуре для обеспечения консистентности, поддерживаемости и масштабируемости кода.

**Связанные документы:**
- [MIGRATION.md](MIGRATION.md) - статус миграции всех компонентов
- [COMPONENT_CHECKLIST.md](COMPONENT_CHECKLIST.md) - чеклист проверки компонента

## Структура файлов компонента

Каждый компонент должен иметь следующую структуру:

```
src/components/ComponentName/
├── ComponentName.vue          # Основной Vue компонент
├── ComponentName.types.ts     # TypeScript типы и интерфейсы
├── ComponentName.themes.ts    # CSS переменные и темы
├── ComponentName.module.scss  # SCSS стили (CSS модули)
└── __stories__/
    └── ComponentName.stories.ts # Storybook истории
```

## Архитектурные принципы

### 1. Разделение concerns

- **Vue компонент** (`.vue`) - только логика, темплейт и импорт стилей
- **SCSS модуль** (`.module.scss`) - все стили компонента
- **Types файл** (`.types.ts`) - TypeScript типы и интерфейсы
- **Themes файл** (`.themes.ts`) - CSS переменные и темы

### 2. CSS Modules обязательны

❌ **НЕ ДОПУСКАЕТСЯ** - встроенные стили в компоненте:
```vue
<style module lang="scss">
.button {
  color: red;
}
</style>
```

✅ **ПРАВИЛЬНО** - внешний CSS модуль:
```vue
<script setup lang="ts">
import styles from './ComponentName.module.scss'
</script>

<template>
  <div :class="styles.wrapper">
    <!-- ... -->
  </div>
</template>
```

### 3. CSS переменные с префиксом

Все CSS переменные должны использовать префикс `--crm-ui-kit-`:

```scss
// ✅ ПРАВИЛЬНО
.button {
  color: var(--crm-ui-kit-button-color);
  background: var(--crm-ui-kit-button-background);
}

// ❌ НЕ ДОПУСКАЕТСЯ
.button {
  color: var(--amocrm-vue-ui-kit-button-color);
  color: var(--button-color);
}
```

## Детальная структура файлов

### ComponentName.vue

```vue
<template>
  <div :class="[styles.wrapper, className]" :style="theme || {}">
    <!-- Темплейт компонента -->
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { ComponentNameProps } from './ComponentName.types'
import { ComponentNameTheme } from './ComponentName.themes'
import styles from './ComponentName.module.scss'

interface Props extends ComponentNameProps {
  // Дополнительные props если нужны
}

const props = withDefaults(defineProps<Props>(), {
  // Значения по умолчанию
})

// Логика компонента
</script>
```

### ComponentName.types.ts

```typescript
export interface ComponentNameProps {
  className?: string
  theme?: Record<string, string>
  // Другие props
}

export interface ComponentNameThemeProps {
  // Типы для темы если нужны
}
```

### ComponentName.themes.ts

```typescript
export const ComponentNameTheme = {
  '--crm-ui-kit-component-color': '#000000',
  '--crm-ui-kit-component-background': '#ffffff',
  // Другие CSS переменные
}

export const ComponentNameDarkTheme = {
  '--crm-ui-kit-component-color': '#ffffff',
  '--crm-ui-kit-component-background': '#000000',
  // Темная тема
}
```

### ComponentName.module.scss

```scss
// CSS переменные компонента
.wrapper {
  --crm-ui-kit-component-local-var: var(--crm-ui-kit-component-color);

  // Основные стили
  color: var(--crm-ui-kit-component-local-var);
  display: flex;
  // ...
}

.element {
  // Стили дочерних элементов
}

// Модификаторы
.disabled {
  opacity: 0.5;
}

.loading {
  cursor: wait;
}
```

## Правила именования

### CSS классы

- Используйте **snake_case** для CSS классов
- Логические состояния как отдельные классы

```scss
.input_wrapper { } // ✅ ПРАВИЛЬНО
.input_container { } // ✅ ПРАВИЛЬНО
.invalid_description { } // ✅ ПРАВИЛЬНО

.inputWrapper { } // ❌ НЕ ДОПУСКАЕТСЯ
.input-wrapper { } // ❌ НЕ ДОПУСКАЕТСЯ
```

### CSS переменные

- Префикс: `--crm-ui-kit-`
- Структура: `--crm-ui-kit-component-property`

```scss
--crm-ui-kit-button-color // ✅ ПРАВИЛЬНО
--crm-ui-kit-input-border-width // ✅ ПРАВИЛЬНО

--button-color // ❌ НЕ ДОПУСКАЕТСЯ
--amocrm-button-color // ❌ НЕ ДОПУСКАЕТСЯ
```

## Использование в темплейте

```vue
<template>
  <!-- Основная обертка -->
  <div :class="[styles.wrapper, className]" :style="theme || {}">

    <!-- Элементы с условными классами -->
    <div
      :class="[
        styles.element,
        {
          [styles.disabled]: isDisabled,
          [styles.loading]: isLoading
        }
      ]"
    >
      <!-- Контент -->
    </div>

    <!-- Слоты -->
    <div v-if="$slots.after" :class="styles.after">
      <slot name="after" />
    </div>
  </div>
</template>
```

## Поддержка тем

### 1. Опциональный theme prop

```vue
<script setup lang="ts">
interface Props {
  theme?: Record<string, string> // Опциональная тема
}

const props = withDefaults(defineProps<Props>(), {
  theme: undefined
})
</script>

<template>
  <!-- Тема применяется только если передана -->
  <div :style="theme || {}">
</template>
```

### 2. Глобальные CSS переменные

Если `theme` не передан, компонент использует глобальные переменные из `src/styles/theme.css`.

## Примеры соответствия стандарту

### ✅ Button компонент (ПРАВИЛЬНЫЙ)

```
src/components/Button/
├── Button.vue              # Импортирует styles, использует styles.wrapper
├── Button.types.ts         # ButtonProps интерфейс
├── Button.themes.ts        # ButtonTheme с --crm-ui-kit- префиксом
├── Button.module.scss      # Все стили в отдельном файле
└── __stories__/
    └── Button.stories.ts
```

### ✅ Input компонент (ИСПРАВЛЕН)

```
src/components/Input/
├── Input.vue               # Теперь импортирует styles из .module.scss
├── Input.types.ts
├── Input.themes.ts
├── Input.module.scss       # Стили вынесены в отдельный файл
└── __stories__/
    └── Input.stories.ts
```

## Миграция существующих компонентов

Если компонент имеет встроенные стили:

1. Создать `ComponentName.module.scss`
2. Скопировать стили из `<style module>`
3. Добавить импорт: `import styles from './ComponentName.module.scss'`
4. Заменить `$style.` на `styles.` в темплейте
5. Удалить блок `<style module>`

## Storybook документация

### Структура stories файлов

Для каждого компонента должны быть созданы:

```
__stories__/
├── ComponentName.stories.ts   # Конфигурация Storybook stories
├── ComponentName.mdx          # MDX документация компонента
└── Themes.mdx                 # MDX документация тем (опционально)
```

**Обязательность:**
- `ComponentName.stories.ts` - **обязательно**
- `ComponentName.mdx` - **обязательно** для полной документации
- `Themes.mdx` - **опционально** (рекомендуется для компонентов с несколькими темами)

### ComponentName.stories.ts

```typescript
import type { Meta, StoryObj } from '@storybook/vue3'

import ComponentName from '../ComponentName.vue'
import { ComponentNameTheme } from '../ComponentName.themes'

const meta = {
  title: 'Components/ComponentName',
  component: ComponentName,
  parameters: {
    docs: {
      source: {
        code: USAGE,
        language: 'vue',
      },
    },
  },
  args: {
    theme: ComponentNameTheme,
  },
  argTypes: {
    theme: {
      control: 'object',
      description: 'Объект с CSS переменными темы'
    },
    // Другие argTypes...
  },
} satisfies Meta<typeof ComponentName>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
```

### Правила для argTypes темы

**ОБЯЗАТЕЛЬНО** для всех компонентов с темами:

```typescript
argTypes: {
  theme: {
    control: 'object',
    description: 'Объект с CSS переменными темы'
  },
  className: {
    control: 'text',
    description: 'Дополнительные CSS классы'
  }
}
```

Это позволяет Storybook правильно отображать CSS переменные темы в разделе Props, давая возможность редактировать их в интерфейсе.

❌ **НЕ ДОПУСКАЕТСЯ**:
```typescript
theme: {
  control: { type: 'select' },
  options: [Theme1, Theme2],
  // Это скрывает CSS переменные
}
```

✅ **ПРАВИЛЬНО**:
```typescript
theme: {
  control: 'object',
  description: 'Объект с CSS переменными темы'
}
```

### ComponentName.mdx

MDX файл должен использовать **минимальный набор зависимостей**:

✅ **ПРАВИЛЬНО** - минимальные импорты:
```mdx
import { Title, Meta, Canvas, Controls } from '@storybook/addon-docs/blocks';
import * as ComponentNameStories from './ComponentName.stories';

<Meta of={ComponentNameStories} />

<Title>ComponentName</Title>

<Canvas of={ComponentNameStories.Default} />

## Использование

```vue
<script setup>
import { ComponentName, ComponentNameTheme } from '@amocrm/vue-ui-kit'
</script>

<template>
  <ComponentName :theme="ComponentNameTheme" />
</template>
```

## Props

<Controls />
```

❌ **НЕ ДОПУСКАЕТСЯ** - избыточные зависимости:
```mdx
// НЕ ИСПОЛЬЗУЙТЕ эти импорты:
import { CodeBlock } from '@storybook-utils/components'
import { i18n } from '@i18n'
import ReactMarkdown from 'react-markdown'

// НЕ используйте обертки для заголовков:
<ReactMarkdown>{'## ' + i18n.t('Usage')}</ReactMarkdown>

// Вместо этого используйте просто:
## Использование
```

### Правила для MDX:

1. **Импорты**: используйте только `@storybook/addon-docs/blocks`
2. **Заголовки**: пишите напрямую в Markdown формате (`## Заголовок`)
3. **Блоки кода**: используйте Markdown синтаксис с тройными backticks
4. **Интернационализация**: не используйте i18n в MDX, используйте русский язык напрямую

### Центрирование компонентов в Canvas

Для компонентов, которые занимают меньше 100% ширины (например, Spinner, Icon), используйте декоратор:

```typescript
const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  decorators: [
    () => ({
      template: '<div style="display: flex; justify-content: center; align-items: center; min-height: 100px;"><story /></div>'
    })
  ],
  // ...
}
```

### Stories для различных состояний

**Рекомендуется** создавать stories для всех значимых состояний:

```typescript
export const Default: Story = {
  args: { theme: ComponentPrimaryTheme }
}

export const Disabled: Story = {
  args: { theme: ComponentPrimaryTheme, isDisabled: true }
}

export const Loading: Story = {
  args: { theme: ComponentPrimaryTheme, isLoading: true }
}

export const WithError: Story = {
  args: { theme: ComponentPrimaryTheme, hasError: true }
}
```

## Процесс проверки компонента

Для проверки соответствия компонента стандартам используйте:

1. **[COMPONENT_CHECKLIST.md](COMPONENT_CHECKLIST.md)** - пошаговый чеклист из 12 разделов
2. **[MIGRATION.md](MIGRATION.md)** - таблица со статусом всех компонентов

### Быстрая проверка

```bash
# Проверка TypeScript
npx tsc --noEmit src/components/ComponentName/**/*.ts

# Проверка структуры файлов
ls -la src/components/ComponentName/

# Запуск Storybook
yarn storybook

# Открыть компонент в браузере
open http://localhost:6006/?path=/story/components-componentname--default
```

## Заключение

Следование этому стандарту обеспечивает:
- ✅ Консистентность архитектуры
- ✅ Легкость поддержки и рефакторинга
- ✅ Масштабируемость кодовой базы
- ✅ Удобство работы в команде
- ✅ Соответствие современным практикам Vue.js разработки
- ✅ Единообразие документации в Storybook
- ✅ Идентичность с React версией библиотеки

**ВАЖНО:** Все новые компоненты ДОЛЖНЫ следовать этому стандарту. Существующие компоненты должны быть постепенно приведены к соответствию используя процесс из [MIGRATION.md](MIGRATION.md).