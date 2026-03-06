<template>
  <div
    v-bind="$attrs"
    ref="itemRef"
    :class="[
      styles.wrapper,
      {
        [styles.active]: isActive
      },
      themeClassName,
      className
    ]"
  >
    <div :class="styles.header" @click="handleClick">
      <div :class="styles.header_left">
        <div v-if="before" :class="styles.before_title">
          <component :is="before" />
        </div>

        <Text :theme="TextPrimaryTheme" size="xl" :isEllipsis="true">
          {{ title }}
        </Text>
      </div>

      <span :class="styles.chevron_container">
        <ChevronDownIcon :class="styles.chevron_icon" />
      </span>
    </div>

    <div :class="styles.content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, unref } from 'vue'
import ChevronDownIcon from '@/icons/chevronDown.svg'
import Text from '@/components/Text/Text.vue'
import { TextPrimaryTheme } from '@/components/Text/Text.themes'
import { useAccordionContext } from '../../Accordion.context'
import { useThemeClassName } from '@/composables/useThemeClassName'
import type { ItemProps } from './Item.types'
import type { AccordionItemThemeType } from './Item.themes'
import styles from './Item.module.scss'

const DISPLAY_NAME = 'Accordion.Item'

type Props = ItemProps & {
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  className: '',
  before: null,
})

const itemRef = ref<HTMLDivElement | null>(null)

const { onChange, value: currentValue } = useAccordionContext(DISPLAY_NAME)

const themeClassName = useThemeClassName<AccordionItemThemeType>(props.theme)

const handleClick = () => {
  onChange(props.value)
}

const isActive = computed(() => {
  const val = unref(currentValue)
  if (Array.isArray(val)) {
    return val.includes(props.value)
  }
  return val === props.value
})

defineExpose({
  itemRef,
})
</script>
