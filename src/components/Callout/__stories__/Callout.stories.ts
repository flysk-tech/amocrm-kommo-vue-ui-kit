import type { Meta, StoryObj } from '@storybook/vue3'
import { CanvasCentered } from '@storybook-utils/constants'
import Callout from '../Callout.vue'
import Text from '@/components/Text/Text.vue'
import { TextPrimaryTheme } from '@/components/Text/Text.themes'
import {
  CalloutErrorTheme,
  CalloutInfoTheme,
  CalloutSuccessTheme,
  CalloutWarningTheme,
} from '../Callout.themes'

const themeMap = {
  CalloutErrorTheme,
  CalloutInfoTheme,
  CalloutSuccessTheme,
  CalloutWarningTheme,
}

const USAGE = `
import { Text, TextPrimaryTheme } from '@flysk-tech/amocrm-kommo-vue-ui-kit/Text'
import { Callout, CalloutErrorTheme } from '@flysk-tech/amocrm-kommo-vue-ui-kit/Callout'

<template>
  <Callout :theme="CalloutErrorTheme">
    <Text :theme="TextPrimaryTheme" size="l">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus ipsam
      ducimus inventore minima optio error unde incidunt atque. Minima,
      maxime?
    </Text>
  </Callout>
</template>
`

const meta = {
  title: 'Components/Callout',
  parameters: {
    ...CanvasCentered,
    docs: {
      source: {
        code: USAGE,
        language: 'html',
      },
    },
  },
  component: Callout,
  argTypes: {
    theme: {
      control: 'select',
      options: Object.keys(themeMap),
      mapping: themeMap,
    },
  },
  args: {
    theme: CalloutErrorTheme,
  },
  render: (args) => ({
    components: { Callout, Text },
    setup() {
      return { args, TextPrimaryTheme }
    },
    template: `
      <Callout v-bind="args">
        <Text :theme="TextPrimaryTheme" size="l">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus ipsam
          ducimus inventore minima optio error unde incidunt atque. Minima,
          maxime?
        </Text>
      </Callout>
    `,
  }),
} satisfies Meta<typeof Callout>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const CalloutError: Story = {
  tags: ['!dev'],
  args: { theme: CalloutErrorTheme },
}

export const CalloutInfo: Story = {
  tags: ['!dev'],
  args: { theme: CalloutInfoTheme },
}

export const CalloutSuccess: Story = {
  tags: ['!dev'],
  args: { theme: CalloutSuccessTheme },
}

export const CalloutWarning: Story = {
  tags: ['!dev'],
  args: { theme: CalloutWarningTheme },
}
