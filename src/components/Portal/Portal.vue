<template>
  <Teleport :to="container" :disabled="!container">
    <div ref="portalRef" v-bind="$attrs">
      <slot />
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { PortalProps } from './Portal.types'

type Props = PortalProps & {}

const props = withDefaults(defineProps<Props>(), {
  container: undefined,
})

const portalRef = ref<HTMLDivElement | null>(null)

const container = computed(() => props.container || document.body)

defineExpose({
  portalRef,
})
</script>
