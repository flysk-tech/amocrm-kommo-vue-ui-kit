<template>
  <a
    ref="linkRef"
    v-bind="$attrs"
    :class="[styles.link, className]"
    :style="theme"
  >
    <slot />
  </a>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { LinkProps } from './Link.types'
import styles from './Link.module.scss'

type Props = LinkProps & {
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  className: '',
})

const linkRef = ref<HTMLAnchorElement | null>(null)

defineExpose({
  linkRef,
})
</script>
