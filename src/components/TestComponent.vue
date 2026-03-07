<template>
  <div :class="$style.container">
    <h1 :class="$style.title">
      {{ title }}
    </h1>
    <p :class="$style.description">
      Тестовый компонент для проверки инфраструктуры
    </p>
    <button
      :class="$style.button"
      @click="toggleTheme"
    >
      Переключить тему ({{ currentTheme }})
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from '@/composables/useTheme'

interface Props {
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'amoCRM Vue UI Kit'
})

// Проверяем работу композиционных функций
const { themeConfig, toggleTheme } = useTheme()

const currentTheme = computed(() => themeConfig.value.mode)
</script>

<style module lang="scss">
.container {
  padding: var(--crm-ui-kit-spacing-lg, 24px);
  background: var(--crm-ui-kit-palette-background-primary);
  color: var(--crm-ui-kit-palette-text-primary);
  border-radius: var(--crm-ui-kit-border-radius, 8px);
  transition: background 0.3s ease, color 0.3s ease;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: var(--crm-ui-kit-spacing-md, 16px);
  color: var(--crm-ui-kit-palette-active-element-900);
}

.description {
  margin-bottom: var(--crm-ui-kit-spacing-lg, 24px);
  opacity: 0.8;
}

.button {
  padding: var(--crm-ui-kit-spacing-sm, 8px) var(--crm-ui-kit-spacing-md, 16px);
  background: var(--crm-ui-kit-palette-active-element-900);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }

  @include focus-visible();
}
</style>