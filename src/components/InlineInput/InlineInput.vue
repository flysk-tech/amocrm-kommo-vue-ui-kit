<template>
  <div :class="styles.wrapper" :style="theme">
    <div
      :class="[
        styles.input_container,
        {
          [styles.disabled]: isDisabled
        }
      ]"
    >
      <BaseInput
        v-bind="inputAttrs"
        ref="inputRef"
        :class="{ [styles.has_after]: Boolean(after) }"
        :is-disabled="isDisabled"
        :is-readonly="isReadonly"
        :is-placeholder-visible-on-focus="isPlaceholderVisibleOnFocus"
        @input="handleInput"
      />
    </div>
    <div v-if="after" :class="styles.after_container">
      <div :class="styles.after">{{ after }}</div>
    </div>
    <div v-if="isInvalid" :class="styles.invalid_description_container">
      <Text size="m" :theme="InlineInputInvalidTextTheme" :class="styles.invalid_description">
        {{ invalidDescription }}
      </Text>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ inheritAttrs: false })

import { computed, ref, useAttrs } from 'vue'
import BaseInput from '@/components/BaseInput/BaseInput.vue'
import Text from '@/components/Text/Text.vue'
import type { InlineInputProps } from './InlineInput.types'
import { InlineInputInvalidTextTheme } from './InlineInput.themes'
import styles from './InlineInput.module.scss'

type Props = InlineInputProps & {
  modelValue?: string | number | null
}

interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'input', event: Event): void
}

const props = withDefaults(defineProps<Props>(), {
  isInvalid: false,
  isDisabled: false,
  isReadonly: false,
  isPlaceholderVisibleOnFocus: false,
  modelValue: undefined,
})

const emit = defineEmits<Emits>()

const attrs = useAttrs()
const inputAttrs = computed(() => {
  const { class: _, style: __, ...rest } = attrs
  if (props.modelValue !== undefined) {
    return { ...rest, value: props.modelValue }
  }
  return rest
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
  emit('input', event)
}

const inputRef = ref<InstanceType<typeof BaseInput> | null>(null)

defineExpose({
  inputRef,
})
</script>
