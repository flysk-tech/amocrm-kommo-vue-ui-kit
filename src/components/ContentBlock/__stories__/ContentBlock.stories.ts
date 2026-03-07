import type { Meta, StoryObj } from '@storybook/vue3'

import ContentBlock from '../ContentBlock.vue'
import Text from '@/components/Text/Text.vue'
import { TextPrimaryTheme } from '@/components/Text/Text.themes'
import { ContentBlockTheme } from '../ContentBlock.themes'

const meta = {
  title: 'Components/ContentBlock',
  component: ContentBlock,
  parameters: {
    docs: {
      description: {
        component: `
Компонент ContentBlock для создания контентных блоков с фоном и тенью.

## Возможности

- **Стандартная тема**: готовая тема с тенью и скругленными углами
- **Кастомизация**: полная настройка через CSS переменные
- **Slot**: поддержка любого контента через default slot

## Применение

- Карточки контента
- Панели с информацией
- Блоки настроек

## Импорт

\`\`\`typescript
import { ContentBlock, ContentBlockTheme } from '@flysk-tech/amocrm-kommo-vue-ui-kit'
\`\`\`

## API

### Props

- \`theme\` - объект темы оформления (обязательный)
- \`class\` - дополнительные CSS классы

### Slots

- \`default\` - основной контент блока
        `
      }
    }
  },
  args: {
    theme: ContentBlockTheme
  },
  argTypes: {
    theme: {
      control: 'object',
      description: 'Объект с CSS переменными темы'
    },
  }
} satisfies Meta<typeof ContentBlock>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { ContentBlock, Text },
    setup() {
      return { args, TextPrimaryTheme }
    },
    template: `
      <ContentBlock v-bind="args">
        <Text :theme="TextPrimaryTheme" size="l">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus ipsam
          ducimus inventore minima optio error unde incidunt atque. Minima,
          maxime?
        </Text>
      </ContentBlock>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример блока контента с текстом.'
      }
    }
  }
}
