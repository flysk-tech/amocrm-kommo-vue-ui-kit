import type { Meta, StoryObj } from '@storybook/vue3'

import Label from '../Label.vue'
import LabelGroup from '../LabelGroup.vue'
import Text from '@/components/Text/Text.vue'
import TextArea from '@/components/TextArea/TextArea.vue'
import Switcher from '@/components/Switcher/Switcher.vue'
import { TextPrimaryTheme, TextSecondaryLightTheme } from '@/components/Text/Text.themes'
import { TextareaLightTheme } from '@/components/TextArea/TextArea.themes'
import { SwitcherPrimaryTheme } from '@/components/Switcher/Switcher.themes'
import { LabelTheme, LabelGroupTheme } from '../Label.themes'

const meta = {
  title: 'Components/Label',
  component: Label,
  parameters: {
    docs: {
      description: {
        component: `
Компонент Label для создания подписей к элементам формы.

## Возможности

- **Размещение текста**: сверху, слева или справа от элемента
- **Описание**: дополнительный текст под основной подпиской
- **Центрирование**: выравнивание по центру
- **Группировка**: компонент LabelGroup для объединения меток

## Применение

- Подписи к полям форм
- Переключатели с описанием
- Группы связанных элементов

## Импорт

\`\`\`typescript
import { Label, LabelGroup, LabelTheme, LabelGroupTheme } from '@flysk-tech/amocrm-kommo-vue-ui-kit'
\`\`\`

## API

### Props

- \`theme\` - объект темы оформления (обязательный)
- \`text\` - текст подписи (string или VNode)
- \`description\` - дополнительное описание (string или VNode)
- \`textPlacement\` - расположение текста ('top' | 'left' | 'right')
- \`isCentered\` - центрировать содержимое
- \`class\` - дополнительные CSS классы

### Slots

- \`default\` - элемент формы
        `
      }
    }
  },
  args: {
    theme: LabelTheme
  },
  argTypes: {
    theme: {
      control: 'object',
      description: 'Объект с CSS переменными темы'
    },
    text: {
      control: 'text',
      description: 'Текст подписи'
    },
    description: {
      control: 'text',
      description: 'Дополнительное описание'
    },
    textPlacement: {
      control: 'select',
      options: ['top', 'left', 'right'],
      description: 'Расположение текста'
    },
    isCentered: {
      control: 'boolean',
      description: 'Центрировать содержимое'
    },
  }
} satisfies Meta<typeof Label>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { Label, Text, TextArea },
    setup() {
      return { args, TextPrimaryTheme, TextareaLightTheme }
    },
    template: `
      <div style="width: 100%;">
        <Label :theme="args.theme">
          <template #default>
            <div style="margin-bottom: 4px;">
              <Text size="l" :theme="TextPrimaryTheme">
                Как могут помочь наши партнеры?
              </Text>
            </div>
            <TextArea
              :theme="TextareaLightTheme"
              placeholder="Как могут помочь наши партнеры?"
            />
          </template>
        </Label>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример Label с текстовым полем.'
      }
    }
  }
}

export const Group: Story = {
  render: (args) => ({
    components: { Label, LabelGroup, Text, Switcher },
    setup() {
      const elements = [
        { text: 'Расскажите о себе' },
        { text: 'Предоставьте больше информации' }
      ]
      return {
        args,
        elements,
        LabelTheme,
        LabelGroupTheme,
        TextPrimaryTheme,
        TextSecondaryLightTheme,
        SwitcherPrimaryTheme
      }
    },
    template: `
      <div style="width: 100%;">
        <LabelGroup :theme="LabelGroupTheme">
          <Label
            v-for="element in elements"
            :key="element.text"
            :theme="LabelTheme"
            textPlacement="right"
          >
            <Switcher :isDefaultChecked="false" :theme="SwitcherPrimaryTheme" />
            <template #text>
              <Text size="l" :theme="TextPrimaryTheme">
                {{ element.text }}
              </Text>
            </template>
            <template #description>
              <Text size="s" :theme="TextSecondaryLightTheme">
                Свернуть приложения чата в одну кнопку
              </Text>
            </template>
          </Label>
        </LabelGroup>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Пример группы Label с переключателями.'
      }
    }
  }
}

export const WithDescription: Story = {
  render: (args) => ({
    components: { Label, Text, Switcher },
    setup() {
      return {
        args,
        LabelTheme,
        TextPrimaryTheme,
        TextSecondaryLightTheme,
        SwitcherPrimaryTheme
      }
    },
    template: `
      <div style="width: 100%;">
        <Label :theme="LabelTheme" textPlacement="right">
          <Switcher :isDefaultChecked="false" :theme="SwitcherPrimaryTheme" />
          <template #text>
            <Text size="l" :theme="TextPrimaryTheme">
              Текст метки
            </Text>
          </template>
          <template #description>
            <Text size="s" :theme="TextSecondaryLightTheme">
              Свернуть приложения чата в одну кнопку
            </Text>
          </template>
        </Label>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Label с описанием и размещением текста справа.'
      }
    }
  }
}
