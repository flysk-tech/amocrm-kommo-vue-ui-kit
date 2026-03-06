import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/vue'
import { defineComponent } from 'vue'
import { CheckboxGroup, CheckboxGroupTheme, CheckboxGroupItemRootTheme } from '..'
import { ItemRoot } from '../components/ItemRoot'
import { Checkbox } from '../components/Checkbox'
import { CheckboxSelectAll, ItemRootSelectAll } from '../components/CheckboxSelectAll'
import { CheckboxLightTheme } from '@/components/Checkbox/Checkbox.themes'

const defaultItems = [
  { theme: CheckboxGroupItemRootTheme, name: 'option1', value: 'option1' },
  { theme: CheckboxGroupItemRootTheme, name: 'option2', value: 'option2' },
]

const renderCheckboxGroup = (props: any = {}, items = defaultItems) => {
  const onChangeMock = vi.fn()

  const Wrapper = defineComponent({
    components: { CheckboxGroup, ItemRoot, Checkbox, CheckboxSelectAll, ItemRootSelectAll },
    setup() {
      return { items, onChangeMock, CheckboxLightTheme, CheckboxGroupItemRootTheme }
    },
    template: `
      <CheckboxGroup
        :theme="$attrs.groupTheme"
        data-testid="checkbox-group"
        v-bind="$attrs.groupProps"
        @change="onChangeMock"
      >
        <ItemRootSelectAll :theme="CheckboxGroupItemRootTheme">
          <label data-testid="checkbox-select-all">
            <CheckboxSelectAll data-testid="select-all" :theme="CheckboxLightTheme" />
          </label>
        </ItemRootSelectAll>

        <ItemRoot
          v-for="item in items"
          :key="item.name"
          v-bind="item"
        >
          <label data-testid="checkbox-item">
            <Checkbox :data-testid="item.name" :theme="CheckboxLightTheme" />
          </label>
        </ItemRoot>
      </CheckboxGroup>
    `,
  })

  const result = render(Wrapper, {
    attrs: {
      groupTheme: CheckboxGroupTheme,
      groupProps: props,
    },
  })

  return { ...result, onChangeMock }
}

describe('CheckboxGroup', () => {
  it('should render CheckboxGroup with children', () => {
    renderCheckboxGroup()

    expect(screen.getByTestId('checkbox-group')).toBeInTheDocument()
    expect(screen.getAllByTestId('checkbox-item')).toHaveLength(defaultItems.length)
  })

  it('should emit change on checkbox click', () => {
    const { onChangeMock } = renderCheckboxGroup()

    const checkbox2 = screen.getByTestId('option2')
    fireEvent.click(checkbox2)

    expect(onChangeMock).toHaveBeenCalledTimes(1)
  })

  it('should apply global disabled to all checkboxes', () => {
    renderCheckboxGroup({ isDisabled: true })

    const checkbox1 = screen.getByTestId('option1')
    const checkbox2 = screen.getByTestId('option2')

    expect(checkbox1).toBeDisabled()
    expect(checkbox2).toBeDisabled()
  })
})
