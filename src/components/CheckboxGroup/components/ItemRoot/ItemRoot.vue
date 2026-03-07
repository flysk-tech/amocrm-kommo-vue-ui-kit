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
import { computed } from 'vue'
import { useCheckboxGroupContext } from '../../CheckboxGroup.context'
import { provideCheckboxItemRootContext, DISPLAY_NAME } from './ItemRoot.context'
import type { ItemRootProps } from './ItemRoot.types'
import styles from './ItemRoot.module.scss'

const props = defineProps<ItemRootProps>()

const groupContext = useCheckboxGroupContext(DISPLAY_NAME)
const groupIsDisabled = computed(() => groupContext.isDisabled)

const contextValue = computed(() => {
  const { theme, class: _class, ...checkboxProps } = props
  return {
    ...groupContext.register(props.name, checkboxProps),
    value: props.value,
  }
})

provideCheckboxItemRootContext(contextValue.value)
</script>
