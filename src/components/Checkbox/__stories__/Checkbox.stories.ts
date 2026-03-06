import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'

import Checkbox from '../Checkbox.vue'
import Label from '@/components/Label/Label.vue'
import Text from '@/components/Text/Text.vue'
import { TextPrimaryTheme } from '@/components/Text/Text.themes'
import {
  CheckboxLightTheme,
  CheckboxSmallLightTheme,
  CheckboxDarkTheme,
  CheckboxSmallDarkTheme,
  CheckboxLabelTheme,
} from '../Checkbox.themes'

const themeMap = {
  CheckboxLightTheme,
  CheckboxSmallLightTheme,
  CheckboxDarkTheme,
  CheckboxSmallDarkTheme,
}

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    docs: {
      description: {
        component: `
Компонент Checkbox для создания чекбоксов с различными темами и состояниями.

## Возможности

- **Четыре темы**: Light, SmallLight, Dark, SmallDark
- **Два стиля отметки**: галочка (mark) и индетерминированное состояние (indeterminate)
- **Состояния**: обычное, отключено, ошибка
- **Touch поддержка**: автоматическое определение сенсорных устройств
- **Label интеграция**: специальная тема для Label

## Применение

- Формы с множественным выбором
- Списки с выбором элементов
- Настройки с переключателями

## Импорт

\`\`\`typescript
import { Checkbox, CheckboxLightTheme, CheckboxLabelTheme } from '@amocrm/vue-ui-kit'
import { Label } from '@amocrm/vue-ui-kit'
\`\`\`

## API

### Props

- \`theme\` - объект темы оформления (обязательный)
- \`checkedStyle\` - стиль отметки ('mark' | 'indeterminate')
- \`isInvalid\` - отображать ошибку
- \`className\` - дополнительные CSS классы
- \`v-model\` - двустороннее связывание для checked состояния (через v-bind="$attrs")

### Events

- \`@change\` - событие изменения состояния (через v-bind="$attrs")
        `
      }
    }
  },
  args: {
    theme: CheckboxLightTheme,
  },
  argTypes: {
    theme: {
      control: 'select',
      options: Object.keys(themeMap),
      mapping: themeMap,
      description: 'Тема оформления'
    },
    checkedStyle: {
      control: 'select',
      options: ['mark', 'indeterminate'],
      description: 'Стиль отметки'
    },
    isInvalid: {
      control: 'boolean',
      description: 'Отображать ошибку'
    },
  }
} satisfies Meta<typeof Checkbox>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { Checkbox, Label, Text },
    setup() {
      const checked = ref(true)
      return { args, checked, CheckboxLabelTheme, TextPrimaryTheme }
    },
    template: `
      <Label
        :theme="CheckboxLabelTheme"
        textPlacement="right"
        :isCentered="true"
      >
        <template #default>
          <Text size="l" :theme="TextPrimaryTheme">
            Нажми на меня
          </Text>
          <Checkbox v-bind="args" v-model="checked" />
        </template>
      </Label>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример Checkbox с Label.'
      }
    }
  }
}

export const Uncontrolled: Story = {
  render: (args) => ({
    components: { Checkbox, Label, Text },
    setup() {
      return { args, CheckboxLabelTheme, TextPrimaryTheme }
    },
    template: `
      <Label
        :theme="CheckboxLabelTheme"
        textPlacement="right"
        :isCentered="true"
      >
        <template #default>
          <Text size="l" :theme="TextPrimaryTheme">
            Нажми на меня
          </Text>
          <Checkbox v-bind="args" :checked="true" />
        </template>
      </Label>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Неконтролируемый Checkbox с начальным значением.'
      }
    }
  }
}

export const CheckedStyles: Story = {
  render: (args) => ({
    components: { Checkbox, Label, Text },
    setup() {
      const styles = [
        { value: 'mark', label: 'Отметка' },
        { value: 'indeterminate', label: 'Индетерминированное' }
      ]
      return { args, styles, CheckboxLabelTheme, TextPrimaryTheme }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <Label
          v-for="style in styles"
          :key="style.value"
          :theme="CheckboxLabelTheme"
          textPlacement="right"
          :isCentered="true"
        >
          <template #default>
            <Text size="l" :theme="TextPrimaryTheme">
              {{ style.label }}
            </Text>
            <Checkbox
              v-bind="args"
              :checkedStyle="style.value"
              :checked="true"
            />
          </template>
        </Label>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Различные стили отметки: галочка и индетерминированное состояние.'
      }
    }
  }
}

export const States: Story = {
  render: (args) => ({
    components: { Checkbox, Label, Text },
    setup() {
      const states = [
        { label: 'Отключен', props: { disabled: true, checked: false } },
        { label: 'Ошибка', props: { isInvalid: true, checked: false } },
        { label: 'Выбран', props: { checked: true } }
      ]
      return { args, states, CheckboxLabelTheme, TextPrimaryTheme }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <Label
          v-for="(state, index) in states"
          :key="index"
          :theme="CheckboxLabelTheme"
          textPlacement="right"
          :isCentered="true"
        >
          <template #default>
            <Text size="l" :theme="TextPrimaryTheme">
              {{ state.label }}
            </Text>
            <Checkbox
              v-bind="{ ...args, ...state.props }"
            />
          </template>
        </Label>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Различные состояния Checkbox: отключен, ошибка, выбран.'
      }
    }
  }
}

export const CheckboxLight: Story = {
  tags: ['!autodocs'],
  args: {
    theme: CheckboxLightTheme,
  }
}

export const CheckboxDark: Story = {
  tags: ['!autodocs'],
  args: {
    theme: CheckboxDarkTheme,
  }
}

export const CheckboxSmallLight: Story = {
  tags: ['!autodocs'],
  args: {
    theme: CheckboxSmallLightTheme,
  },
  render: (args) => ({
    components: { Checkbox, Label, Text },
    setup() {
      return { args, CheckboxLabelTheme, TextPrimaryTheme }
    },
    template: `
      <Label
        :theme="CheckboxLabelTheme"
        textPlacement="right"
        :isCentered="true"
      >
        <template #default>
          <Text size="s" :theme="TextPrimaryTheme">
            Нажми на меня
          </Text>
          <Checkbox v-bind="args" :checked="true" />
        </template>
      </Label>
    `
  })
}

export const CheckboxSmallDark: Story = {
  tags: ['!autodocs'],
  args: {
    theme: CheckboxSmallDarkTheme,
  },
  render: (args) => ({
    components: { Checkbox, Label, Text },
    setup() {
      return { args, CheckboxLabelTheme, TextPrimaryTheme }
    },
    template: `
      <Label
        :theme="CheckboxLabelTheme"
        textPlacement="right"
        :isCentered="true"
      >
        <template #default>
          <Text size="s" :theme="TextPrimaryTheme">
            Нажми на меня
          </Text>
          <Checkbox v-bind="args" :checked="true" />
        </template>
      </Label>
    `
  })
}
