<template>
  <ComponentPlayground :appearance="appearance" :prop-sets="propSets">
    <template #default="{ props: itemProps }">
      <div style="margin: 0 20px">
        <Accordion v-bind="itemProps" :theme="AccordionTheme">
          <AccordionItem
            v-for="item in items"
            :key="item.value"
            :value="item.value"
            :title="item.title"
            :theme="item.theme"
          >
            <Text :theme="TextPrimaryTheme" size="l">
              {{ item.children }}
            </Text>
          </AccordionItem>
        </Accordion>
      </div>
    </template>
  </ComponentPlayground>
</template>

<script setup lang="ts">
import ComponentPlayground from '@/tests/e2e/ComponentPlayground.vue'
import { Text, TextPrimaryTheme } from '@/components/Text'
import { Accordion, AccordionTheme, AccordionItemTheme } from '../index'
import type { Appearance } from '@/lib/appearance'

const AccordionItem = Accordion.Item

interface Props {
  appearance: Appearance
}

defineProps<Props>()

const items = [
  {
    value: '1',
    title: 'Item 1',
    children:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Id asperiores voluptatum delectus, itaque soluta distinctio eos iure incidunt quod est cumque tenetur aut aspernatur excepturi ipsam pariatur perferendis libero? Facere reiciendis cumque numquam aperiam architecto sed non voluptate molestias distinctio exercitationem est voluptatem debitis, ducimus similique ipsum quibusdam error placeat.',
    theme: AccordionItemTheme,
  },
  {
    value: '2',
    title: 'Item 2',
    children:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Id asperiores voluptatum delectus, itaque soluta distinctio eos iure incidunt quod est cumque tenetur aut aspernatur excepturi ipsam pariatur perferendis libero? Facere reiciendis cumque numquam aperiam architecto sed non voluptate molestias distinctio exercitationem est voluptatem debitis, ducimus similique ipsum quibusdam error placeat.',
    theme: AccordionItemTheme,
  },
  {
    value: '3',
    title: 'Item 3',
    children:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Id asperiores voluptatum delectus, itaque soluta distinctio eos iure incidunt quod est cumque tenetur aut aspernatur excepturi ipsam pariatur perferendis libero? Facere reiciendis cumque numquam aperiam architecto sed non voluptate molestias distinctio exercitationem est voluptatem debitis, ducimus similique ipsum quibusdam error placeat.',
    theme: AccordionItemTheme,
  },
]

const propSets = [
  {
    type: ['single'],
    defaultValue: [items[0].value],
  },
  {
    type: ['multiple'],
    defaultValue: [[items[0].value, items[1].value]],
  },
  {
    type: ['multiple'],
    defaultValue: [[]],
    isCollapsible: [true],
  },
]
</script>
