import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'

import MultiSelect from '../MultiSelect.vue'
import MultiSelectTriggerComp from '../components/Trigger/Trigger.vue'
import MultiSelectListComp from '../components/List/MultiSelectList.vue'
import MultiSelectItemComp from '../components/Item/Item.vue'
import MultiSelectGroupComp from '../components/Group/Group.vue'
import MultiSelectAllComp from '../components/All/All.vue'
import MultiSelectValueComp from '../components/Value/Value.vue'
import SelectArrowComp from '@/components/Select/components/Arrow/Arrow.vue'
import Text from '@/components/Text/Text.vue'

import { MultiSelectRootTheme } from '../MultiSelect.themes'
import { MultiSelectItemTheme } from '../components/Item'
import { MultiSelectGroupTheme } from '../components/Group'
import { SelectArrowTheme } from '@/components/Select/components/Arrow'
import { SelectButtonLightTheme } from '@/components/SelectButton'
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
  { value: 1, option: 'Иванов Иван', group: 'sales' },
  { value: 2, option: 'Петрова Мария', group: 'sales' },
  { value: 3, option: 'Сидоров Пётр', group: 'sales' },
  { value: 4, option: 'Козлова Анна', group: 'support' },
  { value: 5, option: 'Волкова Елена', group: 'support' },
  { value: 6, option: 'Морозов Дмитрий', group: 'dev' },
  { value: 7, option: 'Новикова Ольга', group: 'dev' },
  { value: 8, option: 'Фёдоров Алексей', group: 'dev' },
]

const groups: MultiSelectGroup[] = [
  { id: 'sales', label: 'Отдел продаж', color: '#e8f5e9' },
  { id: 'support', label: 'Поддержка', color: '#e3f2fd' },
  { id: 'dev', label: 'Разработка', color: '#fff3e0' },
]

