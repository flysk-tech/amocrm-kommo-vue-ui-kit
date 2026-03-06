# @flysk-tech/amocrm-kommo-vue-ui-kit

> Vue 3 port of [@kommo-crm/crm-react-ui-kit](https://www.npmjs.com/package/@kommo-crm/crm-react-ui-kit) — ready-to-use UI components implementing amoCRM/Kommo design system.

[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![Vue 3](https://img.shields.io/badge/Vue-3-4FC08D?logo=vue.js)](https://vuejs.org/)

## Features

- **Vue 3 + Composition API** with `<script setup>`
- **TypeScript** — full type coverage
- **23 components** ported from React with Vue-native API
- **Dark/light theme** via CSS custom properties
- **Tree-shaking** — import only what you need
- **CSS Modules** with SCSS

## Installation

```bash
npm install @flysk-tech/amocrm-kommo-vue-ui-kit
# or
yarn add @flysk-tech/amocrm-kommo-vue-ui-kit
```

## Usage

```vue
<template>
  <Button :theme="ButtonPrimaryTheme" @click="handleClick">
    Click me
  </Button>
</template>

<script setup lang="ts">
import { Button, ButtonPrimaryTheme } from '@flysk-tech/amocrm-kommo-vue-ui-kit'

const handleClick = () => {
  console.log('clicked')
}
</script>
```

### v-model support

```vue
<template>
  <Input
    v-model="text"
    :theme="InputLightTheme"
    placeholder="Type here..."
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Input, InputLightTheme } from '@flysk-tech/amocrm-kommo-vue-ui-kit'

const text = ref('')
</script>
```

### Dark/light theme

```vue
<script setup lang="ts">
import { ConfigProvider, Appearance } from '@flysk-tech/amocrm-kommo-vue-ui-kit'
</script>

<template>
  <ConfigProvider :appearance="Appearance.ALTERNATIVE">
    <!-- All components inside will use dark theme -->
  </ConfigProvider>
</template>
```

## Components

### Forms
- **Button** — buttons with loading, disabled, success states
- **Input** — text input with v-model, error states, after slot
- **InlineInput** — inline text input
- **TextArea** — multiline input with autosize
- **BaseInput** — base input primitive
- **Select** — dropdown select
- **SelectButton** — select trigger button
- **Checkbox** / **CheckboxGroup** — checkboxes with select-all
- **RadioGroup** — radio buttons
- **Switcher** — toggle switch

### Display
- **Text** — typography
- **Label** / **LabelGroup** — form labels
- **Link** — anchor links
- **Spinner** — loading indicator

### Layout
- **ContentBlock** — content container
- **Callout** — info/warning/error/success callouts
- **Accordion** — collapsible panels (single/multiple)
- **List** — keyboard-navigable list
- **Portal** — teleport content to another DOM node
- **FilterTabs** — filter tab groups
- **ConfigProvider** — theme appearance provider
- **VisuallyHiddenInput** — accessible hidden input

## Development

```bash
yarn install       # Install dependencies
yarn dev           # Dev server
yarn build         # Build library
yarn test          # Run unit tests
yarn storybook     # Storybook dev server
yarn build-storybook  # Build Storybook
```

## Migration from React

```tsx
// React
import { Button } from '@kommo-crm/crm-react-ui-kit'
<Button className="custom" isLoading={true} onClick={handleClick}>Click</Button>

// Vue
import { Button } from '@flysk-tech/amocrm-kommo-vue-ui-kit'
<Button class="custom" :isLoading="true" @click="handleClick">Click</Button>
```

Key differences:
- `className` → standard `class` attribute
- `onClick` → `@click` event
- `value` + `onChange` → `v-model`
- `children` → default `<slot />`

## License

MIT © Flysk LLC
