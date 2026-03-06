<template>
  <AccordionMultiple
    v-if="type === 'multiple'"
    v-bind="($props as AccordionMultipleProps)"
    ref="accordionRef"
  >
    <slot />
  </AccordionMultiple>
  <AccordionSingle
    v-else
    v-bind="($props as AccordionSingleProps)"
    ref="accordionRef"
  >
    <slot />
  </AccordionSingle>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AccordionSingle from './components/AccordionSingle/AccordionSingle.vue'
import AccordionMultiple from './components/AccordionMultiple/AccordionMultiple.vue'
import type {
  AccordionProps,
  AccordionSingleProps,
  AccordionMultipleProps,
} from './Accordion.types'
import { DISPLAY_NAME } from './Accordion.context'

defineProps<AccordionProps>()

const accordionRef = ref<
  InstanceType<typeof AccordionSingle | typeof AccordionMultiple> | null
>(null)

defineExpose({
  accordionRef,
})
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: DISPLAY_NAME,
})
</script>
