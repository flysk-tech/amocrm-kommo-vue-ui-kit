# ✅ Чеклист проверки компонента

Используйте этот чеклист для проверки каждого компонента перед отметкой как "готов" в [MIGRATION.md](MIGRATION.md).

**⚠️ КРИТИЧЕСКИ ВАЖНО:** Структура Vue компонента должна быть **ИДЕНТИЧНА** структуре React компонента!

**ПРАВИЛО:** Если в React версии нет каких-то файлов (stories, тесты, MDX), то и в Vue версии их создавать **НЕ НУЖНО**.

---

## 🔍 0. АНАЛИЗ React компонента (ПЕРВЫЙ ШАГ!)

**⚠️ ОБЯЗАТЕЛЬНО выполнить ПЕРЕД началом портирования!**

```bash
# Посмотреть структуру React компонента
ls -la ../crm-react-ui-kit/src/components/ComponentName/

# Посмотреть рекурсивно все файлы
tree ../crm-react-ui-kit/src/components/ComponentName/
```

### Чеклист файлов в React версии
- [ ] Записать список ВСЕХ файлов React компонента
- [ ] `index.tsx` или `ComponentName.tsx` - основной компонент
- [ ] `ComponentName.props.ts` - типы (станет `ComponentName.types.ts`)
- [ ] `ComponentName.themes.ts` - темы (есть / нет)
- [ ] `ComponentName.module.scss` - стили (есть / нет)
- [ ] `index.ts` - экспорты (есть / нет)
- [ ] `__stories__/` - директория со stories (есть / нет)
  - [ ] `ComponentName.stories.tsx`
  - [ ] `ComponentName.mdx`
  - [ ] `Themes.mdx`
- [ ] `__tests__/` - директория с тестами (есть / нет)
  - [ ] `ComponentName.test.tsx`
  - [ ] `ComponentName.e2e.test.ts`
- [ ] `__image_snapshots__/` - снимки тестов (есть / нет)
- [ ] `components/` - подкомпоненты (есть / нет)
- [ ] `hooks/` - React hooks (станут `composables/`)

**📝 Создать список:** Записать все файлы, которые нужно портировать

---

## 📋 1. Портирование файлов

### Основные файлы
- [ ] `ComponentName.vue` - создан из `ComponentName.tsx`
  - [ ] Использует `<script setup lang="ts">`
  - [ ] Template портирован (JSX → Vue template)
  - [ ] Логика портирована (React hooks → Vue composables)
- [ ] `ComponentName.types.ts` - создан из `ComponentName.props.ts`
  - [ ] Все интерфейсы портированы
  - [ ] JSDoc комментарии сохранены
  - [ ] Обработчики событий заменены на `any` (обход Vue compiler)
- [ ] `ComponentName.themes.ts` - скопирован (если есть в React)
  - [ ] Все CSS переменные идентичны
  - [ ] Все темы идентичны
- [ ] `ComponentName.module.scss` - скопирован (если есть в React)
  - [ ] Все классы идентичны
  - [ ] Все стили идентичны
  - [ ] @keyframes анимации скопированы
- [ ] `index.ts` - создан с экспортами
  - [ ] Экспортирован компонент
  - [ ] Экспортированы темы (если есть)
  - [ ] Экспортированы типы

### Подкомпоненты (если есть в React)
- [ ] `components/` директория создана
- [ ] Все подкомпоненты портированы
- [ ] Структура директорий идентична

### Composables (если в React есть hooks)
- [ ] `composables/` директория создана
- [ ] React hooks портированы в Vue composables
- [ ] Логика идентична

---

## 📚 2. Storybook (ТОЛЬКО если есть в React!)

### Stories
- [ ] `__stories__/ComponentName.stories.ts` - создан из `.stories.tsx`
  - [ ] Использует CSF 3.0 формат
  - [ ] Все stories портированы
  - [ ] Args идентичны
  - [ ] Controls работают

### Документация
- [ ] `__stories__/ComponentName.mdx` - портирован (если есть в React)
  - [ ] Все разделы портированы
  - [ ] Удален `import { i18n }` (не используем)
  - [ ] Примеры кода адаптированы для Vue
- [ ] `__stories__/Themes.mdx` - портирован (если есть в React)

### Проверка в браузере
```bash
# Запустить Storybook
yarn storybook
```
- [ ] Компонент появляется в sidebar
- [ ] Story "Default" отображается
- [ ] Нет ошибок в консоли
- [ ] Controls работают

---

## 🧪 3. Тесты (ОБЯЗАТЕЛЬНО если есть в React!)

### Unit тесты
- [ ] `__tests__/ComponentName.test.ts` - портирован
  - [ ] Jest → Vitest
  - [ ] `@testing-library/react` → `@testing-library/vue`
  - [ ] Все тесты портированы
  - [ ] Логика тестов идентична

