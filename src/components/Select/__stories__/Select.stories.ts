import type { Meta, StoryObj } from '@storybook/vue3'
import { ref, computed, h } from 'vue'

import Select from '../Select.vue'
import SelectButtonComp from '../components/Button/Button.vue'
import SelectListComp from '../components/List/SelectList.vue'
import SelectItemComp from '../components/Item/Item.vue'
import SelectValueComp from '../components/Value/Value.vue'
import SelectArrowComp from '../components/Arrow/Arrow.vue'
import SelectIconComp from '../components/Icon/Icon.vue'
import SelectOptionComp from '../components/Option/Option.vue'
import Text from '@/components/Text/Text.vue'

import { SelectRootTheme } from '../Select.themes'
import { SelectArrowTheme } from '../components/Arrow'
import { SelectItemTheme } from '../components/Item'
import { SelectIconTheme } from '../components/Icon'
import { SelectButtonLightTheme, SelectButtonDarkTheme } from '@/components/SelectButton'
import { ListTheme as SelectListTheme } from '@/components/List'
import { TextPrimaryTheme } from '@/components/Text'

import type { SelectItem } from '../Select.types'

const DefaultSelectItems: SelectItem[] = [
  { value: 'Option 1', option: 'Опция 1' },
  { value: 'Option 2', option: 'Опция 2' },
  { value: 'Option 3', option: 'Опция 3' },
  { value: 'Option 4', option: 'Опция 4' },
  { value: 'Option 5', option: 'Опция 5' },
  { value: 'Option 6', option: 'Опция 6' },
  { value: 'Option 7', option: 'Очень длинное название опции' },
  { value: 'Option 8', option: 'Опция 8' },
  { value: 'Option 9', option: 'Опция 9' },
]

const USAGE = `
import { ref } from "vue";
import {
  Select,
  SelectButton,
  SelectList,
  SelectItem,
  SelectValue,
  SelectArrow,
  SelectRootTheme,
  SelectArrowTheme,
  SelectItemTheme,
  SelectListTheme,
  SelectButtonLightTheme,
} from "@flysk-tech/amocrm-kommo-vue-ui-kit/Select";

const DefaultSelectItems = [
  { value: "Option 1", option: "Опция 1" },
  { value: "Option 2", option: "Опция 2" },
  { value: "Option 3", option: "Опция 3" },
];

const value = ref(DefaultSelectItems[0]);

const handleChange = (item) => {
  value.value = item;
};

<Select :theme="SelectRootTheme" :value="value" @change="handleChange">
  <SelectButton :theme="SelectButtonLightTheme">
    <SelectValue placeholder="Placeholder" />
    <SelectArrow :theme="SelectArrowTheme" />
  </SelectButton>

  <SelectList :theme="SelectListTheme">
    <SelectItem
      v-for="(item, index) in DefaultSelectItems"
      :key="item.value"
      :theme="SelectItemTheme"
      :item="item"
      :index="index"
    />
  </SelectList>
</Select>
`

const meta = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        code: USAGE,
        language: 'html',
      },
      description: {
        component: `
Компонент Select — составной компонент для выбора значения из списка.

## Структура

- \`Select\` — корневой компонент (контекст)
- \`SelectButton\` — кнопка-триггер
- \`SelectValue\` — отображение текущего значения
- \`SelectArrow\` — стрелка раскрытия
- \`SelectList\` — список опций
- \`SelectItem\` — элемент списка
- \`SelectIcon\` — иконка элемента
- \`SelectOption\` — текст опции

## События

- \`@change\` — изменение выбранного значения (item: SelectItem)
- \`@openChange\` — открытие/закрытие списка (open: boolean)
        `
      }
    }
  },
  decorators: [
    () => ({
      template: '<div style="width: 300px; margin-bottom: 200px;"><story /></div>',
    }),
  ],
  args: {
    isDisabled: false,
    isInvalid: false,
    theme: SelectRootTheme,
  },
  argTypes: {
    theme: {
      control: 'object',
      description: 'Тема оформления',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Отключить селект',
    },
    isInvalid: {
      control: 'boolean',
      description: 'Невалидное состояние',
    },
  },
} satisfies Meta<typeof Select>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: {
      Select,
      SelectButtonComp,
      SelectListComp,
      SelectItemComp,
      SelectValueComp,
      SelectArrowComp,
    },
    setup() {
      const value = ref<SelectItem>(DefaultSelectItems[0])

      const handleChange = (item: SelectItem) => {
        value.value = item
      }

      return {
        args,
        value,
        handleChange,
        DefaultSelectItems,
        SelectArrowTheme,
        SelectItemTheme,
        SelectListTheme,
        SelectButtonLightTheme,
      }
    },
    template: `
      <Select v-bind="args" :value="value" @change="handleChange">
        <SelectButtonComp :theme="SelectButtonLightTheme">
          <SelectValueComp placeholder="Выберите значение" />
          <SelectArrowComp :theme="SelectArrowTheme" />
        </SelectButtonComp>

        <SelectListComp :theme="SelectListTheme">
          <SelectItemComp
            v-for="(item, index) in DefaultSelectItems"
            :key="item.value"
            :theme="SelectItemTheme"
            :item="item"
            :index="index"
          />
        </SelectListComp>
      </Select>
    `,
  }),
}

