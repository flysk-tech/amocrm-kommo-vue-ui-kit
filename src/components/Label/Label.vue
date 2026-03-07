<template>
  <label
    v-bind="$attrs"
    ref="labelRef"
    :class="[
      textPlacementClass,
      {
        [styles.centered]: isCentered
      }
    ]"
    :style="theme"
  >
    <div v-if="text || description || $slots.text || $slots.description" :class="styles.text_container">
      <span v-if="text || $slots.text">
        <slot name="text">{{ text }}</slot>
      </span>
      <div v-if="description || $slots.description" :class="styles.text_description">
        <slot name="description">{{ description }}</slot>
      </div>
    </div>
    <slot />
  </label>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { LabelProps } from './Label.types'
import styles from './Label.module.scss'

type Props = LabelProps

const props = withDefaults(defineProps<Props>(), {
  textPlacement: 'top',
  isCentered: false,
})

const labelRef = ref<HTMLLabelElement | null>(null)

const textPlacementMap = {
  top: styles.top,
  left: styles.left,
  right: styles.right,
}

const textPlacementClass = computed(() => textPlacementMap[props.textPlacement])

defineExpose({
  labelRef,
})
</script>
