import type { Meta, StoryObj } from '@storybook/vue3'

import Button from '../Button.vue'
import { ButtonNeutralTheme, ButtonPrimaryTheme, ButtonSecondaryTheme } from '../Button.themes'

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: `
Компонент Button для создания интерактивных кнопок с различными темами оформления.

## Возможности

- **Три темы оформления**: Primary, Neutral, Secondary
- **Состояния**: обычное, загрузка, отключено, успех, ошибка
- **Иконки**: поддержка слотов \`before\` и \`after\` для добавления иконок
- **Анимации**: программное управление анимациями успеха и ошибки через refs
- **Доступность**: полная поддержка aria-атрибутов и клавиатурной навигации
- **Настройка**: полная кастомизация через CSS переменные

## Применение

- **Primary** - основные действия (сохранить, отправить, создать)
- **Neutral** - вторичные действия (отмена, закрыть)
- **Secondary** - дополнительные действия (редактировать, настройки)

## Импорт

\`\`\`typescript
import { Button, ButtonPrimaryTheme, ButtonNeutralTheme, ButtonSecondaryTheme } from '@amocrm/vue-ui-kit'
\`\`\`

## API

### Props

- \`theme\` - объект темы оформления (обязательный)
- \`isLoading\` - показать состояние загрузки
- \`isDisabled\` - отключить кнопку
- \`before\`/\`after\` - контент до/после основного текста
- \`showSuccessfulStateRef\` - ref для управления анимацией успеха
- \`showInvalidAnimationRef\` - ref для управления анимацией ошибки
- \`successfulStateText\` - текст для состояния успеха
- \`isClickableWhileDisabled\` - разрешить клики в отключенном состоянии

### Events

- \`@click\` - клик по кнопке

### Slots

- \`default\` - основной контент кнопки
- \`before\` - контент перед основным текстом (иконки)
- \`after\` - контент после основного текста (иконки)
        `
      }
    }
  },
  args: {
    children: 'Кнопка',
    theme: ButtonPrimaryTheme
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Текст кнопки'
    },
    theme: {
      control: 'object',
      description: 'Объект с CSS переменными темы'
    },
    isLoading: {
      control: 'boolean',
      description: 'Показать состояние загрузки'
    },
    isDisabled: {
      control: 'boolean',
      description: 'Отключить кнопку'
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'HTML тип кнопки'
    },
    className: {
      control: 'text',
      description: 'Дополнительные CSS классы'
    },
    successfulStateText: {
      control: 'text',
      description: 'Текст для состояния успеха'
    },
    onClick: {
      action: 'clicked',
      description: 'Обработчик клика'
    }
  }
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Перейти в Dashboard',
    theme: ButtonPrimaryTheme
  },
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример кнопки с Primary темой.'
      }
    }
  }
}

export const Loading: Story = {
  tags: ['!autodocs'],
  args: {
    children: 'Загрузка...',
    theme: ButtonPrimaryTheme,
    isLoading: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Кнопка в состоянии загрузки отображает спиннер вместо содержимого.'
      }
    }
  }
}

export const Disabled: Story = {
  tags: ['!autodocs'],
  args: {
    children: 'Отключенная кнопка',
    theme: ButtonPrimaryTheme,
    isDisabled: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Отключенная кнопка не реагирует на клики и имеет соответствующий внешний вид.'
      }
    }
  }
}

export const Primary: Story = {
  tags: ['!autodocs'],
  args: {
    children: 'Primary кнопка',
    theme: ButtonPrimaryTheme
  }
}

export const Neutral: Story = {
  tags: ['!autodocs'],
  args: {
    children: 'Neutral кнопка',
    theme: ButtonNeutralTheme
  }
}

export const Secondary: Story = {
  tags: ['!autodocs'],
  args: {
    children: 'Secondary кнопка',
    theme: ButtonSecondaryTheme
  }
}

