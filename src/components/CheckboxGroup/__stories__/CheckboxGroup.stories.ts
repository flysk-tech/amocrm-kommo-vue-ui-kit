import type { Meta, StoryObj } from '@storybook/vue3'

import CheckboxGroup from '../CheckboxGroup.vue'
import { ItemRoot, ItemRootSelectAll } from '../components/ItemRoot'
import { Checkbox } from '../components/Checkbox'
import { CheckboxSelectAll } from '../components/CheckboxSelectAll'
import CheckboxGroupLabel from '@/components/Label/Label.vue'
import Text from '@/components/Text/Text.vue'
import { TextPrimaryTheme } from '@/components/Text/Text.themes'
import { LabelTheme } from '@/components/Label/Label.themes'
import { CheckboxLightTheme } from '@/components/Checkbox/Checkbox.themes'
import {
  CheckboxGroupTheme,
  CheckboxGroupItemRootTheme,
} from '../index'
import type { CheckboxGroupChangeEvent } from '../CheckboxGroup.types'

const DefaultCheckboxValues = [
  {
    name: 'Слева',
    value: 'Left',
  },
  {
    name: 'Сверху',
    value: 'Top',
    isDefaultChecked: true,
  },
  {
    name: 'Справа',
    value: 'Right',
    isDefaultChecked: false,
    isDisabled: true,
  },
]

