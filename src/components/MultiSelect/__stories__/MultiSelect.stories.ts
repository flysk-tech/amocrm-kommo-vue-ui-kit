import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'

import MultiSelect from '../MultiSelect.vue'
import MultiSelectComboboxComp from '../components/Combobox/Combobox.vue'
import MultiSelectListComp from '../components/List/MultiSelectList.vue'
import MultiSelectItemComp from '../components/Item/Item.vue'
import MultiSelectGroupComp from '../components/Group/Group.vue'
import MultiSelectAllComp from '../components/All/All.vue'
import Text from '@/components/Text/Text.vue'

import { MultiSelectRootTheme } from '../MultiSelect.themes'
import { MultiSelectItemTheme } from '../components/Item'
import { MultiSelectGroupTheme } from '../components/Group'
import { MultiSelectComboboxTheme, MultiSelectComboboxInlineTheme } from '../components/Combobox'
import { ListTheme as SelectListTheme } from '@/components/List'
import { TextPrimaryTheme } from '@/components/Text'

import type { MultiSelectItem, MultiSelectGroup } from '../MultiSelect.types'

const flatItems: MultiSelectItem[] = [
  { value: 1, option: 'Новая сделка' },
  { value: 2, option: 'Встреча назначена' },
  { value: 3, option: 'Переговоры' },
  { value: 4, option: 'Решение принято' },
  { value: 5, option: 'Успешно завершено' },
]

const groupedItems: MultiSelectItem[] = [
  { value: 1, option: 'Иванов Иван', group: 'sales', isOnline: true },
  { value: 2, option: 'Петрова Мария', group: 'sales' },
  { value: 3, option: 'Сидоров Пётр', group: 'sales', isOnline: true },
  { value: 4, option: 'Козлова Анна', group: 'support', isOnline: true },
  { value: 5, option: 'Волкова Елена', group: 'support' },
  { value: 6, option: 'Морозов Дмитрий', group: 'dev' },
  { value: 7, option: 'Новикова Ольга', group: 'dev', isOnline: true },
  { value: 8, option: 'Фёдоров Алексей', group: 'dev' },
]

const groups: MultiSelectGroup[] = [
  { id: 'sales', label: 'Отдел продаж', color: '#bad5f7' },
  { id: 'support', label: 'Отдел делопроизводства', color: '#f5c542' },
  { id: 'dev', label: 'ГПТ', color: '#f7bfc4' },
]

const USAGE = `
import { ref } from "vue";
import {
  MultiSelect,
  MultiSelectCombobox,
  MultiSelectList,
  MultiSelectItem,
  MultiSelectGroup,
  MultiSelectAll,
  MultiSelectRootTheme,
  MultiSelectItemTheme,
  MultiSelectGroupTheme,
  MultiSelectComboboxTheme,
  SelectListTheme,
} from "@flysk-tech/amocrm-kommo-vue-ui-kit";

const items = [
  { value: 1, option: "User 1", group: "sales", isOnline: true },
  { value: 2, option: "User 2", group: "sales" },
  { value: 3, option: "User 3", group: "support" },
];

const groups = [
  { id: "sales", label: "Sales", color: "#bad5f7" },
  { id: "support", label: "Support", color: "#f5c542" },
];

const selected = ref([]);

<MultiSelect :theme="MultiSelectRootTheme" :items="items" :value="selected" @change="v => selected = v" :group-selectable="true">
  <MultiSelectCombobox :theme="MultiSelectComboboxTheme" :groups="groups" placeholder="Поиск сотрудника..." />

  <MultiSelectList :theme="SelectListTheme">
    <MultiSelectAll :theme="MultiSelectItemTheme" />
    <template v-for="group in groups" :key="group.id">
      <MultiSelectGroup :group="group" :theme="MultiSelectGroupTheme">
        <MultiSelectItem
          v-for="item in items.filter(i => i.group === group.id)"
          :key="item.value"
          :theme="MultiSelectItemTheme"
          :item="item"
        />
      </MultiSelectGroup>
    </template>
  </MultiSelectList>
</MultiSelect>
`

