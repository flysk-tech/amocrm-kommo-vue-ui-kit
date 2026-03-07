<template>
  <slot v-if="$slots.default" />
  <template v-else>
    <Option ref="optionRef" :class="props.class">
      {{ shouldShowPlaceholder ? placeholder : selectContext.value?.option }}
    </Option>
  </template>

  <VisuallyHiddenInput :name="name" type="hidden" :value="selectContext.value?.value" />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import VisuallyHiddenInput from '@/components/VisuallyHiddenInput/VisuallyHiddenInput.vue'
import { useSelectContext } from '../../Select.context'
import Option from '../Option/Option.vue'

const DISPLAY_NAME = 'Select.Value'

const props = withDefaults(defineProps<{
  placeholder?: string
  class?: string
  name?: string
}>(), {
  placeholder: '',
  class: '',
})

const selectContext = useSelectContext(DISPLAY_NAME)

const shouldShowPlaceholder = computed(() => !selectContext.value)

const optionRef = ref<InstanceType<typeof Option> | null>(null)

defineExpose({
  optionRef,
})
</script>