const meta = {
  title: 'Components/CheckboxGroup',
  component: CheckboxGroup,
  parameters: {
    docs: {
      description: {
        component: `
Компонент CheckboxGroup для создания групп чекбоксов с поддержкой "Выбрать все".

## Возможности

- **Две ориентации**: горизонтальная и вертикальная
- **Темы**: для CheckboxGroup и ItemRoot
- **Select All**: поддержка функции "Выбрать все"
- **Состояния**: обычное, отключено, индетерминированное
- **Управление**: контролируемый режим с onChange
- **Интеграция с Label**: поддержка Label для чекбоксов

## Применение

- Формы с множественным выбором
- Настройки с группировкой опций
- Фильтры с несколькими параметрами

## Импорт

\`\`\`typescript
import {
  CheckboxGroup,
  ItemRoot,
  ItemRootSelectAll,
  Checkbox,
  CheckboxSelectAll,
  CheckboxGroupTheme,
  CheckboxGroupItemRootTheme,
} from '@flysk-tech/amocrm-kommo-vue-ui-kit/CheckboxGroup'
import { CheckboxLightTheme } from '@flysk-tech/amocrm-kommo-vue-ui-kit/Checkbox'
import { LabelTheme } from '@flysk-tech/amocrm-kommo-vue-ui-kit/Label'
\`\`\`

## API

### CheckboxGroup Props

- \`theme\` - объект темы оформления
- \`orientation\` - ориентация группы ('horizontal' | 'vertical')
- \`isDisabled\` - отключить всю группу
- \`onChange\` - обработчик изменения значений (values, changedValue)

### ItemRoot Props

- \`theme\` - объект темы оформления
- \`name\` - уникальное имя элемента (обязательный)
- \`value\` - значение элемента (обязательный)
- \`isDefaultChecked\` - начальное состояние
- \`isDisabled\` - отключить элемент

### ItemRootSelectAll Props

- \`theme\` - объект темы оформления

### Events

- \`@change\` - событие изменения выбранных значений
  - Параметры: (values: CheckboxStateType[], changedValue: ChangeOptions)
  - CheckboxStateType: { name, isChecked, isDisabled }
  - ChangeOptions: { type: 'selectAll' | 'checkbox', name? }
        `
      }
    }
  },
  args: {
    theme: CheckboxGroupTheme,
    orientation: 'horizontal',
    onChange: () => {},
  },
  argTypes: {
    theme: {
      control: 'object',
      description: 'Тема оформления'
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
    onChange: {
      description: 'Функция обработки изменения состояния',
      table: {
        type: {
          summary: '(values: CheckboxStateType[], changedValue: ChangeOptions) => void',
        }
      }
    }
  }
} satisfies Meta<typeof CheckboxGroup>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: {
      CheckboxGroup,
      ItemRoot,
      ItemRootSelectAll,
      Checkbox,
      CheckboxSelectAll,
      CheckboxGroupLabel,
      Text,
    },
    setup() {
      const handleChange: CheckboxGroupChangeEvent = (values, changedValue) => {
        console.log('Изменение:', values, changedValue)
      }

      return {
        args,
        handleChange,
        DefaultCheckboxValues,
        CheckboxGroupItemRootTheme,
        CheckboxLightTheme,
        LabelTheme,
        TextPrimaryTheme,
      }
    },
    template: `
      <CheckboxGroup v-bind="args" :onChange="handleChange">
        <ItemRootSelectAll :theme="CheckboxGroupItemRootTheme">
          <CheckboxGroupLabel
            textPlacement="right"
            :theme="LabelTheme"
            :isCentered="true"
          >
            <template #text>
              <Text size="l" :theme="TextPrimaryTheme">
                Выбрать все
              </Text>
            </template>
            <template #default>
              <CheckboxSelectAll :theme="CheckboxLightTheme" />
            </template>
          </CheckboxGroupLabel>
        </ItemRootSelectAll>

        <ItemRoot
          v-for="item in DefaultCheckboxValues"
          :key="item.name"
          :name="item.value"
          :value="item.value"
          :isDefaultChecked="item.isDefaultChecked"
          :isDisabled="item.isDisabled"
          :theme="CheckboxGroupItemRootTheme"
        >
          <CheckboxGroupLabel
            textPlacement="right"
            :theme="LabelTheme"
            :isCentered="true"
          >
            <template #text>
              <Text size="l" :theme="TextPrimaryTheme">
                {{ item.name }}
              </Text>
            </template>
            <template #default>
              <Checkbox :theme="CheckboxLightTheme" />
            </template>
          </CheckboxGroupLabel>
        </ItemRoot>
      </CheckboxGroup>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример CheckboxGroup с горизонтальной ориентацией и функцией "Выбрать все".'
      }
    }
  }
}

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
  render: (args) => ({
    components: {
      CheckboxGroup,
      ItemRoot,
      ItemRootSelectAll,
      Checkbox,
      CheckboxSelectAll,
      CheckboxGroupLabel,
      Text,
    },
    setup() {
      const handleChange: CheckboxGroupChangeEvent = (values, changedValue) => {
        console.log('Изменение:', values, changedValue)
      }

      return {
        args,
        handleChange,
        DefaultCheckboxValues,
        CheckboxGroupItemRootTheme,
        CheckboxLightTheme,
        LabelTheme,
        TextPrimaryTheme,
      }
    },
    template: `
      <CheckboxGroup v-bind="args" :onChange="handleChange">
        <ItemRootSelectAll :theme="CheckboxGroupItemRootTheme">
          <CheckboxGroupLabel
            textPlacement="right"
            :theme="LabelTheme"
            :isCentered="true"
          >
            <template #text>
              <Text size="l" :theme="TextPrimaryTheme">
                Выбрать все
              </Text>
            </template>
            <template #default>
              <CheckboxSelectAll :theme="CheckboxLightTheme" />
            </template>
          </CheckboxGroupLabel>
        </ItemRootSelectAll>

        <ItemRoot
          v-for="item in DefaultCheckboxValues"
          :key="item.name"
          :name="item.value"
          :value="item.value"
          :isDefaultChecked="item.isDefaultChecked"
          :isDisabled="item.isDisabled"
          :theme="CheckboxGroupItemRootTheme"
        >
          <CheckboxGroupLabel
            textPlacement="right"
            :theme="LabelTheme"
            :isCentered="true"
          >
            <template #text>
              <Text size="l" :theme="TextPrimaryTheme">
                {{ item.name }}
              </Text>
            </template>
            <template #default>
              <Checkbox :theme="CheckboxLightTheme" />
            </template>
          </CheckboxGroupLabel>
        </ItemRoot>
      </CheckboxGroup>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'CheckboxGroup с вертикальной ориентацией.'
      }
    }
  }
}

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
  render: (args) => ({
    components: {
      CheckboxGroup,
      ItemRoot,
      ItemRootSelectAll,
      Checkbox,
      CheckboxSelectAll,
      CheckboxGroupLabel,
      Text,
    },
    setup() {
      const handleChange: CheckboxGroupChangeEvent = (values, changedValue) => {
        console.log('Изменение:', values, changedValue)
      }

      return {
        args,
        handleChange,
        DefaultCheckboxValues,
        CheckboxGroupItemRootTheme,
        CheckboxLightTheme,
        LabelTheme,
        TextPrimaryTheme,
      }
    },
    template: `
      <CheckboxGroup v-bind="args" :onChange="handleChange">
        <ItemRootSelectAll :theme="CheckboxGroupItemRootTheme">
          <CheckboxGroupLabel
            textPlacement="right"
            :theme="LabelTheme"
            :isCentered="true"
          >
            <template #text>
              <Text size="l" :theme="TextPrimaryTheme">
                Выбрать все
              </Text>
            </template>
            <template #default>
              <CheckboxSelectAll :theme="CheckboxLightTheme" />
            </template>
          </CheckboxGroupLabel>
        </ItemRootSelectAll>

        <ItemRoot
          v-for="item in DefaultCheckboxValues"
          :key="item.name"
          :name="item.value"
          :value="item.value"
          :isDefaultChecked="item.isDefaultChecked"
          :isDisabled="item.isDisabled"
          :theme="CheckboxGroupItemRootTheme"
        >
          <CheckboxGroupLabel
            textPlacement="right"
            :theme="LabelTheme"
            :isCentered="true"
          >
            <template #text>
              <Text size="l" :theme="TextPrimaryTheme">
                {{ item.name }}
              </Text>
            </template>
            <template #default>
              <Checkbox :theme="CheckboxLightTheme" />
            </template>
          </CheckboxGroupLabel>
        </ItemRoot>
      </CheckboxGroup>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'CheckboxGroup с отключенным состоянием для всей группы.'
      }
    }
  }
}
