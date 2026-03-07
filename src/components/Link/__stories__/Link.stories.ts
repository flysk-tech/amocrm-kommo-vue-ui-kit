import type { Meta, StoryObj } from '@storybook/vue3'

import Link from '../Link.vue'
import { LinkPrimaryTheme } from '../Link.themes'

const meta = {
  title: 'Components/Link',
  component: Link,
  parameters: {
    docs: {
      description: {
        component: `
Компонент Link для создания ссылок с настраиваемым стилем.

## Возможности

- **Стандартная тема**: готовая Primary тема
- **Hover эффекты**: изменение цвета при наведении
- **Focus состояния**: доступность с клавиатуры
- **Кастомизация**: полная настройка через CSS переменные

## Применение

- Навигационные ссылки
- Ссылки в тексте
- Внешние ссылки

## Импорт

\`\`\`typescript
import { Link, LinkPrimaryTheme } from '@flysk-tech/amocrm-kommo-vue-ui-kit'
\`\`\`

## API

### Props

- \`theme\` - объект темы оформления (обязательный)
- \`class\` - дополнительные CSS классы
- \`href\` - URL ссылки (через v-bind="$attrs")
- \`target\` - целевое окно (через v-bind="$attrs")

### Slots

- \`default\` - текст ссылки
        `
      }
    }
  },
  args: {
    theme: LinkPrimaryTheme,
  },
  argTypes: {
    theme: {
      control: 'object',
      description: 'Объект с CSS переменными темы'
    },
  }
} satisfies Meta<typeof Link>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { Link },
    setup() {
      return { args }
    },
    template: `
      <Link v-bind="args" href="#">
        Перейти в Dashboard
      </Link>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример ссылки с Primary темой.'
      }
    }
  }
}
