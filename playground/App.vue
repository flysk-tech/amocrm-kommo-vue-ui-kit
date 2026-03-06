<template>
  <div id="app">
    <ThemeProvider :theme="{ mode: currentTheme }">
      <div class="demo-container">
        <header class="demo-header">
          <h1>🚀 amoCRM Vue UI Kit</h1>
          <p>Демонстрация инфраструктуры</p>
        </header>

        <main class="demo-main">
          <TestComponent :title="demoTitle" />

          <!-- Демонстрация Button компонента -->
          <div class="demo-section">
            <h3>🎯 Button компонент:</h3>

            <!-- Основные темы -->
            <div class="button-demo">
              <Button
                :theme="ButtonPrimaryTheme"
                @click="handleButtonClick"
              >
                Основная кнопка
              </Button>

              <Button
                :theme="ButtonNeutralTheme"
                @click="handleButtonClick"
              >
                Нейтральная кнопка
              </Button>

              <Button
                :theme="ButtonSecondaryTheme"
                @click="handleButtonClick"
              >
                Вторичная кнопка
              </Button>
            </div>

            <!-- Состояния -->
            <div class="button-demo">
              <Button
                :theme="ButtonPrimaryTheme"
                :is-loading="isLoading"
                @click="handleLoadingTest"
              >
                {{ isLoading ? 'Загрузка...' : 'Тест загрузки' }}
              </Button>

              <Button
                :theme="ButtonPrimaryTheme"
                :is-disabled="true"
              >
                Отключенная кнопка
              </Button>
            </div>

            <!-- Кнопки с иконками -->
            <div class="button-demo">
              <Button
                :theme="ButtonPrimaryTheme"
                :before="true"
                @click="handleButtonClick"
              >
                <template #before>
                  <CopyIcon :width="16" :height="16" />
                </template>
                С иконкой слева
              </Button>

              <Button
                :theme="ButtonNeutralTheme"
                :after="true"
                @click="handleButtonClick"
              >
                С иконкой справа
                <template #after>
                  <CalendarIcon :width="16" :height="16" />
                </template>
              </Button>
            </div>

            <!-- Кнопки с refs для анимаций -->
            <div class="button-demo">
              <Button
                :theme="ButtonPrimaryTheme"
                :show-successful-state-ref="successRef"
                successful-state-text="Сохранено!"
                @click="triggerSuccess"
              >
                Анимация успеха
              </Button>

              <Button
                :theme="ButtonPrimaryTheme"
                :show-invalid-animation-ref="errorRef"
                @click="triggerError"
              >
                Анимация ошибки
              </Button>
            </div>
          </div>

          <!-- Демонстрация Text компонента -->
          <div class="demo-section">
            <h3>📝 Text компонент:</h3>

            <!-- Размеры -->
            <div class="text-demo">
              <h4>Размеры:</h4>
              <div class="text-demo-group">
                <Text size="s" :theme="TextPrimaryTheme">Размер S (11/15)</Text>
                <Text size="m" :theme="TextPrimaryTheme">Размер M (13/20)</Text>
                <Text size="ms" :theme="TextPrimaryTheme">Размер MS (13/15)</Text>
                <Text size="l" :theme="TextPrimaryTheme">Размер L (15/20)</Text>
                <Text size="xl" :theme="TextPrimaryTheme">Размер XL (18/24)</Text>
              </div>
            </div>

            <!-- Темы -->
            <div class="text-demo">
              <h4>Темы:</h4>
              <div class="text-demo-group">
                <Text size="l" :theme="TextPrimaryTheme">Primary Theme</Text>
                <Text size="l" :theme="TextSecondaryLightTheme">Secondary Light</Text>
                <Text size="l" :theme="TextSecondaryDarkTheme">Secondary Dark</Text>
                <Text size="l" :theme="TextErrorTheme">Error Theme</Text>
              </div>
            </div>

            <!-- Эллипсис -->
            <div class="text-demo">
              <h4>Эллипсис:</h4>
              <div style="width: 200px; border: 1px solid #ccc; padding: 8px; background: #f9f9f9;">
                <Text size="m" :theme="TextPrimaryTheme" :isEllipsis="true">
                  Очень длинный текст, который должен быть обрезан многоточием
                </Text>
              </div>
            </div>

            <!-- Многострочный -->
            <div class="text-demo">
              <h4>Многострочный (3 строки):</h4>
              <div style="width: 250px; border: 1px solid #ccc; padding: 8px; background: #f9f9f9;">
                <Text size="m" :theme="TextPrimaryTheme" :maxRows="3">
                  Длинный текст, который будет отображаться в несколько строк.
                  Текст будет обрезан после указанного количества строк с помощью CSS line-clamp.
                  Этот текст достаточно длинный для демонстрации.
                </Text>
              </div>
            </div>
          </div>

          <div class="demo-controls">
            <button @click="toggleTheme" class="theme-toggle">
              {{ currentTheme === 'light' ? '☀️ Переключить на темную' : '🌙 Переключить на светлую' }}
            </button>
            <div class="theme-indicator">
              Текущая тема: {{ currentTheme === 'light' ? '☀️ Светлая' : '🌙 Темная' }}
            </div>
          </div>

          <div class="demo-info">
            <h3>✅ Что работает:</h3>
            <ul>
              <li>Vue 3 + Composition API</li>
              <li>TypeScript типизация</li>
              <li>CSS модули и SCSS</li>
              <li>Система темизации</li>
              <li>Композиционные функции</li>
              <li>CSS переменные amoCRM</li>
              <li><strong>Button компонент с темами!</strong></li>
              <li><strong>Text компонент со всеми возможностями!</strong></li>
            </ul>
          </div>
        </main>
      </div>
    </ThemeProvider>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ThemeProvider, TestComponent, Button, Text } from '../src/components'
