import type { Meta, StoryObj } from '@storybook/vue3'

import FilterTabs from '../FilterTabs.vue'
import { ItemRoot, ItemRootReset } from '../components/ItemRoot'
import { Tab, TabReset } from '../components/Tab'
import Text from '@/components/Text/Text.vue'
import { TextPrimaryTheme } from '@/components/Text/Text.themes'
import {
  FilterTabsTheme,
  FilterTabsItemRootTheme,
  TabPrimaryTheme,
} from '../index'
import type { FilterTabsChangeEvent } from '../FilterTabs.types'

const DefaultValues = [
  {
    name: 'Один',
    isDefaultActive: true,
  },
  {
    name: 'Два',
  },
  {
    name: 'Три',
  },
  {
    name: 'Четыре',
  },
]

const meta = {
  title: 'Components/FilterTabs',
  component: FilterTabs,
  parameters: {
    docs: {
      description: {
        component: `
Компонент FilterTabs для создания фильтрующих вкладок с поддержкой одиночного и множественного выбора.

## Возможности

- **Два режима выбора**: одиночный и множественный (isMultiSelect)
- **Темы**: для FilterTabs, ItemRoot и Tab
- **Кнопка "Сбросить"**: специальный ItemRootReset и TabReset
- **Состояния**: обычное, активное, отключено
- **Ориентация**: горизонтальная и вертикальная
- **Управление**: контролируемый режим с onChange

## Применение

- Фильтры с группировкой опций
- Навигационные вкладки
- Настройки с переключателями

## Импорт

\`\`\`typescript
import {
  FilterTabs,
  ItemRoot,
  ItemRootReset,
  Tab,
  TabReset,
  FilterTabsTheme,
  FilterTabsItemRootTheme,
  TabPrimaryTheme,
} from '@amocrm/vue-ui-kit/FilterTabs'
\`\`\`

## API

### FilterTabs Props

- \`theme\` - объект темы оформления
- \`orientation\` - ориентация вкладок ('horizontal' | 'vertical')
- \`isMultiSelect\` - режим множественного выбора
- \`isDisabled\` - отключить все вкладки
- \`onChange\` - обработчик изменения выбранных вкладок (values, trigger)

### ItemRoot Props

- \`theme\` - объект темы оформления
- \`name\` - уникальное имя вкладки (обязательный)
- \`isDefaultActive\` - начальное активное состояние
- \`isDisabled\` - отключить вкладку

### ItemRootReset Props

- \`theme\` - объект темы оформления

### Tab Props

- \`theme\` - объект темы оформления

### TabReset Props

- \`theme\` - объект темы оформления

### Events

- \`@change\` - событие изменения выбранных вкладок
  - Параметры: (values: string[], trigger?: string)
  - values: массив активных имён вкладок
  - trigger: имя вкладки, вызвавшей изменение (или undefined для Reset)
        `
      }
    }
  },
  args: {
    theme: FilterTabsTheme,
    orientation: 'horizontal',
    isMultiSelect: false,
  },
  argTypes: {
    theme: {
      control: 'object',
      description: 'Тема оформления'
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Ориентация вкладок'
    },
    isMultiSelect: {
      control: 'boolean',
      description: 'Режим множественного выбора'
    },
    isDisabled: {
      control: 'boolean',
      description: 'Отключить все вкладки'
    },
  }
} satisfies Meta<typeof FilterTabs>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: {
      FilterTabs,
      ItemRoot,
      ItemRootReset,
      Tab,
      TabReset,
      Text,
    },
    setup() {
      const handleChange: FilterTabsChangeEvent = (values, trigger) => {
        console.log('Изменение:', values, 'Триггер:', trigger)
      }

      return {
        args,
        handleChange,
        DefaultValues,
        FilterTabsItemRootTheme,
        TabPrimaryTheme,
        TextPrimaryTheme,
      }
    },
    template: `
      <FilterTabs v-bind="args" :onChange="handleChange">
        <ItemRootReset :theme="FilterTabsItemRootTheme">
          <TabReset :theme="TabPrimaryTheme">
            <Text :theme="TextPrimaryTheme" size="l">
              Выбрать все
            </Text>
          </TabReset>
        </ItemRootReset>

        <ItemRoot
          v-for="item in DefaultValues"
          :key="item.name"
          :name="item.name"
          :isDefaultActive="item.isDefaultActive"
          :theme="FilterTabsItemRootTheme"
        >
          <Tab :theme="TabPrimaryTheme">
            <Text :theme="TextPrimaryTheme" size="l">
              {{ item.name }}
            </Text>
          </Tab>
        </ItemRoot>
      </FilterTabs>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример FilterTabs с одиночным выбором и кнопкой "Выбрать все".'
      }
    }
  }
}

export const MultiSelect: Story = {
  args: {
    isMultiSelect: true,
  },
  render: (args) => ({
    components: {
      FilterTabs,
      ItemRoot,
      ItemRootReset,
      Tab,
      TabReset,
      Text,
    },
    setup() {
      const handleChange: FilterTabsChangeEvent = (values, trigger) => {
        console.log('Изменение:', values, 'Триггер:', trigger)
      }

      return {
        args,
        handleChange,
        DefaultValues,
        FilterTabsItemRootTheme,
        TabPrimaryTheme,
        TextPrimaryTheme,
      }
    },
    template: `
      <FilterTabs v-bind="args" :onChange="handleChange">
        <ItemRootReset :theme="FilterTabsItemRootTheme">
          <TabReset :theme="TabPrimaryTheme">
            <Text :theme="TextPrimaryTheme" size="l">
              Сбросить
            </Text>
          </TabReset>
        </ItemRootReset>

        <ItemRoot
          v-for="item in DefaultValues"
          :key="item.name"
          :name="item.name"
          :isDefaultActive="item.isDefaultActive"
          :theme="FilterTabsItemRootTheme"
        >
          <Tab :theme="TabPrimaryTheme">
            <Text :theme="TextPrimaryTheme" size="l">
              {{ item.name }}
            </Text>
          </Tab>
        </ItemRoot>
      </FilterTabs>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'FilterTabs с режимом множественного выбора - можно выбрать несколько вкладок одновременно.'
      }
    }
  }
}
