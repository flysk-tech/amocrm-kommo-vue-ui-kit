<template>
  <div
    :class="[
      styles.item_root,
      className,
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
import { useFilterTabsContext } from '../../FilterTabs.context'
import { provideTabItemRootResetContext, DISPLAY_NAME } from './ItemRootReset.context'
import type { ItemRootResetProps } from './ItemRootReset.types'
import styles from '../ItemRoot/ItemRoot.module.scss'

const props = defineProps<ItemRootResetProps>()

const { isDisabled: groupIsDisabled } = useFilterTabsContext(DISPLAY_NAME)

const contextValue = computed(() => {
  const { theme, className, ...rest } = props
  return rest
})

provideTabItemRootResetContext(contextValue.value)
</script>
