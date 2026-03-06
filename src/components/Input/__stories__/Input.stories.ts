import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'

import Input from '../Input.vue'
import { InputLightTheme, InputDarkTheme, InputPrimaryTheme, InputSecondaryTheme } from '../Input.themes'
import type { InputInvalidDescriptionPlacement } from '../Input.types'

const invalidDescriptionPlacements: InputInvalidDescriptionPlacement[] = [
  'bottom',
  'right',
]

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    docs: {
      description: {
        component: `
Компонент Input для создания интерактивных полей ввода с различными темами оформления.

## Возможности

- **Две темы оформления**: Light (светлая), Dark (темная)
- **Состояния**: обычное, ошибка, отключено, только для чтения
- **Валидация**: отображение ошибок с настраиваемой позицией
- **Слоты**: поддержка слота \`after\` для добавления иконок или кнопок
- **v-model**: полная поддержка двусторонней привязки данных
- **События**: input, change, focus, blur
- **Доступность**: полная поддержка всех HTML input атрибутов

## Применение

- **Light** - основные поля ввода в светлой теме
- **Dark** - поля ввода в темной теме

## Импорт

\`\`\`typescript
import { Input, InputLightTheme, InputDarkTheme } from '@amocrm/vue-ui-kit'
\`\`\`

## API

### Props

- \`theme\` - объект темы оформления (опциональный, по умолчанию используются глобальные CSS переменные)
- \`modelValue\` - значение поля (для v-model)
- \`isInvalid\` - отображать состояние ошибки
- \`isDisabled\` - отключить поле
- \`isReadonly\` - сделать поле только для чтения
- \`invalidDescription\` - текст ошибки
- \`invalidDescriptionPlacement\` - позиция текста ошибки ('bottom' | 'right')
- \`after\` - контент после основного поля
- \`className\` - дополнительные CSS классы
- \`isPlaceholderVisibleOnFocus\` - показывать placeholder при фокусе

### Events

- \`@update:modelValue\` - обновление значения (для v-model)
- \`@input\` - событие input
- \`@change\` - событие change
- \`@focus\` - получение фокуса
- \`@blur\` - потеря фокуса

### Slots

- \`after\` - контент после основного поля (иконки, кнопки)
        `
      }
    },
  },
  args: {
    placeholder: 'Введите текст',
    modelValue: '',
  },
  argTypes: {
    theme: {
      control: 'object',
      description: 'Объект с CSS переменными темы'
    },
    modelValue: {
      control: 'text',
      description: 'Значение поля ввода'
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder текст'
    },
    isInvalid: {
      control: 'boolean',
      description: 'Показать состояние ошибки'
    },
    isDisabled: {
      control: 'boolean',
      description: 'Отключить поле ввода'
    },
    isReadonly: {
      control: 'boolean',
      description: 'Сделать поле только для чтения'
    },
    invalidDescription: {
      control: 'text',
      description: 'Текст ошибки'
    },
    invalidDescriptionPlacement: {
      control: 'select',
      options: invalidDescriptionPlacements,
      description: 'Позиция текста ошибки'
    },
    after: {
      control: 'text',
      description: 'Контент после поля (например, иконка)'
    },
    className: {
      control: 'text',
      description: 'Дополнительные CSS классы'
    },
    'onUpdate:modelValue': {
      action: 'update:modelValue',
      description: 'Обработчик изменения значения'
    },
    onInput: {
      action: 'input',
      description: 'Обработчик события input'
    },
    onChange: {
      action: 'change',
      description: 'Обработчик события change'
    },
    onFocus: {
      action: 'focus',
      description: 'Обработчик получения фокуса'
    },
    onBlur: {
      action: 'blur',
      description: 'Обработчик потери фокуса'
    }
  },
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Введите ваш email',
    theme: InputLightTheme,
  },
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример поля ввода с Primary темой.'
      }
    }
  }
}

export const WithValue: Story = {
  tags: ['!autodocs'],
  args: {
    modelValue: 'example@amocrm.ru',
    placeholder: 'Email адрес',
    theme: InputLightTheme,
  },
  parameters: {
    docs: {
      description: {
        story: 'Поле ввода с предустановленным значением.'
      }
    }
  }
}

export const Invalid: Story = {
  tags: ['!autodocs'],
  args: {
    isInvalid: true,
    invalidDescription: 'Это поле обязательно для заполнения',
    placeholder: 'Обязательное поле',
    theme: InputLightTheme,
  },
  parameters: {
    docs: {
      description: {
        story: 'Поле ввода в состоянии ошибки с текстом описания.'
      }
    }
  }
}

export const Disabled: Story = {
  tags: ['!autodocs'],
  args: {
    isDisabled: true,
    modelValue: 'Отключенное поле',
    theme: InputLightTheme,
  },
  parameters: {
    docs: {
      description: {
        story: 'Отключенное поле ввода не реагирует на действия пользователя.'
      }
    }
  }
}

