<template>
  <button
    ref="buttonRef"
    v-bind="restProps"
    :class="[
      styles.button,
      {
        [styles.selected]: isSelected
      },
      className
    ]"
    :style="theme"
    :disabled="isDisabled || isItemRootDisabled"
    @click="handleChange"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useFilterTabsContext } from '../../FilterTabs.context'
import { useTabItemRootResetContext } from './ItemRootReset.context'
import type { TabProps } from '../Tab/Tab.types'
import styles from '../Tab/Tab.module.scss'

const DISPLAY_NAME = 'FilterTabs.TabReset'

type Props = TabProps & {
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  className: '',
})

const { theme, className, ...restProps } = props

const buttonRef = ref<HTMLButtonElement | null>(null)

const { values, isDisabled, onChange } = useFilterTabsContext(DISPLAY_NAME)

const { isDisabled: isItemRootDisabled } = useTabItemRootResetContext(DISPLAY_NAME)

const isSelected = computed(() => !values.length)

const handleChange = () => {
  onChange()
}

defineExpose({
  buttonRef,
})
</script>
