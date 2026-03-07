<template>
  <div
    :class="[
      styles.item_root,
      props.class,
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
import { computed, onMounted } from 'vue'
import { useFilterTabsContext } from '../../FilterTabs.context'
import { provideTabItemRootContext, DISPLAY_NAME } from './ItemRoot.context'
import type { ItemRootProps } from './ItemRoot.types'
import styles from './ItemRoot.module.scss'

const props = defineProps<ItemRootProps>()

const filterTabsContext = useFilterTabsContext(DISPLAY_NAME)
const groupIsDisabled = computed(() => filterTabsContext.isDisabled)
const { registerActiveName } = filterTabsContext

onMounted(() => {
  if (props.isDefaultActive && props.name) {
    registerActiveName(props.name)
  }
})

const contextValue = computed(() => {
  const { theme, class: _class, isDefaultActive, ...rest } = props
  return rest
})

provideTabItemRootContext(contextValue.value)
</script>
