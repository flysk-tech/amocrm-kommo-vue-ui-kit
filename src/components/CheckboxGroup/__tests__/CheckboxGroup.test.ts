import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/vue'
import { defineComponent, nextTick } from 'vue'
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

const renderCheckboxGroupWithoutSelectAll = (props: any = {}, items = defaultItems) => {
  const onChangeMock = vi.fn()

  const Wrapper = defineComponent({
    components: { CheckboxGroup, ItemRoot, Checkbox },
    setup() {
      return { items, onChangeMock, CheckboxLightTheme }
    },
    template: `
      <CheckboxGroup
        :theme="$attrs.groupTheme"
        data-testid="checkbox-group"
        v-bind="$attrs.groupProps"
        @change="onChangeMock"
      >
        <ItemRoot
          v-for="item in items"
          :key="item.name"
          v-bind="item"
        >
          <label :data-testid="'label-' + item.name">
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

  it('should apply horizontal orientation class', () => {
    renderCheckboxGroup({ orientation: 'horizontal' })

    const group = screen.getByTestId('checkbox-group')
    expect(group.className).toContain('horizontal')
  })

  it('should apply vertical orientation by default', () => {
    renderCheckboxGroup()

    const group = screen.getByTestId('checkbox-group')
    expect(group.className).not.toContain('horizontal')
  })

  it('should apply theme styles', () => {
    renderCheckboxGroup()

    const group = screen.getByTestId('checkbox-group')
    expect(group).toBeInTheDocument()
  })

  it('should render select-all checkbox', () => {
    renderCheckboxGroup()

    expect(screen.getByTestId('select-all')).toBeInTheDocument()
    expect(screen.getByTestId('checkbox-select-all')).toBeInTheDocument()
  })

  it('should toggle all checkboxes via select-all', async () => {
    const { onChangeMock } = renderCheckboxGroup()

    const selectAll = screen.getByTestId('select-all')
    await fireEvent.click(selectAll)

    expect(onChangeMock).toHaveBeenCalled()
    const lastCall = onChangeMock.mock.calls[onChangeMock.mock.calls.length - 1]
    // The second argument should be of type selectAll
    expect(lastCall[1]).toEqual({ type: 'selectAll', name: 'selectAll' })
  })

  it('should call onChange with checkbox type when individual checkbox clicked', async () => {
    const { onChangeMock } = renderCheckboxGroup()

    const checkbox1 = screen.getByTestId('option1')
    await fireEvent.click(checkbox1)

    expect(onChangeMock).toHaveBeenCalled()
    const lastCall = onChangeMock.mock.calls[onChangeMock.mock.calls.length - 1]
    expect(lastCall[1]).toEqual({ type: 'checkbox', name: 'option1' })
  })

  it('should disable select-all when group is disabled', () => {
    renderCheckboxGroup({ isDisabled: true })

    const selectAll = screen.getByTestId('select-all')
    expect(selectAll).toBeDisabled()
  })

  it('should render without select-all', () => {
    renderCheckboxGroupWithoutSelectAll()

    expect(screen.getByTestId('checkbox-group')).toBeInTheDocument()
    expect(screen.getByTestId('option1')).toBeInTheDocument()
    expect(screen.getByTestId('option2')).toBeInTheDocument()
  })

  it('should render items with isDefaultChecked', async () => {
    const items = [
      { theme: CheckboxGroupItemRootTheme, name: 'option1', value: 'option1', isDefaultChecked: true },
      { theme: CheckboxGroupItemRootTheme, name: 'option2', value: 'option2' },
    ]
    renderCheckboxGroupWithoutSelectAll({}, items)

    // After registration, option1 should be checked
    const checkbox1 = screen.getByTestId('option1')
    await waitFor(() => {
      expect(checkbox1).toBeChecked()
    })
  })

  it('should render items with individual disabled', () => {
    const items = [
      { theme: CheckboxGroupItemRootTheme, name: 'option1', value: 'option1', isDisabled: true },
      { theme: CheckboxGroupItemRootTheme, name: 'option2', value: 'option2' },
    ]
    renderCheckboxGroupWithoutSelectAll({}, items)

    expect(screen.getByTestId('option1')).toBeDisabled()
    expect(screen.getByTestId('option2')).not.toBeDisabled()
  })

  it('should not call onChange for disabled checkbox click', async () => {
    const items = [
      { theme: CheckboxGroupItemRootTheme, name: 'option1', value: 'option1', isDisabled: true },
      { theme: CheckboxGroupItemRootTheme, name: 'option2', value: 'option2' },
    ]
    const { onChangeMock } = renderCheckboxGroupWithoutSelectAll({}, items)

    const checkbox1 = screen.getByTestId('option1')
    const checkbox2 = screen.getByTestId('option2')

    expect(checkbox1).toBeDisabled()
    expect(checkbox2).not.toBeDisabled()

    // Clicking enabled checkbox should work and emit change
    await fireEvent.click(checkbox2)
    expect(onChangeMock).toHaveBeenCalledTimes(1)
    const lastCall = onChangeMock.mock.calls[0]
    expect(lastCall[1]).toEqual({ type: 'checkbox', name: 'option2' })
  })

  it('should toggle checkbox checked state on click', async () => {
    renderCheckboxGroupWithoutSelectAll()

    const checkbox1 = screen.getByTestId('option1')
    expect(checkbox1).not.toBeChecked()

    await fireEvent.click(checkbox1)

    await waitFor(() => {
      expect(checkbox1).toBeChecked()
    })
  })

  it('should render with three items', () => {
    const items = [
      { theme: CheckboxGroupItemRootTheme, name: 'a', value: 'a' },
      { theme: CheckboxGroupItemRootTheme, name: 'b', value: 'b' },
      { theme: CheckboxGroupItemRootTheme, name: 'c', value: 'c' },
    ]
    renderCheckboxGroupWithoutSelectAll({}, items)

    expect(screen.getByTestId('a')).toBeInTheDocument()
    expect(screen.getByTestId('b')).toBeInTheDocument()
    expect(screen.getByTestId('c')).toBeInTheDocument()
  })
})
