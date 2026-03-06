import type { Meta, StoryObj } from '@storybook/vue3'

import Spinner from '../Spinner.vue'
import { SpinnerTheme } from '../Spinner.themes'

const USAGE = `
<script setup lang="ts">
import Spinner from '@/components/Spinner/Spinner.vue'
import { SpinnerTheme } from '@/components/Spinner/Spinner.themes'
</script>

<template>
  <Spinner :theme="SpinnerTheme" />
</template>
`

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  decorators: [
    () => ({
      template: '<div style="display: flex; justify-content: center; align-items: center; min-height: 100px;"><story /></div>'
    })
  ],
  parameters: {
    docs: {
      source: {
        code: USAGE,
        language: 'vue',
      },
    },
  },
  args: {
    theme: SpinnerTheme,
  },
  argTypes: {
    theme: {
      control: 'object',
      description: 'Объект с CSS переменными темы'
    },
    isCentered: {
      control: 'boolean',
      description: 'Центрировать спиннер абсолютным позиционированием'
    },
  },
} satisfies Meta<typeof Spinner>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Centered: Story = {
  args: {
    isCentered: true,
  },
}
