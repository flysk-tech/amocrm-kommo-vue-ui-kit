<template>
  <slot />
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { APPEARANCE_ATTRIBUTE_NAME } from '../../lib/appearance'
import type { ConfigProviderProps } from './ConfigProvider.types'

type Props = ConfigProviderProps & {}

const props = defineProps<Props>()

// Функция установки атрибута темы на document.documentElement
const setThemeAttribute = (appearance: string) => {
  document.documentElement.setAttribute(APPEARANCE_ATTRIBUTE_NAME, appearance)
}

// Устанавливаем начальную тему
onMounted(() => {
  setThemeAttribute(props.appearance)
})

// Отслеживаем изменения темы
watch(() => props.appearance, (newAppearance) => {
  setThemeAttribute(newAppearance)
})
</script>