export const Uncontrolled: Story = {
  render: (args) => ({
    components: {
      Select,
      SelectButtonComp,
      SelectListComp,
      SelectItemComp,
      SelectValueComp,
      SelectArrowComp,
    },
    setup() {
      return {
        args,
        DefaultSelectItems,
        SelectArrowTheme,
        SelectItemTheme,
        SelectListTheme,
        SelectButtonLightTheme,
        defaultValue: DefaultSelectItems[0],
      }
    },
    template: `
      <Select v-bind="args" :defaultValue="defaultValue">
        <SelectButtonComp :theme="SelectButtonLightTheme">
          <SelectValueComp placeholder="Выберите значение" />
          <SelectArrowComp :theme="SelectArrowTheme" />
        </SelectButtonComp>

        <SelectListComp :theme="SelectListTheme">
          <SelectItemComp
            v-for="(item, index) in DefaultSelectItems"
            :key="item.value"
            :theme="SelectItemTheme"
            :item="item"
            :index="index"
          />
        </SelectListComp>
      </Select>
    `,
  }),
}

export const States: Story = {
  render: (args) => ({
    components: {
      Select,
      SelectButtonComp,
      SelectListComp,
      SelectItemComp,
      SelectValueComp,
      SelectArrowComp,
      Text,
    },
    setup() {
      const value = ref<SelectItem>(DefaultSelectItems[0])
      const value2 = ref<SelectItem>(DefaultSelectItems[2])
      const value3 = ref<SelectItem | undefined>(undefined)
      const value4 = ref<SelectItem>(DefaultSelectItems[0])

      const handleChange1 = (item: SelectItem) => { value.value = item }
      const handleChange2 = (item: SelectItem) => { value2.value = item }
      const handleChange3 = (item: SelectItem) => { value3.value = item }
      const handleChange4 = (item: SelectItem) => { value4.value = item }

      return {
        args,
        value, value2, value3, value4,
        handleChange1, handleChange2, handleChange3, handleChange4,
        DefaultSelectItems,
        SelectArrowTheme,
        SelectItemTheme,
        SelectListTheme,
        SelectButtonLightTheme,
        SelectRootTheme,
        TextPrimaryTheme,
      }
    },
    template: `
      <div>
        <div style="margin-bottom: 20px;">
          <Text size="l" :theme="TextPrimaryTheme">Disabled</Text>
          <Select :theme="SelectRootTheme" :value="value" :isDisabled="true" @change="handleChange1">
            <SelectButtonComp :theme="SelectButtonLightTheme">
              <SelectValueComp placeholder="Выберите" />
              <SelectArrowComp :theme="SelectArrowTheme" />
            </SelectButtonComp>
            <SelectListComp :theme="SelectListTheme">
              <SelectItemComp v-for="(item, index) in DefaultSelectItems" :key="item.value" :theme="SelectItemTheme" :item="item" :index="index" />
            </SelectListComp>
          </Select>
        </div>

        <div style="margin-bottom: 20px;">
          <Text size="l" :theme="TextPrimaryTheme">With preselected item</Text>
          <Select :theme="SelectRootTheme" :value="value2" @change="handleChange2">
            <SelectButtonComp :theme="SelectButtonLightTheme">
              <SelectValueComp placeholder="Выберите" />
              <SelectArrowComp :theme="SelectArrowTheme" />
            </SelectButtonComp>
            <SelectListComp :theme="SelectListTheme">
              <SelectItemComp v-for="(item, index) in DefaultSelectItems" :key="item.value" :theme="SelectItemTheme" :item="item" :index="index" />
            </SelectListComp>
          </Select>
        </div>

        <div style="margin-bottom: 20px;">
          <Text size="l" :theme="TextPrimaryTheme">With Placeholder</Text>
          <Select :theme="SelectRootTheme" :value="value3" @change="handleChange3">
            <SelectButtonComp :theme="SelectButtonLightTheme">
              <SelectValueComp placeholder="Placeholder" />
              <SelectArrowComp :theme="SelectArrowTheme" />
            </SelectButtonComp>
            <SelectListComp :theme="SelectListTheme">
              <SelectItemComp v-for="(item, index) in DefaultSelectItems" :key="item.value" :theme="SelectItemTheme" :item="item" :index="index" />
            </SelectListComp>
          </Select>
        </div>

        <div style="margin-bottom: 20px;">
          <Text size="l" :theme="TextPrimaryTheme">Invalid</Text>
          <Select :theme="SelectRootTheme" :value="value4" :isInvalid="true" @change="handleChange4">
            <SelectButtonComp :theme="SelectButtonLightTheme">
              <SelectValueComp placeholder="Выберите" />
              <SelectArrowComp :theme="SelectArrowTheme" />
            </SelectButtonComp>
            <SelectListComp :theme="SelectListTheme">
              <SelectItemComp v-for="(item, index) in DefaultSelectItems" :key="item.value" :theme="SelectItemTheme" :item="item" :index="index" />
            </SelectListComp>
          </Select>
        </div>
      </div>
    `,
  }),
}

export const DarkButton: Story = {
  render: (args) => ({
    components: {
      Select,
      SelectButtonComp,
      SelectListComp,
      SelectItemComp,
      SelectValueComp,
      SelectArrowComp,
    },
    setup() {
      const value = ref<SelectItem>(DefaultSelectItems[0])

      const handleChange = (item: SelectItem) => {
        value.value = item
      }

      return {
        args,
        value,
        handleChange,
        DefaultSelectItems,
        SelectArrowTheme,
        SelectItemTheme,
        SelectListTheme,
        SelectButtonDarkTheme,
      }
    },
    template: `
      <Select v-bind="args" :value="value" @change="handleChange">
        <SelectButtonComp :theme="SelectButtonDarkTheme">
          <SelectValueComp placeholder="Выберите значение" />
          <SelectArrowComp :theme="SelectArrowTheme" />
        </SelectButtonComp>

        <SelectListComp :theme="SelectListTheme">
          <SelectItemComp
            v-for="(item, index) in DefaultSelectItems"
            :key="item.value"
            :theme="SelectItemTheme"
            :item="item"
            :index="index"
          />
        </SelectListComp>
      </Select>
    `,
  }),
}
