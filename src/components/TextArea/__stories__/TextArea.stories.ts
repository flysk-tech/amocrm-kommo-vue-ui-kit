import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'

import TextArea from '../TextArea.vue'
import { TextareaLightTheme, TextareaDarkTheme } from '../TextArea.themes'

const themeMap = {
  TextareaLightTheme,
  TextareaDarkTheme,
}

const meta = {
  title: 'Components/TextArea',
  component: TextArea,
  parameters: {
    docs: {
      description: {
        component: `
Компонент TextArea для многострочного текстового ввода.

## Возможности

- **Две темы**: Light и Dark
- **Автоматический resize**: опция isAutosized
- **Состояния**: обычное, ошибка, отключено
- **Описание ошибки**: invalidDescription
- **Настройка размера**: rows, maxHeight
- **Кастомизация**: полная настройка через CSS переменные

## Применение

- Многострочный ввод текста
- Комментарии и заметки
- Описания и сообщения

## Импорт

\`\`\`typescript
import { TextArea, TextareaLightTheme, TextareaDarkTheme } from '@flysk-tech/amocrm-kommo-vue-ui-kit'
\`\`\`

## API

### Props

- \`theme\` - объект темы оформления (обязательный)
- \`isInvalid\` - отображать ошибку
- \`isDisabled\` - отключить поле
- \`isAutosized\` - автоматическое изменение высоты
- \`invalidDescription\` - текст описания ошибки
- \`maxHeight\` - максимальная высота при isAutosized
- \`rows\` - количество строк
- \`className\` - дополнительные CSS классы
- \`v-model\` - двустороннее связывание значения (через v-bind="$attrs")

### Events

- \`@input\` - событие ввода текста (через v-bind="$attrs")
- \`@change\` - событие изменения (через v-bind="$attrs")
- \`@resize\` - событие изменения размера (для isAutosized)
        `
      }
    }
  },
  args: {
    theme: TextareaLightTheme,
  },
  argTypes: {
    theme: {
      control: 'select',
      options: Object.keys(themeMap),
      mapping: themeMap,
      description: 'Тема оформления'
    },
    isInvalid: {
      control: 'boolean',
      description: 'Отображать ошибку'
    },
    isDisabled: {
      control: 'boolean',
      description: 'Отключить поле'
    },
    isAutosized: {
      control: 'boolean',
      description: 'Автоматическое изменение высоты'
    },
    invalidDescription: {
      control: 'text',
      description: 'Текст описания ошибки'
    },
    maxHeight: {
      control: 'number',
      description: 'Максимальная высота при isAutosized'
    },
  }
} satisfies Meta<typeof TextArea>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { TextArea },
    setup() {
      const text = ref('')
      return { args, text }
    },
    template: `
      <TextArea v-bind="args" v-model="text" placeholder="TextArea" :rows="2" />
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример TextArea.'
      }
    }
  }
}

export const States: Story = {
  render: (args) => ({
    components: { TextArea },
    setup() {
      return { args }
    },
    template: `
      <div style="width: 100%; display: flex; flex-direction: column; gap: 10px;">
        <TextArea v-bind="args" placeholder="Idle" :rows="2" />
        <TextArea
          v-bind="args"
          :isInvalid="true"
          invalidDescription="Обязательное поле"
          placeholder="isInvalid"
          :rows="2"
        />
        <TextArea v-bind="args" :isDisabled="true" placeholder="isDisabled" :rows="2" />
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Различные состояния TextArea: обычное, ошибка, отключено.'
      }
    }
  }
}

export const Autosize: Story = {
  args: {
    isAutosized: true,
    maxHeight: 500,
  },
  render: (args) => ({
    components: { TextArea },
    setup() {
      const text = ref('')
      return { args, text }
    },
    template: `
      <TextArea v-bind="args" v-model="text" placeholder="TextArea" :rows="2" />
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'TextArea с автоматическим изменением высоты до maxHeight.'
      }
    }
  }
}

export const TextareaLight: Story = {
  tags: ['!autodocs'],
  args: { theme: TextareaLightTheme }
}

export const TextareaDark: Story = {
  tags: ['!autodocs'],
  args: { theme: TextareaDarkTheme }
}