export const Readonly: Story = {
  tags: ['!autodocs'],
  args: {
    isReadonly: true,
    modelValue: 'Поле только для чтения',
    theme: InputLightTheme,
  },
  parameters: {
    docs: {
      description: {
        story: 'Поле только для чтения позволяет выделение текста, но не редактирование.'
      }
    }
  }
}

export const Light: Story = {
  tags: ['!autodocs'],
  args: {
    placeholder: 'Light тема',
    theme: InputLightTheme,
  }
}

export const Dark: Story = {
  tags: ['!autodocs'],
  args: {
    placeholder: 'Dark тема',
    theme: InputDarkTheme,
  }
}

export const WithoutTheme: Story = {
  tags: ['!autodocs'],
  args: {
    placeholder: 'Без theme - используется дефолтная светлая тема',
  },
  parameters: {
    docs: {
      description: {
        story: 'Пример использования Input компонента без передачи theme. Автоматически применяется InputLightTheme как дефолтная тема.'
      }
    }
  }
}

export const States: Story = {
  tags: ['!autodocs'],
  render: () => ({
    components: { Input },
    setup() {
      const normalValue = ref('')
      const invalidValue = ref('')
      const disabledValue = ref('Отключенное поле')

      return {
        InputLightTheme,
        normalValue,
        invalidValue,
        disabledValue
      }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; width: 100%;">
        <Input
          v-model="normalValue"
          :theme="InputLightTheme"
          placeholder="Обычное состояние"
        />
        <Input
          v-model="invalidValue"
          :theme="InputLightTheme"
          :isInvalid="true"
          invalidDescription="Это поле обязательно для заполнения"
          placeholder="Состояние ошибки"
        />
        <Input
          v-model="disabledValue"
          :theme="InputLightTheme"
          :isDisabled="true"
          placeholder="Отключенное состояние"
        />
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: `
Демонстрация всех основных состояний поля ввода:
- **Обычное состояние** - стандартное поле ввода
- **Состояние ошибки** - поле с текстом ошибки снизу
- **Отключенное состояние** - неактивное поле

Все поля используют Primary тему.
        `
      }
    }
  }
}

export const InvalidPlacement: Story = {
  tags: ['!autodocs'],
  render: () => ({
    components: { Input },
    setup() {
      const bottomValue = ref('')
      const rightValue = ref('')

      return {
        InputLightTheme,
        bottomValue,
        rightValue
      }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; width: 100%;">
        <Input
          v-model="bottomValue"
          :theme="InputLightTheme"
          :isInvalid="true"
          invalidDescription="Ошибка снизу (по умолчанию)"
          invalidDescriptionPlacement="bottom"
          placeholder="Размещение ошибки снизу"
        />
        <Input
          v-model="rightValue"
          :theme="InputLightTheme"
          :isInvalid="true"
          invalidDescription="Ошибка справа"
          invalidDescriptionPlacement="right"
          placeholder="Размещение ошибки справа"
        />
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: `
Демонстрация различных вариантов размещения текста ошибки:
- **bottom** - текст ошибки отображается под полем (по умолчанию)
- **right** - текст ошибки отображается справа от поля
        `
      }
    }
  }
}

export const WithAfterSlot: Story = {
  tags: ['!autodocs'],
  render: () => ({
    components: { Input },
    setup() {
      const searchValue = ref('')
      const passwordValue = ref('')
      const showPassword = ref(false)

      const togglePassword = () => {
        showPassword.value = !showPassword.value
      }

      return {
        InputLightTheme,
        searchValue,
        passwordValue,
        showPassword,
        togglePassword
      }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; width: 100%;">
        <Input
          v-model="searchValue"
          :theme="InputLightTheme"
          placeholder="Поиск..."
        >
          <template #after>
            <svg style="width: 16px; height: 16px; margin: 0 8px; color: #666;" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
          </template>
        </Input>

        <Input
          v-model="passwordValue"
          :theme="InputLightTheme"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Пароль"
        >
          <template #after>
            <button
              @click="togglePassword"
              style="background: none; border: none; padding: 0 8px; cursor: pointer; color: #666; display: flex; align-items: center;"
            >
              <svg v-if="!showPassword" style="width: 16px; height: 16px;" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
              </svg>
              <svg v-else style="width: 16px; height: 16px;" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
              </svg>
            </button>
          </template>
        </Input>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: `
Демонстрация использования слота \`after\` для добавления иконок и интерактивных элементов:
- **Поиск** - иконка поиска справа от поля
- **Пароль** - кнопка для показа/скрытия пароля

Слот \`after\` позволяет добавлять любой контент справа от основного поля ввода.
        `
      }
    }
  }
}