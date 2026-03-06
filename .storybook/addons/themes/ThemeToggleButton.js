import React, { useCallback, useEffect } from 'react'
import { IconButton } from 'storybook/internal/components'
import { SunIcon, MoonIcon } from '@storybook/icons'
import { useGlobals, addons } from 'storybook/manager-api'
import { FORCE_RE_RENDER } from 'storybook/internal/core-events'
import { getTheme } from './themeConfig'

const ADDON_ID = 'themes'

const ThemeToggleButton = () => {
  const [globals, updateGlobals] = useGlobals()
  const currentTheme = globals.appearance || 'default'

  // Синхронизируем тему manager UI при изменении темы
  useEffect(() => {
    addons.setConfig({ theme: getTheme(currentTheme) })
  }, [currentTheme])

  const refreshAndUpdateGlobal = () => {
    const newTheme = currentTheme === 'default' ? 'alternative' : 'default'

    // Обновляем глобальные переменные (это триггерит useEffect выше)
    updateGlobals({ appearance: newTheme })

    // Принудительно обновляем iframe
    addons.getChannel().emit(FORCE_RE_RENDER)
  }

  const toggleTheme = useCallback(() => refreshAndUpdateGlobal(), [currentTheme])

  const icon = currentTheme === 'default' ? SunIcon : MoonIcon
  const title = currentTheme === 'default' ? 'Switch to dark theme' : 'Switch to light theme'

  return React.createElement(IconButton, {
    key: ADDON_ID,
    title: title,
    onClick: toggleTheme
  }, React.createElement(icon))
}

export default ThemeToggleButton
