<template>
  <span
    :class="[
      styles.spinner,
      { [styles.centered]: isCentered },
      className
    ]"
    :style="theme || {}"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import type { SpinnerProps } from './Spinner.types'
import styles from './Spinner.module.scss'

type Props = SpinnerProps & {}

withDefaults(defineProps<Props>(), {
  isCentered: false,
  className: '',
  theme: undefined
})
</script>