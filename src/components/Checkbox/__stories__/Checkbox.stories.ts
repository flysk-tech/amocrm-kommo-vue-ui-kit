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
  args: {
    theme: CheckboxLightTheme,
  },
  argTypes: {
    theme: {
      control: 'select',
      options: Object.keys(themeMap),
      mapping: themeMap,
    },
    checkedStyle: {
      control: 'select',
      options: ['mark', 'indeterminate'],
    },
    isInvalid: {
      control: 'boolean',
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
      const onChange = (e: Event) => {
        checked.value = (e.target as HTMLInputElement).checked
      }
      return { args, checked, onChange, CheckboxLabelTheme, TextPrimaryTheme }
    },
    template: `
      <Label
        :theme="CheckboxLabelTheme"
        textPlacement="right"
        :isCentered="true"
        text="Нажми на меня"
      >
        <Checkbox v-bind="args" :isChecked="checked" @change="onChange" />
      </Label>
    `
  }),
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
        <Checkbox v-bind="args" :isDefaultChecked="true" />
        text="Нажми на меня"
      </Label>
    `
  }),
}

export const CheckedStyles: Story = {
  render: (args) => ({
    components: { Checkbox, Label, Text },
    setup() {
      const items = [
        { value: 'mark', label: 'Отметка' },
        { value: 'indeterminate', label: 'Индетерминированное' }
      ]
      return { args, items, CheckboxLabelTheme, TextPrimaryTheme }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <Label
          v-for="item in items"
          :key="item.value"
          :theme="CheckboxLabelTheme"
          textPlacement="right"
          :isCentered="true"
          :text="item.label"
        >
          <Checkbox v-bind="args" :checkedStyle="item.value" :isDefaultChecked="true" />
        </Label>
      </div>
    `
  }),
}

export const States: Story = {
  render: (args) => ({
    components: { Checkbox, Label, Text },
    setup() {
      const states = [
        { label: 'Отключен', props: { isDisabled: true } },
        { label: 'Ошибка', props: { isInvalid: true } },
        { label: 'Выбран', props: { isDefaultChecked: true } }
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
          :text="state.label"
        >
          <Checkbox v-bind="{ ...args, ...state.props }" />
        </Label>
      </div>
    `
  }),
}

export const CheckboxLight: Story = {
  tags: ['!autodocs'],
  args: { theme: CheckboxLightTheme },
}

export const CheckboxDark: Story = {
  tags: ['!autodocs'],
  args: { theme: CheckboxDarkTheme },
}

export const CheckboxSmallLight: Story = {
  tags: ['!autodocs'],
  args: { theme: CheckboxSmallLightTheme },
  render: (args) => ({
    components: { Checkbox, Label, Text },
    setup() {
      return { args, CheckboxLabelTheme, TextPrimaryTheme }
    },
    template: `
      <Label :theme="CheckboxLabelTheme" textPlacement="right" :isCentered="true">
        <Checkbox v-bind="args" :isDefaultChecked="true" />
        <template #text>
          <Text size="s" :theme="TextPrimaryTheme">Нажми на меня</Text>
        </template>
      </Label>
    `
  })
}

export const CheckboxSmallDark: Story = {
  tags: ['!autodocs'],
  args: { theme: CheckboxSmallDarkTheme },
  render: (args) => ({
    components: { Checkbox, Label, Text },
    setup() {
      return { args, CheckboxLabelTheme, TextPrimaryTheme }
    },
    template: `
      <Label :theme="CheckboxLabelTheme" textPlacement="right" :isCentered="true">
        <Checkbox v-bind="args" :isDefaultChecked="true" />
        <template #text>
          <Text size="s" :theme="TextPrimaryTheme">Нажми на меня</Text>
        </template>
      </Label>
    `
  })
}