### E2E тесты (если есть в React)
- [ ] `__tests__/ComponentName.e2e.test.ts` - портирован
  - [ ] Playwright тесты адаптированы для Vue
  - [ ] Все сценарии идентичны

### Image Snapshots (ОБЯЗАТЕЛЬНО СКОПИРОВАТЬ!)
```bash
# Скопировать image snapshots из React версии
cp -r ../crm-react-ui-kit/src/components/ComponentName/__image_snapshots__ \
     src/components/ComponentName/__image_snapshots__
```
- [ ] `__image_snapshots__/` директория скопирована из React
- [ ] Все .png файлы на месте

---

## 🐳 4. Запуск тестов через Docker (если есть тесты в React)

### Запуск
```bash
# Запустить все тесты через Docker
docker compose up test

# ИЛИ запустить тесты конкретного компонента
docker compose run test yarn test ComponentName
```

### Проверка результатов
- [ ] ✅ Все unit тесты проходят
- [ ] ✅ Все E2E тесты проходят
- [ ] ✅ Image snapshots совпадают (нет diff)
- [ ] ✅ Нет новых failing тестов
- [ ] ✅ Coverage не ухудшился

**⚠️ ВАЖНО:** Тесты ДОЛЖНЫ проходить перед тем, как отметить компонент как готовый!

---

## 🔍 5. Проверка ComponentName.vue

### Базовая структура
- [ ] Использует `<script setup lang="ts">`
- [ ] Импортирует типы: `import type { ComponentProps } from './ComponentName.types'`
- [ ] Импортирует стили: `import styles from './ComponentName.module.scss'`
- [ ] Определяет props: `defineProps<ComponentProps>()`

### Template
- [ ] Корневой элемент идентичен React версии
- [ ] Используются CSS модули через `styles.className`
- [ ] Поддерживает prop `className`: `:class="[styles.wrapper, className]"`
- [ ] Поддерживает prop `theme`: `:style="theme"`
- [ ] Слоты определены правильно (аналог children)

### Логика
- [ ] Vue refs вместо useState
- [ ] Vue computed вместо useMemo
- [ ] Vue watch вместо useEffect
- [ ] Composables вместо hooks (если есть)

---

## 📝 6. Проверка ComponentName.types.ts

### Основной интерфейс Props
- [ ] Определен интерфейс `ComponentProps`
- [ ] Все свойства из React props портированы
- [ ] JSDoc комментарии сохранены
- [ ] Импортирован `ComponentThemeType` (если есть)

### Особенности Vue
- [ ] Обработчики событий имеют тип `any` (обход Vue compiler)
- [ ] Нет `extends` от HTML attributes (Vue compiler не поддерживает)
- [ ] Используется `type Props = BaseProps & {...}` вместо `interface extends`

### Проверка TypeScript
```bash
npx tsc --noEmit src/components/ComponentName/**/*.ts
```
- [ ] Нет ошибок TypeScript

---

## 🎨 7. Проверка ComponentName.themes.ts

### Идентичность с React
```bash
# Сравнить темы
diff ../crm-react-ui-kit/src/components/ComponentName/ComponentName.themes.ts \
     src/components/ComponentName/ComponentName.themes.ts
```
- [ ] Все CSS переменные идентичны
- [ ] Все значения идентичны
- [ ] Количество тем идентично
- [ ] Все переменные начинаются с `--crm-ui-kit-`

---

## 💅 8. Проверка ComponentName.module.scss

### Идентичность с React
```bash
# Сравнить стили
diff ../crm-react-ui-kit/src/components/ComponentName/ComponentName.module.scss \
     src/components/ComponentName/ComponentName.module.scss
```
- [ ] Все классы идентичны
- [ ] Все стили идентичны
- [ ] @keyframes анимации скопированы
- [ ] Используются CSS переменные из тем

### Проверка в браузере
- [ ] Стили применяются корректно
- [ ] CSS переменные работают
- [ ] Hover эффекты работают
- [ ] Анимации работают

---

## 📦 9. Проверка index.ts

### Экспорты (идентичны React)
- [ ] Компонент: `export { default as ComponentName } from './ComponentName.vue'`
- [ ] Темы: `export { ComponentPrimaryTheme, ... } from './ComponentName.themes'`
- [ ] Тип темы: `export type { ComponentThemeType } from './ComponentName.themes'`
- [ ] Тип props: `export type { ComponentProps } from './ComponentName.types'`

---

## 🔧 10. Сравнение с React версией

### Визуальное сравнение
1. Открыть React Storybook
2. Открыть Vue Storybook
3. Сравнить визуально
- [ ] Компоненты выглядят идентично
- [ ] Размеры идентичны
- [ ] Цвета идентичны
- [ ] Шрифты идентичны
- [ ] Отступы идентичны

