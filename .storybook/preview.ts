import type { Preview } from '@storybook/vue3-vite'
import { CustomDocsContainer } from '@storybook-utils/components'
import { initialTheme } from '@storybook-utils/utils'
import '../src/styles/theme.css'
import '../src/styles/icons.css'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      container: CustomDocsContainer,
    },
    options: {
      storySort: {
        order: [
          'Getting Started',
          'Typography',
          'Components',
        ],
      },
    },
  },
  globalTypes: {
    appearance: {
      description: 'Global theme',
    },
  },
  initialGlobals: {
    appearance: initialTheme,
  },
  decorators: [
    (story, context) => {
      const { appearance } = context.globals

      // Устанавливаем атрибут темы на documentElement
      document.documentElement.setAttribute('data-crm-ui-kit-theme', appearance)

      // Применяем стили темы к body iframe
      if (appearance === 'alternative') {
        document.body.style.backgroundColor = 'var(--crm-ui-kit-palette-background-default, #0f2231)'
        document.body.style.color = 'var(--crm-ui-kit-palette-text-primary, #f2f2f2)'
      } else {
        document.body.style.backgroundColor = 'var(--crm-ui-kit-palette-background-default, #f5f5f5)'
        document.body.style.color = 'var(--crm-ui-kit-palette-text-primary, #363b44)'
      }

      // Устанавливаем шрифт на body
      document.body.style.fontFamily = "'PT Sans', sans-serif"

      // Создаем wrapper с центрированием
      const wrapper = document.createElement('div')
      wrapper.style.cssText = 'display: flex; align-items: center; justify-content: center; flex-direction: column; min-height: 100vh; padding: 20px;'

      // Рендерим story в wrapper
      const storyElement = story()
      if (storyElement instanceof HTMLElement) {
        wrapper.appendChild(storyElement)
        return wrapper
      }

      return storyElement
    },
  ],
}

export default preview
