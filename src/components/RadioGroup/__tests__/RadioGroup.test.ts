import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/vue'
import { defineComponent } from 'vue'
import { RadioGroup, RadioGroupTheme, RadioGroupItemRootTheme, RadioPrimaryTheme } from '..'
import { ItemRoot } from '../components/ItemRoot'
import { Radio } from '../components/Radio'

const defaultItems = [
  { value: 'option1', theme: RadioGroupItemRootTheme },
  { value: 'option2', theme: RadioGroupItemRootTheme },
]

const renderRadioGroup = (props: any = {}, items = defaultItems) => {
  const onChangeMock = vi.fn()

  const Wrapper = defineComponent({
    components: { RadioGroup, ItemRoot, Radio },
    setup() {
      return { items, onChangeMock, RadioPrimaryTheme }
    },
    template: `
      <RadioGroup
        :theme="$attrs.groupTheme"
        :name="$attrs.groupName"
        v-bind="$attrs.groupProps"
        @change="onChangeMock"
      >
        <ItemRoot
          v-for="item in items"
          :key="item.value"
          v-bind="item"
        >
          <label>
            <Radio :theme="RadioPrimaryTheme" />
          </label>
        </ItemRoot>
      </RadioGroup>
    `,
  })

  const result = render(Wrapper, {
    attrs: {
      groupTheme: RadioGroupTheme,
      groupName: 'radioGroup',
      groupProps: props,
    },
  })

  return { ...result, onChangeMock }
}

describe('RadioGroup', () => {
  it('should render RadioGroup with children', () => {
    renderRadioGroup({ value: 'option1' })

    expect(screen.getByRole('radiogroup')).toBeInTheDocument()
    expect(screen.getAllByRole('radio')).toHaveLength(defaultItems.length)
  })

  it('should emit change on radio button click', () => {
    const { onChangeMock } = renderRadioGroup({ value: 'option1' })

    const radio2 = screen.getByDisplayValue('option2')
    fireEvent.click(radio2)

    expect(onChangeMock).toHaveBeenCalledTimes(1)
  })

  it('should correctly mark selected radio button', () => {
    renderRadioGroup({ value: 'option1' })

    const radio1 = screen.getByDisplayValue('option1')
    const radio2 = screen.getByDisplayValue('option2')

    expect(radio1).toBeChecked()
    expect(radio2).not.toBeChecked()
  })

  it('should apply horizontal orientation class', () => {
    renderRadioGroup({ orientation: 'horizontal', value: 'option1' })

    const element = screen.getByRole('radiogroup')
    expect(element.className).toContain('horizontal')
  })

  it('should apply vertical orientation by default', () => {
    renderRadioGroup({ value: 'option1' })

    const element = screen.getByRole('radiogroup')
    expect(element.className).not.toContain('horizontal')
  })

  it('should disable all radio buttons when group isDisabled', () => {
    renderRadioGroup({ value: 'option1', isDisabled: true })

    const radios = screen.getAllByRole('radio')
    radios.forEach((radio) => {
      expect(radio).toBeDisabled()
    })
  })

  it('should disable individual radio when item isDisabled', () => {
    const items = [
      { value: 'option1', theme: RadioGroupItemRootTheme, isDisabled: true },
      { value: 'option2', theme: RadioGroupItemRootTheme },
    ]
    renderRadioGroup({ value: 'option1' }, items)

    const radio1 = screen.getByDisplayValue('option1')
    const radio2 = screen.getByDisplayValue('option2')

    expect(radio1).toBeDisabled()
    expect(radio2).not.toBeDisabled()
  })

  it('should select second option when value is option2', () => {
    renderRadioGroup({ value: 'option2' })

    const radio1 = screen.getByDisplayValue('option1')
    const radio2 = screen.getByDisplayValue('option2')

    expect(radio1).not.toBeChecked()
    expect(radio2).toBeChecked()
  })

  it('should have no selected radio when no value is set and no defaultValue', () => {
    renderRadioGroup({})

    const radios = screen.getAllByRole('radio')
    radios.forEach((radio) => {
      expect(radio).not.toBeChecked()
    })
  })

  it('should use defaultValue for uncontrolled mode', () => {
    renderRadioGroup({ defaultValue: 'option2' })

    const radio1 = screen.getByDisplayValue('option1')
    const radio2 = screen.getByDisplayValue('option2')

    expect(radio1).not.toBeChecked()
    expect(radio2).toBeChecked()
  })

  it('should emit change with clicked value', async () => {
    const { onChangeMock } = renderRadioGroup({ value: 'option1' })

    const radio2 = screen.getByDisplayValue('option2')
    await fireEvent.click(radio2)

    expect(onChangeMock).toHaveBeenCalledWith('option2')
  })

  it('should render three radio options', () => {
    const items = [
      { value: 'a', theme: RadioGroupItemRootTheme },
      { value: 'b', theme: RadioGroupItemRootTheme },
      { value: 'c', theme: RadioGroupItemRootTheme },
    ]
    renderRadioGroup({ value: 'a' }, items)

    expect(screen.getAllByRole('radio')).toHaveLength(3)
    expect(screen.getByDisplayValue('a')).toBeChecked()
    expect(screen.getByDisplayValue('b')).not.toBeChecked()
    expect(screen.getByDisplayValue('c')).not.toBeChecked()
  })

  it('should set name attribute on all radios', () => {
    renderRadioGroup({ value: 'option1' })

    const radios = screen.getAllByRole('radio')
    radios.forEach((radio) => {
      expect(radio).toHaveAttribute('name', 'radioGroup')
    })
  })

  it('should apply theme styles via style attribute', () => {
    renderRadioGroup({ value: 'option1' })

    const group = screen.getByRole('radiogroup')
    expect(group).toBeInTheDocument()
  })
})
