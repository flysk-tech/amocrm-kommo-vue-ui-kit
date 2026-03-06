import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import TextArea from '../TextArea.vue'
import { TextareaLightTheme } from '../TextArea.themes'

const basePlaceholderText = 'TextArea'

const renderTextArea = (props: any = {}, attrs: any = {}) => {
  const handleMockFn = vi.fn()

  render(TextArea, {
    props: {
      theme: TextareaLightTheme,
      'onUpdate:modelValue': handleMockFn,
      ...props,
    },
    attrs: {
      placeholder: basePlaceholderText,
      ...attrs,
    },
  })

  return handleMockFn
}

describe('TextArea', () => {
  it('should not emit when disabled', async () => {
    const mockFn = renderTextArea({ isDisabled: true })

    const element = screen.getByPlaceholderText(basePlaceholderText)
    await userEvent.type(element, 'hello')

    expect(mockFn).not.toHaveBeenCalled()
    expect(element).toBeDisabled()
  })

  it('should emit on type', async () => {
    const mockFn = renderTextArea()

    const element = screen.getByPlaceholderText(basePlaceholderText)
    await userEvent.type(element, 'hello')

    expect(mockFn).toHaveBeenCalledTimes(5)
  })

  it('should update value on type', async () => {
    renderTextArea()
    const expectedValue = 'hello'

    const element = screen.getByPlaceholderText(basePlaceholderText) as HTMLTextAreaElement
    await userEvent.type(element, expectedValue)

    expect(element).toHaveValue(expectedValue)
  })

  it('should pass cols attribute', () => {
    renderTextArea({}, { cols: 3 })

    const element = screen.getByPlaceholderText(basePlaceholderText)
    expect(element).toHaveAttribute('cols', '3')
  })
})
