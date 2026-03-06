import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/vue'
import { defineComponent } from 'vue'
import Select from '../Select.vue'
import { SelectRootTheme } from '../Select.themes'
import type { SelectItem } from '../Select.types'

const defaultItems: SelectItem[] = [
  { value: 'Option 1', option: 'Option 1' },
  { value: 'Option 2', option: 'Option 2' },
  { value: 'Option 3', option: 'Option 3' },
]

const renderSelect = (props: any = {}) => {
  const onChangeMock = vi.fn()

  const result = render(Select, {
    props: {
      theme: SelectRootTheme,
      ...props,
    },
    attrs: {
      'data-testid': 'select-root',
    },
    slots: {
      default: 'Select content',
    },
  })

  return { ...result, onChangeMock }
}

describe('Select', () => {
  it('should render the Select root component', () => {
    renderSelect()

    expect(screen.getByTestId('select-root')).toBeInTheDocument()
  })

  it('should render slot content', () => {
    renderSelect()

    expect(screen.getByText('Select content')).toBeInTheDocument()
  })

  it('should apply theme CSS variables', () => {
    renderSelect()

    const element = screen.getByTestId('select-root')
    expect(element.getAttribute('style')).toContain('--crm-ui-kit')
  })
})
