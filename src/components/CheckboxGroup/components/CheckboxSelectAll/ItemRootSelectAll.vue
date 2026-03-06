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
import {
  provideCheckboxItemRootSelectAllContext,
  DISPLAY_NAME,
} from './ItemRootSelectAll.context'
import type { ItemRootSelectAllProps } from './ItemRootSelectAll.types'
import styles from '../ItemRoot/ItemRoot.module.scss'

const props = defineProps<ItemRootSelectAllProps>()

const { isDisabled: groupIsDisabled, register } =
  useCheckboxGroupContext(DISPLAY_NAME)

const contextValue = computed(() => {
  const { theme, className, ...rest } = props
  return {
    ...register('selectAll'),
    ...rest,
  }
})

provideCheckboxItemRootSelectAllContext(contextValue.value)
</script>
