import type { Meta, StoryObj } from '@storybook/vue3'
import { h } from 'vue'

import { Accordion, AccordionTheme, AccordionItemTheme } from '../index'
import { Text, TextPrimaryTheme } from '@/components/Text'

import SpinnerIcon from '@/icons/spinner.svg'
import SettingsIcon from '@/icons/settings.svg'
import CalendarIcon from '@/icons/calendar.svg'

const items = [
  {
    value: '1',
    title: 'Item 1',
    children: h(Text, { theme: TextPrimaryTheme, size: 'l' }, () =>
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Id asperiores voluptatum delectus, itaque soluta distinctio eos iure incidunt quod est cumque tenetur aut aspernatur excepturi ipsam pariatur perferendis libero? Facere reiciendis cumque numquam aperiam architecto sed non voluptate molestias distinctio exercitationem est voluptatem debitis, ducimus similique ipsum quibusdam error placeat.'
    ),
    before: h(SpinnerIcon, { style: { width: '20px', height: '20px' } }),
    theme: AccordionItemTheme,
  },
  {
    value: '2',
    title: 'Item 2',
    children: h(Text, { theme: TextPrimaryTheme, size: 'l' }, () =>
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Id asperiores voluptatum delectus, itaque soluta distinctio eos iure incidunt quod est cumque tenetur aut aspernatur excepturi ipsam pariatur perferendis libero? Facere reiciendis cumque numquam aperiam architecto sed non voluptate molestias distinctio exercitationem est voluptatem debitis, ducimus similique ipsum quibusdam error placeat.'
    ),
    before: h(SettingsIcon, { style: { width: '20px', height: '20px' } }),
    theme: AccordionItemTheme,
  },
  {
    value: '3',
    title: 'Item 3',
    children: h(Text, { theme: TextPrimaryTheme, size: 'l' }, () =>
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Id asperiores voluptatum delectus, itaque soluta distinctio eos iure incidunt quod est cumque tenetur aut aspernatur excepturi ipsam pariatur perferendis libero? Facere reiciendis cumque numquam aperiam architecto sed non voluptate molestias distinctio exercitationem est voluptatem debitis, ducimus similique ipsum quibusdam error placeat.'
    ),
    before: h(CalendarIcon, { style: { width: '20px', height: '20px' } }),
    theme: AccordionItemTheme,
  },
]

const USAGE = `<script setup>
import { Text, TextPrimaryTheme } from '@flysk-tech/amocrm-kommo-vue-ui-kit'
import { Accordion, AccordionItemTheme, AccordionTheme } from '@flysk-tech/amocrm-kommo-vue-ui-kit'

const items = [
  {
    value: '1',
    title: 'Item 1',
    children: 'Lorem ipsum dolor sit amet consectetur adipisicing elit...',
  },
  {
    value: '2',
    title: 'Item 2',
    children: 'Lorem ipsum dolor sit amet consectetur adipisicing elit...',
  },
  {
    value: '3',
    title: 'Item 3',
    children: 'Lorem ipsum dolor sit amet consectetur adipisicing elit...',
  },
]
</script>

<template>
  <Accordion
    :theme="AccordionTheme"
    :default-value="items[0].value"
    type="single"
  >
    <Accordion.Item
      v-for="item in items"
      :key="item.value"
      :value="item.value"
      :title="item.title"
      :theme="AccordionItemTheme"
    >
      <Text :theme="TextPrimaryTheme" size="l">
        {{ item.children }}
      </Text>
    </Accordion.Item>
  </Accordion>
</template>
`

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        code: USAGE,
        language: 'html',
        type: 'code',
      },
    },
  },
  argTypes: {
    type: {
      control: { type: 'radio' },
      options: ['single', 'multiple'],
    },
  },
  args: {
    theme: AccordionTheme,
    defaultValue: items[0].value,
  },
  render: (args) => ({
    components: { Accordion, AccordionItem: Accordion.Item },
    setup() {
      return { args, items }
    },
    template: `
      <Accordion v-bind="args">
        <AccordionItem
          v-for="item in items"
          :key="item.value"
          :value="item.value"
          :title="item.title"
          :theme="item.theme"
          :before="item.before"
        >
          <component :is="item.children" />
        </AccordionItem>
      </Accordion>
    `,
  }),
} satisfies Meta<typeof Accordion>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    type: 'single',
  },
}