### Функциональное сравнение
- [ ] Все props работают идентично
- [ ] Все события работают идентично
- [ ] Все состояния (disabled, loading, error) идентичны
- [ ] Анимации идентичны
- [ ] Интерактивность идентична

---

## 🐛 11. Проверка на ошибки

### TypeScript
```bash
npx tsc --noEmit src/components/ComponentName/**/*.ts
```
- [ ] Нет ошибок TypeScript

### Vue Compiler
```bash
yarn storybook
```
- [ ] Нет ошибок `[@vue/compiler-sfc]`
- [ ] Компонент компилируется успешно

### Runtime
1. Открыть Storybook: http://localhost:6006
2. Открыть DevTools Console
- [ ] Нет ошибок при рендере
- [ ] Нет ошибок при взаимодействии
- [ ] Нет ошибок при смене props

---

## ✅ 12. Финальная проверка

### Структура
- [ ] Структура файлов **ИДЕНТИЧНА** React версии
- [ ] Все файлы из React портированы
- [ ] Нет лишних файлов (которых нет в React)

### Функциональность
- [ ] Storybook работает (если stories есть в React)
- [ ] Компонент отображается без ошибок
- [ ] Все props работают
- [ ] Все темы работают
- [ ] Визуально идентичен React

### Тесты (если есть в React)
- [ ] ✅ Unit тесты проходят через Docker
- [ ] ✅ E2E тесты проходят через Docker
- [ ] ✅ Image snapshots совпадают
- [ ] ✅ Coverage не ухудшился

### Обновить MIGRATION.md
```markdown
| # | Компонент | Статус | Vue файл | Types | Themes | Styles | Stories | Tests | Проблемы |
|---|-----------|--------|----------|-------|--------|--------|---------|-------|----------|
| X | ComponentName | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | Нет |
```

---

## 📋 Процесс портирования (пошагово)

### Шаг 0: Анализ React компонента
```bash
ls -la ../crm-react-ui-kit/src/components/ComponentName/
tree ../crm-react-ui-kit/src/components/ComponentName/
```
- Записать какие файлы есть
- Записать какие tests есть
- Записать какие stories есть
- Записать какие подкомпоненты есть

### Шаг 1: Портирование основных файлов
- `.tsx` → `.vue`
- `.props.ts` → `.types.ts`
- Скопировать `.themes.ts` (если есть)
- Скопировать `.module.scss` (если есть)
- Создать `index.ts`

### Шаг 2: Портирование подкомпонентов
- Портировать все компоненты из `components/` (если есть)
- Сохранить структуру директорий

### Шаг 3: Storybook (ТОЛЬКО если есть в React)
- Портировать `.stories.tsx` → `.stories.ts`
- Портировать `.mdx` файлы (если есть)
- Проверить в браузере

### Шаг 4: Тесты (ОБЯЗАТЕЛЬНО если есть в React)
- Портировать unit тесты (Jest → Vitest)
- Портировать E2E тесты (Playwright)
- **СКОПИРОВАТЬ** `__image_snapshots__/` из React

### Шаг 5: Запуск тестов через Docker
```bash
docker compose up test
```
- Все тесты должны пройти ✅

### Шаг 6: Финальная проверка
- Пройти по чеклисту выше
- Сравнить с React версией
- Убедиться что всё идентично

### Шаг 7: Обновить MIGRATION.md
- Отметить компонент как ✅

---

## 🚀 Полезные команды

### Анализ React компонента
```bash
# Посмотреть структуру
ls -la ../crm-react-ui-kit/src/components/ComponentName/

# Посмотреть дерево файлов
tree ../crm-react-ui-kit/src/components/ComponentName/

# Найти все файлы
find ../crm-react-ui-kit/src/components/ComponentName/ -type f
```

### Копирование файлов
```bash
# Скопировать image snapshots
cp -r ../crm-react-ui-kit/src/components/ComponentName/__image_snapshots__ \
     src/components/ComponentName/

# Скопировать стили без изменений
cp ../crm-react-ui-kit/src/components/ComponentName/ComponentName.module.scss \
   src/components/ComponentName/
```

### Сравнение с React
```bash
# Сравнить темы
diff ../crm-react-ui-kit/src/components/ComponentName/ComponentName.themes.ts \
     src/components/ComponentName/ComponentName.themes.ts

# Сравнить стили
diff ../crm-react-ui-kit/src/components/ComponentName/ComponentName.module.scss \
     src/components/ComponentName/ComponentName.module.scss
```

### Проверка
```bash
# TypeScript
npx tsc --noEmit

# Запуск Storybook
yarn storybook

# Запуск тестов через Docker
docker compose up test

# Открыть в браузере
open http://localhost:6006/?path=/story/components-componentname--default
```

---

**⏱️ Время на полную проверку одного компонента:** ~20-40 минут

**📌 ВАЖНО:** Не пропускайте шаг анализа React компонента! Это сэкономит время и предотвратит ошибки.
