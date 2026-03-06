<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 28"
    :width="width"
    :height="height"
  >
    <path
      d="M21.5 3h-1.5v-1.5c0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5v1.5h-9v-1.5c0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5v1.5h-1.5c-1.375 0-2.5 1.125-2.5 2.5v20c0 1.375 1.125 2.5 2.5 2.5h19c1.375 0 2.5-1.125 2.5-2.5v-20c0-1.375-1.125-2.5-2.5-2.5zm-19 3h19v17h-19v-17zm15 4c0-.552-.448-1-1-1s-1 .448-1 1v1h-1c-.552 0-1 .448-1 1s.448 1 1 1h1v1c0 .552.448 1 1 1s1-.448 1-1v-1h1c.552 0 1-.448 1-1s-.448-1-1-1h-1v-1z"
      fill="currentColor"
    />
  </svg>
</template>

<script setup lang="ts">
interface Props {
  width?: number | string
  height?: number | string
}

withDefaults(defineProps<Props>(), {
  width: 16,
  height: 16
})
</script>