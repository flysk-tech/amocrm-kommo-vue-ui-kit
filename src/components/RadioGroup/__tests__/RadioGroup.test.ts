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
})