export const WithAnimations: Story = {
  tags: ['!autodocs'],
  args: {
    theme: {
      '--crm-ui-kit-button-z-index': '1',
      '--crm-ui-kit-button-height': '30px',
      '--crm-ui-kit-button-elements-spacing': '4px',
      '--crm-ui-kit-button-font-size': '14px',
      '--crm-ui-kit-button-line-height': '14px',
      '--crm-ui-kit-button-font-weight': 'bold',
      '--crm-ui-kit-button-sibling-element-spacing': '7px',
      '--crm-ui-kit-button-disabled-opacity': 'var(--crm-ui-kit-disabled-opacity)',
      '--crm-ui-kit-button-padding': '0px 8px',
      '--crm-ui-kit-button-border-width': '1px',
      '--crm-ui-kit-button-border-style': 'solid',
      '--crm-ui-kit-button-border-radius': '3px',
      '--crm-ui-kit-button-hover-border-width': '1px',
      '--crm-ui-kit-button-hover-border-style': 'solid',
      '--crm-ui-kit-button-hover-border-radius': '3px',
      '--crm-ui-kit-button-success-color': 'var(--crm-ui-kit-color-white)',
      '--crm-ui-kit-button-success-background-color':
        'var(--crm-ui-kit-color-mustard-yellow)',
      '--crm-ui-kit-button-success-hover-background-color':
        'var(--crm-ui-kit-color-amber)',
      '--crm-ui-kit-button-success-border-color': 'var(--crm-ui-kit-color-goldenrod)',
      '--crm-ui-kit-button-spinner-border-color':
        'var(--crm-ui-kit-color-bright-blue)',
      '--crm-ui-kit-button-spinner-disabled-border-color':
        'var(--crm-ui-kit-color-bright-blue)',
      '--crm-ui-kit-button-spinner-border-width': '2px',
      '--crm-ui-kit-button-spinner-circle-size': '16px',
      '--crm-ui-kit-button-spinner-border-style': 'solid',
      '--crm-ui-kit-button-color': 'var(--crm-ui-kit-palette-text-secondary-light)',
      '--crm-ui-kit-button-border-color': 'transparent',
      '--crm-ui-kit-button-background-color': 'inherit',
      '--crm-ui-kit-button-disabled-color':
        'var(--crm-ui-kit-palette-text-secondary-light)',
      '--crm-ui-kit-button-disabled-background-color': 'inherit',
      '--crm-ui-kit-button-disabled-border-color': 'transparent',
      '--crm-ui-kit-button-hover-background-color': 'inherit',
      '--crm-ui-kit-button-hover-border-color': 'transparent',
      '--crm-ui-kit-button-hover-color':
        'var(--crm-ui-kit-palette-text-secondary-light)'
    }
  },

  render: (args) => ({
    components: { Button },
    setup() {
      const showInvalidAnimationRef1 = { value: null }
      const showSuccessfulStateRef1 = { value: null }
      const showInvalidAnimationRef2 = { value: null }

      const handleSuccessClick = () => {
        if (showSuccessfulStateRef1.value) {
          showSuccessfulStateRef1.value()
        }
      }

      const handleErrorClick = () => {
        if (showInvalidAnimationRef2.value) {
          showInvalidAnimationRef2.value()
        }
      }

      return {
        ButtonPrimaryTheme,
        showInvalidAnimationRef1,
        showSuccessfulStateRef1,
        showInvalidAnimationRef2,
        handleSuccessClick,
        handleErrorClick
      }
    },
    template: `
      <div style="display: flex; gap: 16px; align-items: flex-start;">
        <Button
          :theme="ButtonPrimaryTheme"
          :showSuccessfulStateRef="showSuccessfulStateRef1"
          successfulStateText="Сохранено!"
          @click="handleSuccessClick"
        >
          Показать успех
        </Button>

        <Button
          :theme="ButtonPrimaryTheme"
          :showInvalidAnimationRef="showInvalidAnimationRef2"
          @click="handleErrorClick"
        >
          Показать ошибку
        </Button>
      </div>
    `
  }),

  parameters: {
    docs: {
      description: {
        story: `
Демонстрация анимаций кнопки:
- **Левая кнопка** - при клике показывает состояние успеха с текстом "Сохранено!"
- **Правая кнопка** - при клике запускает анимацию ошибки (тряска)

Обе кнопки используют Primary тему.
        `
      }
    }
  }
}