const meta = {
  title: 'Components/MultiSelect',
  component: MultiSelect,
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        code: USAGE,
        language: 'html',
      },
      description: {
        component: `
Компонент MultiSelect — составной компонент для выбора одного или нескольких значений из списка с поддержкой группировки и автокомплита.

## Режимы

- **single** — выбор одного значения
- **multi** (default) — множественный выбор с чекбоксами
- **multi + groupSelectable** — множественный выбор с возможностью выбрать всю группу

## Структура

- \`MultiSelect\` — корневой компонент (контекст, управление состоянием)
- \`MultiSelectCombobox\` — input-триггер с автокомплитом и стрелкой
- \`MultiSelectList\` — dropdown со списком опций
- \`MultiSelectItem\` — элемент списка (с чекбоксом в multi mode)
- \`MultiSelectGroup\` — заголовок группы (sticky, с опциональным чекбоксом)
- \`MultiSelectAll\` — "Выбрать всё" toggle

## Props (MultiSelect)

| Prop | Тип | Default | Описание |
|------|-----|---------|----------|
| theme | MultiSelectRootThemeType | — | CSS переменные темы |
| mode | 'single' \\| 'multi' | 'multi' | Режим выбора |
| groupSelectable | boolean | false | Чекбоксы на группах |
| items | MultiSelectItem[] | — | Все доступные элементы |
| value | MultiSelectItem[] | — | Контролируемое значение |
| defaultValue | MultiSelectItem[] | — | Неконтролируемое начальное значение |
| isDisabled | boolean | false | Отключить компонент |
| isInvalid | boolean | false | Состояние ошибки |

## Props (MultiSelectCombobox)

| Prop | Тип | Default | Описание |
|------|-----|---------|----------|
| theme | MultiSelectComboboxThemeType | — | CSS переменные темы |
| placeholder | string | 'Поиск...' | Текст-заглушка |

## События

- \`@change\` — изменение выбора (items: MultiSelectItem[])
- \`@openChange\` — открытие/закрытие (open: boolean)
        `
      }
    }
  },
  decorators: [
    () => ({
      template: '<div style="width: 300px; margin-bottom: 300px;"><story /></div>',
    }),
  ],
  args: {
    theme: MultiSelectRootTheme,
    isDisabled: false,
    isInvalid: false,
  },
  argTypes: {
    theme: {
      control: 'object',
      description: 'Тема оформления (CSS переменные)',
    },
    mode: {
      control: 'select',
      options: ['single', 'multi'],
      description: 'Режим выбора',
    },
    groupSelectable: {
      control: 'boolean',
      description: 'Чекбоксы на заголовках групп',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Отключить компонент',
    },
    isInvalid: {
      control: 'boolean',
      description: 'Состояние ошибки (красная рамка)',
    },
  },
} satisfies Meta<typeof MultiSelect>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: 'Multi Select (flat)',
  render: (args) => ({
    components: {
      MultiSelect,
      MultiSelectComboboxComp,
      MultiSelectListComp,
      MultiSelectItemComp,
      MultiSelectAllComp,
    },
    setup() {
      const selected = ref<MultiSelectItem[]>([])
      const handleChange = (items: MultiSelectItem[]) => { selected.value = items }

      return {
        args, selected, handleChange, flatItems,
        MultiSelectItemTheme, MultiSelectComboboxTheme, SelectListTheme,
      }
    },
    template: `
      <MultiSelect v-bind="args" :items="flatItems" :value="selected" @change="handleChange">
        <MultiSelectComboboxComp :theme="MultiSelectComboboxTheme" placeholder="Выберите этапы..." />

        <MultiSelectListComp :theme="SelectListTheme">
          <MultiSelectAllComp :theme="MultiSelectItemTheme" />
          <MultiSelectItemComp
            v-for="item in flatItems"
            :key="item.value"
            :theme="MultiSelectItemTheme"
            :item="item"
          />
        </MultiSelectListComp>
      </MultiSelect>
    `,
  }),
}

export const Grouped: Story = {
  name: 'Multi Select (grouped)',
  render: (args) => ({
    components: {
      MultiSelect,
      MultiSelectComboboxComp,
      MultiSelectListComp,
      MultiSelectItemComp,
      MultiSelectGroupComp,
      MultiSelectAllComp,
    },
    setup() {
      const selected = ref<MultiSelectItem[]>([])
      const handleChange = (items: MultiSelectItem[]) => { selected.value = items }

      return {
        args, selected, handleChange, groupedItems, groups,
        MultiSelectItemTheme, MultiSelectGroupTheme, MultiSelectComboboxTheme, SelectListTheme,
      }
    },
    template: `
      <MultiSelect v-bind="args" :group-selectable="true" :items="groupedItems" :value="selected" @change="handleChange">
        <MultiSelectComboboxComp :theme="MultiSelectComboboxTheme" :groups="groups" placeholder="Поиск сотрудника..." />

        <MultiSelectListComp :theme="SelectListTheme">
          <MultiSelectAllComp :theme="MultiSelectItemTheme" />
          <template v-for="group in groups" :key="group.id">
            <MultiSelectGroupComp :group="group" :theme="MultiSelectGroupTheme">
              <MultiSelectItemComp
                v-for="item in groupedItems.filter(i => i.group === group.id)"
                :key="item.value"
                :theme="MultiSelectItemTheme"
                :item="item"
              >
                {{ item.option }}
                <span v-if="item.isOnline" style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: #4caf50; margin-left: 2px; vertical-align: middle;" />
              </MultiSelectItemComp>
            </MultiSelectGroupComp>
          </template>
        </MultiSelectListComp>
      </MultiSelect>
    `,
  }),
}

