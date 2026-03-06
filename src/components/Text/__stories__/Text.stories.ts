import type { Meta, StoryObj } from '@storybook/vue3'
import Text from '../Text.vue'
import {
  TextPrimaryTheme,
  TextSecondaryDarkTheme,
  TextSecondaryLightTheme,
  TextErrorTheme,
  type TextTheme
} from '../Text.themes'
import type { TextSizes } from '../Text.types'

const sizes: TextSizes[] = ['s', 'm', 'ms', 'l', 'xl']

const themeMap: Record<string, TextTheme> = {
  TextPrimaryTheme,
  TextSecondaryDarkTheme,
  TextSecondaryLightTheme,
  TextErrorTheme,
}

const USAGE = `import { Text, TextPrimaryTheme } from '@amocrm/vue-ui-kit'

function App() {
  return (
    <Text size="l" :theme="TextPrimaryTheme">
      Обычный текст
    </Text>
  )
}`

const meta: Meta<typeof Text> = {
  title: 'Typography/Text',
  component: Text,
  parameters: {
    docs: {
      source: {
        code: USAGE,
        language: 'vue',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: sizes,
    },
    theme: {
      control: 'select',
      options: Object.keys(themeMap),
      mapping: themeMap,
    },
    isEllipsis: {
      control: 'boolean',
    },
    maxRows: {
      control: { type: 'number', min: 1, max: 10 },
    },
  },
  args: {
    size: 'l',
    theme: TextPrimaryTheme,
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { Text },
    setup() {
      return { args }
    },
    template: '<Text v-bind="args">Обычный текст</Text>',
  }),
}

export const Sizes: Story = {
  render: (args) => ({
    components: { Text },
    setup() {
      return { args, sizes }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <Text
          v-for="size in sizes"
          :key="size"
          v-bind="args"
          :size="size"
        >
          Размер {{ size }}: Обычный текст
        </Text>
      </div>
    `,
  }),
  parameters: {
    controls: {
      exclude: ['size'],
    },
  },
}

export const Ellipsis: Story = {
  args: {
    isEllipsis: true,
    style: {
      width: '150px',
    },
  },
  render: (args) => ({
    components: { Text },
    setup() {
      return { args }
    },
    template: '<Text v-bind="args">Очень длинный текст, который будет обрезан многоточием при переполнении контейнера.</Text>',
  }),
}

export const MultiLine: Story = {
  args: {
    maxRows: 3,
    style: {
      width: '200px',
    },
  },
  render: (args) => ({
    components: { Text },
    setup() {
      return { args }
    },
    template: `
      <Text v-bind="args">
        Длинный текст, который будет отображаться в несколько строк.
        Текст будет обрезан после указанного количества строк с помощью CSS line-clamp.
        Этот текст достаточно длинный, чтобы продемонстрировать работу многострочного обрезания.
      </Text>
    `,
  }),
}

export const TextPrimary: Story = {
  tags: ['!dev'],
  args: {
    theme: TextPrimaryTheme
  },
  render: (args) => ({
    components: { Text },
    setup() {
      return { args }
    },
    template: '<Text v-bind="args">Обычный текст</Text>',
  }),
}

export const TextSecondaryDark: Story = {
  tags: ['!dev'],
  args: {
    theme: TextSecondaryDarkTheme
  },
  render: (args) => ({
    components: { Text },
    setup() {
      return { args }
    },
    template: '<Text v-bind="args">Обычный текст</Text>',
  }),
}

export const TextSecondaryLight: Story = {
  tags: ['!dev'],
  args: {
    theme: TextSecondaryLightTheme
  },
  render: (args) => ({
    components: { Text },
    setup() {
      return { args }
    },
    template: '<Text v-bind="args">Обычный текст</Text>',
  }),
}

export const TextError: Story = {
  tags: ['!dev'],
  args: {
    theme: TextErrorTheme
  },
  render: (args) => ({
    components: { Text },
    setup() {
      return { args }
    },
    template: '<Text v-bind="args">Обычный текст</Text>',
  }),
}