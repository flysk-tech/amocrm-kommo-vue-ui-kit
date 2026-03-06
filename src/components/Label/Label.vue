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
    <div v-if="text || description" :class="styles.text_container">
      <template v-if="text">{{ text }}</template>
      <div v-if="description" :class="styles.text_description">
        {{ description }}
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
