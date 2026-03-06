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
        v-bind="$attrs"
        ref="inputRef"
        :class="{ [styles.has_after]: Boolean(after) }"
        :isDisabled="isDisabled"
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

import { ref } from 'vue'
import BaseInput from '@/components/BaseInput/BaseInput.vue'
import Text from '@/components/Text/Text.vue'
import type { InlineInputProps } from './InlineInput.types'
import { InlineInputInvalidTextTheme } from './InlineInput.themes'
import styles from './InlineInput.module.scss'

type Props = InlineInputProps

const props = withDefaults(defineProps<Props>(), {
  isInvalid: false,
})

const inputRef = ref<InstanceType<typeof BaseInput> | null>(null)

defineExpose({
  inputRef,
})
</script>
