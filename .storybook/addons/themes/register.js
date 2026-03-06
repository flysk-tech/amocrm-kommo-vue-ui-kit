import { addons, types } from 'storybook/internal/manager-api'
import { GLOBALS_UPDATED } from 'storybook/internal/core-events'
import ThemeToggleButton from './ThemeToggleButton'
import { getTheme } from './themeConfig'

const ADDON_ID = 'themes'

addons.register(ADDON_ID, (api) => {
  // Подписываемся на обновления глобальных переменных
  api.on(GLOBALS_UPDATED, ({ globals }) => {
    const appearance = globals.appearance || 'default'
    addons.setConfig({ theme: getTheme(appearance) })
  })

  addons.add(ADDON_ID, {
    type: types.TOOL,
    title: 'Toggle theme',
    match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
    render: ThemeToggleButton,
  })
})
