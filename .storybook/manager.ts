import { addons } from 'storybook/internal/manager-api';

// Минималистичная конфигурация как в React версии
// Темы обрабатываются через preview.ts
addons.setConfig({
  sidebar: {
    // Можно добавить кастомизацию позже (i18n и т.д.)
  },
});
