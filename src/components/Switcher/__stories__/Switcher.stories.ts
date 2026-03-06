import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'

import Switcher from '../Switcher.vue'
import Label from '@/components/Label/Label.vue'
import Text from '@/components/Text/Text.vue'
import { TextPrimaryTheme } from '@/components/Text/Text.themes'
import { LabelTheme } from '@/components/Label/Label.themes'
import { SwitcherPrimaryTheme, type SwitcherTheme } from '../Switcher.themes'

const meta = {
  title: 'Components/Switcher',
  component: Switcher,
  parameters: {
    docs: {
      description: {
        component: `
Компонент Switcher для создания переключателей (toggle switch).

## Возможности

- **Primary тема**: стандартная тема оформления
- **Состояния**: обычное, отключено, выбрано
- **Touch поддержка**: автоматическое определение сенсорных устройств
- **Label интеграция**: работает с компонентом Label
- **Кастомизация**: полная настройка через CSS переменные

## Применение

- Переключатели в настройках
- Включение/выключение функций
- Бинарные опции

## Импорт

\`\`\`typescript
import { Switcher, SwitcherPrimaryTheme } from '@amocrm/vue-ui-kit'
import { Label, LabelTheme } from '@amocrm/vue-ui-kit'
\`\`\`

## API

### Props

- \`theme\` - объект темы оформления (обязательный)
- \`className\` - дополнительные CSS классы
- \`v-model\` - двустороннее связывание для checked состояния (через v-bind="$attrs")

### Events

- \`@change\` - событие изменения состояния (через v-bind="$attrs")
        `
      }
    }
  },
  args: {
    theme: SwitcherPrimaryTheme,
  },
  argTypes: {
    theme: {
      control: 'object',
      description: 'Тема оформления'
    },
  }
} satisfies Meta<typeof Switcher>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { Switcher, Label, Text },
    setup() {
      const checked = ref(false)
      return { args, checked, LabelTheme, TextPrimaryTheme }
    },
    template: `
      <Label
        :theme="LabelTheme"
        textPlacement="right"
        :isCentered="true"
      >
        <template #default>
          <Text size="l" :theme="TextPrimaryTheme">
            Нажми на меня
          </Text>
          <Switcher v-bind="args" v-model="checked" />
        </template>
      </Label>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример Switcher с Label.'
      }
    }
  }
}

export const Uncontrolled: Story = {
  render: (args) => ({
    components: { Switcher, Label, Text },
    setup() {
      return { args, LabelTheme, TextPrimaryTheme }
    },
    template: `
      <Label
        :theme="LabelTheme"
        textPlacement="right"
        :isCentered="true"
      >
        <template #default>
          <Text size="l" :theme="TextPrimaryTheme">
            Нажми на меня
          </Text>
          <Switcher v-bind="args" :checked="true" />
        </template>
      </Label>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Неконтролируемый Switcher с начальным значением.'
      }
    }
  }
}

export const States: Story = {
  render: (args) => ({
    components: { Switcher, Label, Text },
    setup() {
      const states = [
        { label: 'Отключен', props: { disabled: true, checked: false } },
        { label: 'Выбран', props: { checked: true } }
      ]
      return { args, states, LabelTheme, TextPrimaryTheme }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <Label
          v-for="(state, index) in states"
          :key="index"
          :theme="LabelTheme"
          textPlacement="right"
          :isCentered="true"
        >
          <template #default>
            <Text size="l" :theme="TextPrimaryTheme">
              {{ state.label }}
            </Text>
            <Switcher
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
        story: 'Различные состояния Switcher: отключен и выбран.'
      }
    }
  }
}

export const CustomTheme: Story = {
  render: (args) => ({
    components: { Switcher, Label, Text },
    setup() {
      const checked1 = ref(false)
      const checked2 = ref(false)
      const checked3 = ref(false)

      const themeS: SwitcherTheme = {
        '--crm-ui-kit-switcher-active-element-color': '#FFCC99',
        '--crm-ui-kit-switcher-border-color': '#4169E1',
        '--crm-ui-kit-switcher-disabled-opacity': '0.6',
        '--crm-ui-kit-switcher-circle-size': '14px',
        '--crm-ui-kit-switcher-line-width': '9px',
        '--crm-ui-kit-switcher-border-width': '1px',
        '--crm-ui-kit-switcher-line-border-radius': '26px',
        '--crm-ui-kit-switcher-focus-visible-outline-color': '#0057a9',
        '--crm-ui-kit-switcher-focus-visible-outline-width': '2px',
        '--crm-ui-kit-switcher-focus-visible-border-radius': '2px',
        '--crm-ui-kit-switcher-focus-visible-outline-offset': '1px',
        '--crm-ui-kit-switcher-focus-visible-outline-style': 'solid',
      }

      const themeM: SwitcherTheme = {
        ...themeS,
        '--crm-ui-kit-switcher-circle-size': '30px',
        '--crm-ui-kit-switcher-line-width': '17px',
        '--crm-ui-kit-switcher-border-width': '2px',
      }

      const themeL: SwitcherTheme = {
        ...themeS,
        '--crm-ui-kit-switcher-circle-size': '60px',
        '--crm-ui-kit-switcher-line-width': '45px',
        '--crm-ui-kit-switcher-border-width': '3px',
      }

      return {
        args,
        checked1,
        checked2,
        checked3,
        themeS,
        themeM,
        themeL,
        LabelTheme,
        TextPrimaryTheme
      }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <Label
          :theme="LabelTheme"
          textPlacement="right"
          :isCentered="true"
        >
          <template #default>
            <Text size="s" :theme="TextPrimaryTheme">Маленький</Text>
            <Switcher :theme="themeS" v-model="checked1" />
          </template>
        </Label>

        <Label
          :theme="LabelTheme"
          textPlacement="right"
          :isCentered="true"
        >
          <template #default>
            <Text size="l" :theme="TextPrimaryTheme">Средний</Text>
            <Switcher :theme="themeM" v-model="checked2" />
          </template>
        </Label>

        <Label
          :theme="LabelTheme"
          textPlacement="right"
          :isCentered="true"
        >
          <template #default>
            <Text size="xl" :theme="TextPrimaryTheme">Большой</Text>
            <Switcher :theme="themeL" v-model="checked3" />
          </template>
        </Label>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Кастомные темы с разными размерами переключателя.'
      }
    }
  }
}
