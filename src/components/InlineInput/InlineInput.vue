<template>
  <div :class="[styles.wrapper, className]" :style="theme">
    <div
      :class="[
        styles.input_container,
        {
          [styles.disabled]: isDisabled
        }
      ]"
    >
      <BaseInput
        v-bind="$attrs"
        ref="inputRef"
        :className="[
          {
            [styles.has_after]: Boolean(after)
          }
        ].filter(Boolean).join(' ')"
        :isDisabled="isDisabled"
      />
    </div>
    <div v-if="after" :class="styles.after_container">
      <div :class="styles.after">{{ after }}</div>
    </div>
    <div v-if="isInvalid" :class="styles.invalid_description_container">
      <Text size="m" :theme="InlineInputInvalidTextTheme" :className="styles.invalid_description">
        {{ invalidDescription }}
      </Text>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseInput from '@/components/BaseInput/BaseInput.vue'
import Text from '@/components/Text/Text.vue'
import type { InlineInputProps } from './InlineInput.types'
import { InlineInputInvalidTextTheme } from './InlineInput.themes'
import styles from './InlineInput.module.scss'

type Props = InlineInputProps & {
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  className: '',
  isInvalid: false,
})

const inputRef = ref<InstanceType<typeof BaseInput> | null>(null)

defineExpose({
  inputRef,
})
</script>
