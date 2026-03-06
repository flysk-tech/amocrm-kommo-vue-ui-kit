import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import Input from '../Input.vue'
import { InputLightTheme } from '../Input.themes'

const basePlaceholderText = 'Input'

const renderInput = (props: any = {}) => {
  const handleMockFn = vi.fn()

  render(Input, {
    props: {
      placeholder: basePlaceholderText,
      theme: InputLightTheme,
      'onUpdate:modelValue': handleMockFn,
      ...props,
    },
  })

  return handleMockFn
}

describe('Input', () => {
  it('should be defined', () => {
    expect(Input).toBeDefined()
  })

  it('should not call onChange function if disabled', async () => {
    const mockFn = renderInput({ isDisabled: true })

    const element = screen.getByPlaceholderText(basePlaceholderText) as HTMLInputElement

    await userEvent.type(element, 'hello')

    expect(mockFn).not.toHaveBeenCalled()
    expect(element).toBeDisabled()
  })

  it('should call update:modelValue on type', async () => {
    const mockFn = renderInput({})

    const element = screen.getByPlaceholderText(basePlaceholderText) as HTMLInputElement

    await userEvent.type(element, 'hello')

    expect(mockFn).toHaveBeenCalledTimes(5)
  })

  it('should update value on type', async () => {
    const mockFn = renderInput({})
    const expectedValue = 'hello'

    const element = screen.getByPlaceholderText(basePlaceholderText) as HTMLInputElement

    await userEvent.type(element, expectedValue)

    expect(mockFn).toHaveBeenCalledTimes(5)
    expect(element).toHaveValue(expectedValue)
  })

  it('should pass props correctly', () => {
    renderInput({ type: 'email' })

    const inputElement = screen.getByPlaceholderText(basePlaceholderText) as HTMLInputElement

    expect(inputElement).toHaveAttribute('type', 'email')
  })
})
