<template>
  <div>
    <h2>Design tokens</h2>

    <div class="color-palette">
      <div
        v-for="{ key, value } in colorValues"
        :key="key"
        class="color-item"
      >
        <div class="color-swatches">
          <div
            class="color-swatch"
            :style="{ backgroundColor: value.defaultColor }"
            :title="value.defaultColor"
          />
          <div
            v-if="value.alternativeColor"
            class="color-swatch"
            :style="{ backgroundColor: value.alternativeColor }"
            :title="value.alternativeColor"
          />
        </div>
        <div class="color-info">
          <div class="color-title">{{ key }}</div>
          <div v-if="value.variableName" class="color-subtitle">
            {{ value.variableName }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ColorItemType } from '../types/Items';

interface Props {
  colorValues: ColorItemType[];
}

defineProps<Props>();
</script>

<style scoped>
.color-palette {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  margin-top: 16px;
}

.color-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.color-swatches {
  display: flex;
  gap: 4px;
}

.color-swatch {
  width: 100%;
  height: 80px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.color-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.color-title {
  font-weight: 600;
  font-size: 14px;
  font-family: monospace;
}

.color-subtitle {
  font-size: 12px;
  color: #666;
  font-family: monospace;
}
</style>
