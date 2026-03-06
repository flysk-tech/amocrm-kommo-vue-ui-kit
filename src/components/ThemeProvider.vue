<template>
  <div
    :data-theme="themeMode"
    :style="cssVariables"
    class="amocrm-theme-provider"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { provideTheme } from '@/composables/useTheme'
import type { ThemeConfig } from '@/types/theme'

interface Props {
  theme?: Partial<ThemeConfig>
}

const props = withDefaults(defineProps<Props>(), {
  theme: () => ({ mode: 'light' })
})

// Предоставляем контекст темы для дочерних компонентов
const { themeConfig } = provideTheme(props.theme)

const themeMode = computed(() => themeConfig.value.mode)

const cssVariables = computed(() => {
  const variables: Record<string, string> = {}

  if (themeConfig.value.customVariables) {
    Object.entries(themeConfig.value.customVariables).forEach(([key, value]) => {
      variables[key] = value
    })
  }

  return variables
})
</script>

<style scoped>
.amocrm-theme-provider {
  width: 100%;
  height: 100%;
}
</style>