const meta = {
  title: 'Components/MultiSelect',
  component: MultiSelect,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Компонент MultiSelect — составной компонент для выбора одного или нескольких значений из списка с поддержкой группировки.

## Режимы

- **single** — выбор одного значения, как Select, но с группами
- **multi** (default) — множественный выбор с чекбоксами
- **multi + groupSelectable** — множественный выбор с возможностью выбрать всю группу

## Структура

- \`MultiSelect\` — корневой компонент (контекст)
- \`MultiSelectTrigger\` — кнопка-триггер
- \`MultiSelectValue\` — отображение выбранных значений
- \`MultiSelectList\` — список опций
- \`MultiSelectItem\` — элемент списка
- \`MultiSelectGroup\` — заголовок группы
- \`MultiSelectAll\` — "Выбрать всё"
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
  },
} satisfies Meta<typeof MultiSelect>

export default meta

type Story = StoryObj<typeof meta>

export const SingleSelect: Story = {
  render: (args) => ({
    components: {
      MultiSelect,
      MultiSelectTriggerComp,
      MultiSelectListComp,
      MultiSelectItemComp,
      MultiSelectGroupComp,
      MultiSelectValueComp,
      SelectArrowComp,
    },
    setup() {
      const selected = ref<MultiSelectItem[]>([])

      const handleChange = (items: MultiSelectItem[]) => {
        selected.value = items
      }

      return {
        args,
        selected,
        handleChange,
        groupedItems,
        groups,
        MultiSelectItemTheme,
        MultiSelectGroupTheme,
        SelectListTheme,
        SelectButtonLightTheme,
        SelectArrowTheme,
      }
    },
    template: `
      <MultiSelect v-bind="args" mode="single" :items="groupedItems" :value="selected" @change="handleChange">
        <MultiSelectTriggerComp :theme="SelectButtonLightTheme">
          <MultiSelectValueComp placeholder="Выберите сотрудника" display-mode="names" />
          <SelectArrowComp :theme="SelectArrowTheme" />
        </MultiSelectTriggerComp>

        <MultiSelectListComp :theme="SelectListTheme">
          <template v-for="group in ${JSON.stringify(groups)}" :key="group.id">
            <MultiSelectGroupComp :group="group">
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

export const MultiSelectFlat: Story = {
  name: 'Multi Select (flat)',
  render: (args) => ({
    components: {
      MultiSelect,
      MultiSelectTriggerComp,
      MultiSelectListComp,
      MultiSelectItemComp,
      MultiSelectAllComp,
      MultiSelectValueComp,
      SelectArrowComp,
    },
    setup() {
      const selected = ref<MultiSelectItem[]>([])

      const handleChange = (items: MultiSelectItem[]) => {
        selected.value = items
      }

      return {
        args,
        selected,
        handleChange,
        flatItems,
        MultiSelectItemTheme,
        SelectListTheme,
        SelectButtonLightTheme,
        SelectArrowTheme,
      }
    },
    template: `
      <MultiSelect v-bind="args" :items="flatItems" :value="selected" @change="handleChange">
        <MultiSelectTriggerComp :theme="SelectButtonLightTheme">
          <MultiSelectValueComp placeholder="Выберите этапы" />
          <SelectArrowComp :theme="SelectArrowTheme" />
        </MultiSelectTriggerComp>

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

export const MultiSelectGrouped: Story = {
  name: 'Multi Select (grouped, selectable)',
  render: (args) => ({
    components: {
      MultiSelect,
      MultiSelectTriggerComp,
      MultiSelectListComp,
      MultiSelectItemComp,
      MultiSelectGroupComp,
      MultiSelectAllComp,
      MultiSelectValueComp,
      SelectArrowComp,
    },
    setup() {
      const selected = ref<MultiSelectItem[]>([])

      const handleChange = (items: MultiSelectItem[]) => {
        selected.value = items
      }

      return {
        args,
        selected,
        handleChange,
        groupedItems,
        groups,
        MultiSelectItemTheme,
        MultiSelectGroupTheme,
        SelectListTheme,
        SelectButtonLightTheme,
        SelectArrowTheme,
      }
    },
    template: `
      <MultiSelect v-bind="args" :group-selectable="true" :items="groupedItems" :value="selected" @change="handleChange">
        <MultiSelectTriggerComp :theme="SelectButtonLightTheme">
          <MultiSelectValueComp placeholder="Выберите сотрудников" display-mode="names" :max-display-items="3" />
          <SelectArrowComp :theme="SelectArrowTheme" />
        </MultiSelectTriggerComp>

        <MultiSelectListComp :theme="SelectListTheme">
          <MultiSelectAllComp :theme="MultiSelectItemTheme" />
          <template v-for="group in ${JSON.stringify(groups)}" :key="group.id">
            <MultiSelectGroupComp :group="group">
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
      MultiSelectTriggerComp,
      MultiSelectListComp,
      MultiSelectItemComp,
      MultiSelectValueComp,
      SelectArrowComp,
      Text,
    },
    setup() {
      const disabledValue = ref<MultiSelectItem[]>([flatItems[0], flatItems[1]])
      const invalidValue = ref<MultiSelectItem[]>([])
      const emptyItems = ref<MultiSelectItem[]>([])

      return {
        args,
        disabledValue,
        invalidValue,
        emptyItems,
        flatItems,
        MultiSelectItemTheme,
        SelectListTheme,
        SelectButtonLightTheme,
        SelectArrowTheme,
        TextPrimaryTheme,
        MultiSelectRootTheme,
      }
    },
    template: `
      <div>
        <div style="margin-bottom: 20px;">
          <Text size="l" :theme="TextPrimaryTheme">Disabled</Text>
          <MultiSelect :theme="MultiSelectRootTheme" :items="flatItems" :value="disabledValue" :is-disabled="true">
            <MultiSelectTriggerComp :theme="SelectButtonLightTheme">
              <MultiSelectValueComp placeholder="Выберите" />
              <SelectArrowComp :theme="SelectArrowTheme" />
            </MultiSelectTriggerComp>
            <MultiSelectListComp :theme="SelectListTheme">
              <MultiSelectItemComp v-for="item in flatItems" :key="item.value" :theme="MultiSelectItemTheme" :item="item" />
            </MultiSelectListComp>
          </MultiSelect>
        </div>

        <div style="margin-bottom: 20px;">
          <Text size="l" :theme="TextPrimaryTheme">Invalid</Text>
          <MultiSelect :theme="MultiSelectRootTheme" :items="flatItems" :value="invalidValue" :is-invalid="true">
            <MultiSelectTriggerComp :theme="SelectButtonLightTheme">
              <MultiSelectValueComp placeholder="Выберите" />
              <SelectArrowComp :theme="SelectArrowTheme" />
            </MultiSelectTriggerComp>
            <MultiSelectListComp :theme="SelectListTheme">
              <MultiSelectItemComp v-for="item in flatItems" :key="item.value" :theme="MultiSelectItemTheme" :item="item" />
            </MultiSelectListComp>
          </MultiSelect>
        </div>

        <div style="margin-bottom: 20px;">
          <Text size="l" :theme="TextPrimaryTheme">Empty list</Text>
          <MultiSelect :theme="MultiSelectRootTheme" :items="emptyItems" :value="[]">
            <MultiSelectTriggerComp :theme="SelectButtonLightTheme">
              <MultiSelectValueComp placeholder="Нет элементов" />
              <SelectArrowComp :theme="SelectArrowTheme" />
            </MultiSelectTriggerComp>
            <MultiSelectListComp :theme="SelectListTheme" />
          </MultiSelect>
        </div>
      </div>
    `,
  }),
}
