<template>
  <div
    :class="[
      styles.item_root,
      {
        [styles.disabled]: groupIsDisabled || isDisabled
      }
    ]"
    :style="theme"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRadioGroupContext } from '../../RadioGroup.context'
import { provideRadioItemRootContext, DISPLAY_NAME } from './ItemRoot.context'
import type { ItemRootProps } from './ItemRoot.types'
import styles from './ItemRoot.module.scss'

const props = defineProps<ItemRootProps>()

const { isDisabled: groupIsDisabled } = useRadioGroupContext(DISPLAY_NAME)

// Provide context for Radio component
const contextValue = computed(() => {
  const { theme, ...rest } = props
  return rest
})

provideRadioItemRootContext(contextValue.value)
</script>
