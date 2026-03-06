<template>
  <div ref="groupRef">
    <div
      v-for="(child, index) in childrenArray"
      :key="index"
      :class="[styles.wrapper]"
      :style="theme"
    >
      <component :is="child" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { LabelGroupProps } from './Label.types'
import styles from './Label.module.scss'

type Props = LabelGroupProps & {}

const props = defineProps<Props>()
const slots = defineSlots<{ default?(): any }>()
const groupRef = ref<HTMLDivElement | null>(null)

const childrenArray = computed(() => slots.default ? slots.default() : [])

defineExpose({
  groupRef,
})
</script>
