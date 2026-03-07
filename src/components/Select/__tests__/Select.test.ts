import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/vue'
import { defineComponent, ref, nextTick } from 'vue'
import Select from '../Select.vue'
import SelectButtonComp from '../components/Button/Button.vue'
import SelectListComp from '../components/List/SelectList.vue'
import SelectItemComp from '../components/Item/Item.vue'
import SelectValueComp from '../components/Value/Value.vue'
import SelectArrowComp from '../components/Arrow/Arrow.vue'
import { SelectRootTheme } from '../Select.themes'
import { SelectArrowTheme } from '../components/Arrow'
import { SelectItemTheme } from '../components/Item'
import { SelectButtonLightTheme } from '@/components/SelectButton'
import { ListTheme as SelectListTheme } from '@/components/List'
import type { SelectItem } from '../Select.types'

const defaultItems: SelectItem[] = [
  { value: 'opt1', option: 'Option 1' },
  { value: 'opt2', option: 'Option 2' },
  { value: 'opt3', option: 'Option 3' },
]

const createSelectWrapper = (extraProps: Record<string, any> = {}) => {
  return defineComponent({
    components: {
      Select,
      SelectButtonComp,
      SelectListComp,
      SelectItemComp,
      SelectValueComp,
      SelectArrowComp,
    },
    setup() {
      const value = ref<SelectItem | undefined>(extraProps.value)
      const onChangeSpy = vi.fn((item: SelectItem) => {
        value.value = item
      })
      const onOpenChangeSpy = vi.fn()

      return {
        value,
        onChangeSpy,
        onOpenChangeSpy,
        items: defaultItems,
        SelectRootTheme,
        SelectArrowTheme,
        SelectItemTheme,
        SelectListTheme,
        SelectButtonLightTheme,
        extraProps,
      }
    },
    template: `
      <Select
        :theme="SelectRootTheme"
        :value="value"
        :isDisabled="extraProps.isDisabled"
        :isInvalid="extraProps.isInvalid"
        data-testid="select-root"
        @change="onChangeSpy"
        @openChange="onOpenChangeSpy"
      >
        <SelectButtonComp :theme="SelectButtonLightTheme" data-testid="select-button">
          <SelectValueComp :placeholder="extraProps.placeholder || 'Select...'" />
          <SelectArrowComp :theme="SelectArrowTheme" />
        </SelectButtonComp>

        <SelectListComp :theme="SelectListTheme">
          <SelectItemComp
            v-for="(item, index) in items"
            :key="item.value"
            :theme="SelectItemTheme"
            :item="item"
            :index="index"
            :data-testid="'item-' + item.value"
          />
        </SelectListComp>
      </Select>
    `,
  })
}

const renderSelect = (props: Record<string, any> = {}) => {
  const Wrapper = createSelectWrapper(props)
  return render(Wrapper)
}

describe('Select', () => {
  it('should render the Select root component', () => {
    renderSelect()
    expect(screen.getByTestId('select-root')).toBeInTheDocument()
  })

  it('should render the button with placeholder', () => {
    renderSelect({ placeholder: 'Pick one' })
    expect(screen.getByText('Pick one')).toBeInTheDocument()
  })

  it('should show selected value text', () => {
    renderSelect({ value: defaultItems[0] })
    expect(screen.getByText('Option 1')).toBeInTheDocument()
  })

  it('should open the list on button click', async () => {
    renderSelect()

    // List should not be visible initially
    expect(screen.queryByRole('list')).not.toBeInTheDocument()

    // Click button to open
    const button = screen.getByTestId('select-button')
    await fireEvent.click(button)
    await nextTick()
    await nextTick()

    // Now the list should be visible
    await waitFor(() => {
      expect(screen.getByRole('list')).toBeInTheDocument()
    })
  })

  it('should select an item on click', async () => {
    renderSelect()

    // Open the list
    await fireEvent.click(screen.getByTestId('select-button'))
    await nextTick()

    await waitFor(() => {
      expect(screen.getByTestId('item-opt2')).toBeInTheDocument()
    })

    // Click option 2
    await fireEvent.click(screen.getByTestId('item-opt2'))
    await nextTick()

    // Should show the selected option text
    await waitFor(() => {
      expect(screen.getByText('Option 2')).toBeInTheDocument()
    })
  })

  it('should not open when disabled', async () => {
    renderSelect({ isDisabled: true })

    const button = screen.getByTestId('select-button')
    await fireEvent.click(button)

    // List should not appear
    expect(screen.queryByTestId('item-opt1')).not.toBeInTheDocument()
  })

  it('should apply theme CSS variables', () => {
    renderSelect()

    const element = screen.getByTestId('select-root')
    expect(element.getAttribute('style')).toContain('--crm-ui-kit-select-z-index')
  })

  it('should render arrow with SVG icon', async () => {
    renderSelect()

    const svg = document.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })
})

describe('Select uncontrolled', () => {
  it('should work with defaultValue', () => {
    const Wrapper = defineComponent({
      components: {
        Select,
        SelectButtonComp,
        SelectListComp,
        SelectItemComp,
        SelectValueComp,
        SelectArrowComp,
      },
      setup() {
        return {
          items: defaultItems,
          defaultValue: defaultItems[1],
          SelectRootTheme,
          SelectArrowTheme,
          SelectItemTheme,
          SelectListTheme,
          SelectButtonLightTheme,
        }
      },
      template: `
        <Select :theme="SelectRootTheme" :defaultValue="defaultValue" data-testid="select-root">
          <SelectButtonComp :theme="SelectButtonLightTheme" data-testid="select-button">
            <SelectValueComp placeholder="Select..." />
            <SelectArrowComp :theme="SelectArrowTheme" />
          </SelectButtonComp>
          <SelectListComp :theme="SelectListTheme">
            <SelectItemComp
              v-for="(item, index) in items"
              :key="item.value"
              :theme="SelectItemTheme"
              :item="item"
              :index="index"
            />
          </SelectListComp>
        </Select>
      `,
    })

    render(Wrapper)
    expect(screen.getByText('Option 2')).toBeInTheDocument()
  })
})
