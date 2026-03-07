import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'

import RadioGroup from '../RadioGroup.vue'
import RadioGroupItemRoot from '../components/ItemRoot/ItemRoot.vue'
import RadioGroupRadio from '../components/Radio/Radio.vue'
import Label from '@/components/Label/Label.vue'
import Text from '@/components/Text/Text.vue'
import { TextPrimaryTheme, TextSecondaryLightTheme } from '@/components/Text/Text.themes'
import { LabelTheme } from '@/components/Label/Label.themes'
import {
  RadioGroupTheme,
  RadioGroupItemRootTheme,
  RadioPrimaryTheme,
} from '../index'

const DefaultRadioValues = [
  {
    name: 'Слева',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus ipsam ducimus inventore minima optio error unde incidunt atque. Minima, maxime?',
  },
  {
    name: 'Сверху',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo, voluptatibus. Rem ipsa placeat a laboriosam ipsum harum eligendi corrupti laudantium dicta, doloribus quia labore libero et, quod dolores architecto repellendus.',
  },
  {
    name: 'Справа',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, accusamus.',
  },
]

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  parameters: {
    docs: {
      description: {
        component: `
Компонент RadioGroup для создания групп радио-кнопок с различными ориентациями.

## Возможности

- **Две ориентации**: горизонтальная и вертикальная
- **Темы**: для RadioGroup, ItemRoot и Radio
- **Состояния**: обычное, отключено
- **Управление**: контролируемый и неконтролируемый режимы
- **Интеграция с Label**: поддержка Label с текстом и описанием

## Применение

- Формы с выбором одного варианта
- Настройки с группировкой опций
- Фильтры и сортировка

## Импорт

\`\`\`typescript
import {
  RadioGroup,
  RadioGroupItemRoot,
  RadioGroupRadio,
  RadioGroupTheme,
  RadioGroupItemRootTheme,
  RadioPrimaryTheme
} from '@flysk-tech/amocrm-kommo-vue-ui-kit'
\`\`\`

## API

### RadioGroup Props

- \`theme\` - объект темы оформления
- \`name\` - имя группы радио-кнопок (обязательный)
- \`orientation\` - ориентация группы ('horizontal' | 'vertical')
- \`value\` - текущее выбранное значение (контролируемый режим)
- \`defaultValue\` - начальное значение (неконтролируемый режим)
- \`isDisabled\` - отключить всю группу
- \`onChange\` - обработчик изменения значения

### RadioGroup.ItemRoot Props

- \`theme\` - объект темы оформления
- \`value\` - уникальное значение элемента
- \`isDisabled\` - отключить элемент
- \`className\` - дополнительные CSS классы

### RadioGroup.Radio Props

- \`theme\` - объект темы оформления
- \`className\` - дополнительные CSS классы

### Events

- \`@change\` - событие изменения выбранного значения
        `
      }
    }
  },
  args: {
    theme: RadioGroupTheme,
    name: 'radioGroup',
    orientation: 'horizontal',
  },
  argTypes: {
    theme: {
      control: 'object',
      description: 'Тема оформления'
    },
    name: {
      control: 'text',
      description: 'Имя группы радио-кнопок'
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Ориентация группы'
    },
    isDisabled: {
      control: 'boolean',
      description: 'Отключить всю группу'
    },
    value: {
      control: 'text',
      description: 'Текущее выбранное значение (контролируемый режим)'
    },
    defaultValue: {
      control: 'text',
      description: 'Начальное значение (неконтролируемый режим)'
    }
  }
} satisfies Meta<typeof RadioGroup>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { RadioGroup, RadioGroupItemRoot, RadioGroupRadio, Label, Text },
    setup() {
      const selectedValue = ref(DefaultRadioValues[0].name.toLowerCase())
      return {
        args,
        selectedValue,
        DefaultRadioValues,
        RadioGroupItemRootTheme,
        RadioPrimaryTheme,
        LabelTheme,
        TextPrimaryTheme,
        TextSecondaryLightTheme,
      }
    },
    template: `
      <RadioGroup
        v-bind="args"
        v-model="selectedValue"
      >
        <RadioGroupItemRoot
          v-for="item in DefaultRadioValues"
          :key="item.name"
          :value="item.name.toLowerCase()"
          :theme="RadioGroupItemRootTheme"
        >
          <Label
            textPlacement="right"
            :theme="LabelTheme"
          >
            <template #text>
              <Text size="l" :theme="TextPrimaryTheme">
                {{ item.name }}
              </Text>
            </template>
            <template #description>
              <Text size="s" :theme="TextSecondaryLightTheme">
                {{ item.description }}
              </Text>
            </template>
            <template #default>
              <RadioGroupRadio :theme="RadioPrimaryTheme" />
            </template>
          </Label>
        </RadioGroupItemRoot>
      </RadioGroup>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример RadioGroup с горизонтальной ориентацией.'
      }
    }
  }
}

export const Uncontrolled: Story = {
  render: (args) => ({
    components: { RadioGroup, RadioGroupItemRoot, RadioGroupRadio, Label, Text },
    setup() {
      return {
        args,
        DefaultRadioValues,
        RadioGroupItemRootTheme,
        RadioPrimaryTheme,
        LabelTheme,
        TextPrimaryTheme,
        TextSecondaryLightTheme,
      }
    },
    template: `
      <RadioGroup
        v-bind="args"
        :defaultValue="DefaultRadioValues[0].name.toLowerCase()"
      >
        <RadioGroupItemRoot
          v-for="item in DefaultRadioValues"
          :key="item.name"
          :value="item.name.toLowerCase()"
          :theme="RadioGroupItemRootTheme"
        >
          <Label
            textPlacement="right"
            :theme="LabelTheme"
          >
            <template #text>
              <Text size="l" :theme="TextPrimaryTheme">
                {{ item.name }}
              </Text>
            </template>
            <template #description>
              <Text size="s" :theme="TextSecondaryLightTheme">
                {{ item.description }}
              </Text>
            </template>
            <template #default>
              <RadioGroupRadio :theme="RadioPrimaryTheme" />
            </template>
          </Label>
        </RadioGroupItemRoot>
      </RadioGroup>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Неконтролируемый RadioGroup с начальным значением.'
      }
    }
  }
}

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
  render: (args) => ({
    components: { RadioGroup, RadioGroupItemRoot, RadioGroupRadio, Label, Text },
    setup() {
      const selectedValue = ref(DefaultRadioValues[0].name.toLowerCase())
      return {
        args,
        selectedValue,
        DefaultRadioValues,
        RadioGroupItemRootTheme,
        RadioPrimaryTheme,
        LabelTheme,
        TextPrimaryTheme,
        TextSecondaryLightTheme,
      }
    },
    template: `
      <RadioGroup
        v-bind="args"
        v-model="selectedValue"
      >
        <RadioGroupItemRoot
          v-for="item in DefaultRadioValues"
          :key="item.name"
          :value="item.name.toLowerCase()"
          :theme="RadioGroupItemRootTheme"
        >
          <Label
            textPlacement="right"
            :theme="LabelTheme"
          >
            <template #text>
              <Text size="l" :theme="TextPrimaryTheme">
                {{ item.name }}
              </Text>
            </template>
            <template #description>
              <Text size="s" :theme="TextSecondaryLightTheme">
                {{ item.description }}
              </Text>
            </template>
            <template #default>
              <RadioGroupRadio :theme="RadioPrimaryTheme" />
            </template>
          </Label>
        </RadioGroupItemRoot>
      </RadioGroup>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'RadioGroup с вертикальной ориентацией.'
      }
    }
  }
}