import { ButtonPrimaryTheme, ButtonNeutralTheme, ButtonSecondaryTheme } from '../src/components/Button/Button.themes'
import { TextPrimaryTheme, TextSecondaryLightTheme, TextSecondaryDarkTheme, TextErrorTheme } from '../src/components/Text/Text.themes'
import CopyIcon from '../src/components/icons/CopyIcon.vue'
import CalendarIcon from '../src/components/icons/CalendarIcon.vue'
import type { ThemeMode } from '../src/types'
import type { AnimationRefType } from '../src/components/Button/Button.types'

const currentTheme = ref<ThemeMode>('light')
const demoTitle = ref('Инфраструктура готова! 🎉')
const isLoading = ref(false)

// Refs для анимаций
const successRef = ref<AnimationRefType | null>(null)
const errorRef = ref<AnimationRefType | null>(null)

const toggleTheme = () => {
  currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light'
}

const handleButtonClick = () => {
  console.log('Button clicked!')
}

const handleLoadingTest = () => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 2000)
}

// Функции для тестирования анимаций
const triggerSuccess = () => {
  if (successRef.value) {
    successRef.value(() => {
      console.log('Анимация успеха завершена!')
    })
  }
}

const triggerError = () => {
  if (errorRef.value) {
    errorRef.value(() => {
      console.log('Анимация ошибки завершена!')
    })
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
}

#app {
  min-height: 100vh;
  background: var(--crm-ui-kit-palette-background-default, #f5f5f5);
  transition: background 0.3s ease;
}

.demo-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.demo-header {
  text-align: center;
  margin-bottom: 3rem;
}

.demo-header h1 {
  font-size: 2.5rem;
  color: var(--crm-ui-kit-palette-text-primary, #363b44);
  margin-bottom: 0.5rem;
}

.demo-header p {
  color: var(--crm-ui-kit-palette-text-secondary-light, #92989b);
  font-size: 1.1rem;
}

.demo-main {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.demo-section {
  background: var(--crm-ui-kit-palette-background-primary, white);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: var(--crm-ui-kit-palette-content-block-box-shadow, 0 2px 8px rgba(0,0,0,0.1));
  transition: background 0.3s ease, box-shadow 0.3s ease;
}

.demo-section h3 {
  color: var(--crm-ui-kit-palette-text-primary, #363b44);
  margin-bottom: 1rem;
}

.button-demo {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
}

.text-demo {
  margin-bottom: 1.5rem;
}

.text-demo h4 {
  color: var(--crm-ui-kit-palette-text-primary, #363b44);
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.text-demo-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.demo-controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.theme-toggle {
  padding: 12px 24px;
  font-size: 1rem;
  background: var(--crm-ui-kit-palette-active-element-900, #4c8bf7);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.theme-toggle:hover {
  opacity: 0.8;
}

.demo-info {
  background: var(--crm-ui-kit-palette-background-primary, white);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: var(--crm-ui-kit-palette-content-block-box-shadow, 0 2px 8px rgba(0,0,0,0.1));
  transition: background 0.3s ease, box-shadow 0.3s ease;
}

.demo-info h3 {
  color: var(--crm-ui-kit-palette-text-primary, #363b44);
  margin-bottom: 1rem;
}

.demo-info ul {
  list-style: none;
  color: var(--crm-ui-kit-palette-text-secondary-dark, #6b6d72);
}

.demo-info li {
  padding: 0.25rem 0;
  padding-left: 1.5rem;
  position: relative;
}

.demo-info li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--crm-ui-kit-palette-active-element-900, #4c8bf7);
  font-weight: bold;
}
</style>