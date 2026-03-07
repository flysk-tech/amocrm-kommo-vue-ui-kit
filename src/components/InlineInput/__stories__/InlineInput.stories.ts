import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'

import InlineInput from '../InlineInput.vue'
import {
  InlineInputPrimaryTheme,
  InlineInputPrimaryFocusedTheme,
  type InlineInputTheme,
} from '../InlineInput.themes'

const FixedWidthInlineInputPrimaryTheme: InlineInputTheme = {
  ...InlineInputPrimaryTheme,
  '--crm-ui-kit-inline-input-width': '300px',
}

const FixedWidthInlineInputPrimaryFocusedTheme: InlineInputTheme = {
  ...InlineInputPrimaryFocusedTheme,
  '--crm-ui-kit-inline-input-width': '300px',
}

const themeMap = {
  InlineInputPrimaryTheme: FixedWidthInlineInputPrimaryTheme,
  InlineInputPrimaryFocusedTheme: FixedWidthInlineInputPrimaryFocusedTheme,
}

const meta = {
  title: 'Components/InlineInput',
  component: InlineInput,
  parameters: {
    docs: {
      description: {
        component: `
Компонент InlineInput для инлайнового редактирования текста.

## Возможности

- **Две темы**: Primary (без рамки) и PrimaryFocused (с рамкой)
- **Состояния**: обычное, ошибка, отключено
- **Описание ошибки**: invalidDescription с всплывающей подсказкой
- **Иконки**: поддержка слота after для добавления иконок
- **Кастомизация**: полная настройка через CSS переменные

## Применение

- Редактирование заголовков
- Инлайновое изменение значений
- Быстрое редактирование в таблицах

## Импорт

\`\`\`typescript
import {
  InlineInput,
  InlineInputPrimaryTheme,
  InlineInputPrimaryFocusedTheme
} from '@flysk-tech/amocrm-kommo-vue-ui-kit'
\`\`\`

## API

### Props

- \`theme\` - объект темы оформления (обязательный)
- \`isInvalid\` - отображать ошибку
- \`isDisabled\` - отключить поле
- \`invalidDescription\` - текст описания ошибки
- \`after\` - контент после инпута (иконки)
- \`className\` - дополнительные CSS классы
- \`v-model\` - двустороннее связывание значения (через v-bind="$attrs")

### Events

- \`@input\` - событие ввода текста (через v-bind="$attrs")
- \`@change\` - событие изменения (через v-bind="$attrs")

### Slots

- \`after\` - контент после инпута (иконки)
        `
      }
    }
  },
  args: {
    theme: FixedWidthInlineInputPrimaryTheme,
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
    invalidDescription: {
      control: 'text',
      description: 'Текст описания ошибки'
    },
  }
} satisfies Meta<typeof InlineInput>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { InlineInput },
    setup() {
      const text = ref('')
      return { args, text }
    },
    template: `
      <InlineInput v-bind="args" v-model="text" placeholder="Placeholder" />
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример InlineInput.'
      }
    }
  }
}

export const States: Story = {
  render: (args) => ({
    components: { InlineInput },
    setup() {
      return { args }
    },
    template: `
      <div style="width: 100%; display: flex; flex-direction: column; gap: 10px;">
        <InlineInput v-bind="args" placeholder="Idle" />
        <InlineInput
          v-bind="args"
          :isInvalid="true"
          invalidDescription="Обязательное поле"
          placeholder="isInvalid"
        />
        <InlineInput v-bind="args" :isDisabled="true" placeholder="isDisabled" />
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Различные состояния InlineInput: обычное, ошибка, отключено.'
      }
    }
  }
}

export const Invalid: Story = {
  args: {
    isInvalid: true,
    invalidDescription: 'Обязательное поле',
  },
  render: (args) => ({
    components: { InlineInput },
    setup() {
      const text = ref('')
      return { args, text }
    },
    template: `
      <InlineInput v-bind="args" v-model="text" placeholder="Placeholder" />
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'InlineInput с ошибкой и описанием.'
      }
    }
  }
}
