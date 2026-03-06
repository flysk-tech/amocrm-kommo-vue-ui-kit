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
import { useCheckboxGroupContext } from '../../CheckboxGroup.context'
import { provideCheckboxItemRootContext, DISPLAY_NAME } from './ItemRoot.context'
import type { ItemRootProps } from './ItemRoot.types'
import styles from './ItemRoot.module.scss'

const props = defineProps<ItemRootProps>()

const { isDisabled: groupIsDisabled, register } =
  useCheckboxGroupContext(DISPLAY_NAME)

const contextValue = computed(() => {
  const { theme, className, ...checkboxProps } = props
  return {
    ...register(props.name, checkboxProps),
    value: props.value,
  }
})

provideCheckboxItemRootContext(contextValue.value)
</script>