export const SingleSelect: Story = {
  name: 'Single Select',
  render: (args) => ({
    components: {
      MultiSelect,
      MultiSelectComboboxComp,
      MultiSelectListComp,
      MultiSelectItemComp,
      MultiSelectGroupComp,
    },
    setup() {
      const selected = ref<MultiSelectItem[]>([])
      const handleChange = (items: MultiSelectItem[]) => { selected.value = items }

      return {
        args, selected, handleChange, groupedItems, groups,
        MultiSelectItemTheme, MultiSelectGroupTheme, MultiSelectComboboxTheme, SelectListTheme,
      }
    },
    template: `
      <MultiSelect v-bind="args" mode="single" :items="groupedItems" :value="selected" @change="handleChange">
        <MultiSelectComboboxComp :theme="MultiSelectComboboxTheme" :groups="groups" placeholder="Выберите сотрудника..." />

        <MultiSelectListComp :theme="SelectListTheme">
          <template v-for="group in groups" :key="group.id">
            <MultiSelectGroupComp :group="group" :theme="MultiSelectGroupTheme">
              <MultiSelectItemComp
                v-for="item in groupedItems.filter(i => i.group === group.id)"
                :key="item.value"
                :theme="MultiSelectItemTheme"
                :item="item"
              />
            </MultiSelectGroupComp>
          </template>
        </MultiSelectListComp>
      </MultiSelect>
    `,
  }),
}

export const States: Story = {
  render: (args) => ({
    components: {
      MultiSelect,
      MultiSelectComboboxComp,
      MultiSelectListComp,
      MultiSelectItemComp,
      Text,
    },
    setup() {
      const disabledValue = ref<MultiSelectItem[]>([flatItems[0], flatItems[1]])
      const invalidValue = ref<MultiSelectItem[]>([])

      return {
        args, disabledValue, invalidValue, flatItems,
        MultiSelectItemTheme, MultiSelectComboboxTheme, SelectListTheme,
        TextPrimaryTheme, MultiSelectRootTheme,
      }
    },
    template: `
      <div>
        <div style="margin-bottom: 20px;">
          <Text size="l" :theme="TextPrimaryTheme">Disabled</Text>
          <MultiSelect :theme="MultiSelectRootTheme" :items="flatItems" :value="disabledValue" :is-disabled="true">
            <MultiSelectComboboxComp :theme="MultiSelectComboboxTheme" placeholder="Выберите" />
            <MultiSelectListComp :theme="SelectListTheme">
              <MultiSelectItemComp v-for="item in flatItems" :key="item.value" :theme="MultiSelectItemTheme" :item="item" />
            </MultiSelectListComp>
          </MultiSelect>
        </div>

        <div style="margin-bottom: 20px;">
          <Text size="l" :theme="TextPrimaryTheme">Invalid</Text>
          <MultiSelect :theme="MultiSelectRootTheme" :items="flatItems" :value="invalidValue" :is-invalid="true">
            <MultiSelectComboboxComp :theme="MultiSelectComboboxTheme" placeholder="Выберите" />
            <MultiSelectListComp :theme="SelectListTheme">
              <MultiSelectItemComp v-for="item in flatItems" :key="item.value" :theme="MultiSelectItemTheme" :item="item" />
            </MultiSelectListComp>
          </MultiSelect>
        </div>
      </div>
    `,
  }),
}

export const Inline: Story = {
  name: 'Inline (borderless)',
  render: (args) => ({
    components: {
      MultiSelect,
      MultiSelectComboboxComp,
      MultiSelectListComp,
      MultiSelectItemComp,
      MultiSelectGroupComp,
      MultiSelectAllComp,
    },
    setup() {
      const selected = ref<MultiSelectItem[]>([])
      const handleChange = (items: MultiSelectItem[]) => { selected.value = items }

      return {
        args, selected, handleChange, groupedItems, groups,
        MultiSelectItemTheme, MultiSelectGroupTheme, MultiSelectComboboxInlineTheme, SelectListTheme,
      }
    },
    template: `
      <MultiSelect v-bind="args" :group-selectable="true" :items="groupedItems" :value="selected" @change="handleChange">
        <MultiSelectComboboxComp :theme="MultiSelectComboboxInlineTheme" :groups="groups" placeholder="Выберите сотрудников..." />

        <MultiSelectListComp :theme="SelectListTheme">
          <MultiSelectAllComp :theme="MultiSelectItemTheme" />
          <template v-for="group in groups" :key="group.id">
            <MultiSelectGroupComp :group="group" :theme="MultiSelectGroupTheme">
              <MultiSelectItemComp
                v-for="item in groupedItems.filter(i => i.group === group.id)"
                :key="item.value"
                :theme="MultiSelectItemTheme"
                :item="item"
              />
            </MultiSelectGroupComp>
          </template>
        </MultiSelectListComp>
      </MultiSelect>
    `,
  }),
}
