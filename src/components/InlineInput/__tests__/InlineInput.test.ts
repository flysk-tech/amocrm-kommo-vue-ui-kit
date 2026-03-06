import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import InlineInput from '../InlineInput.vue'
import { InlineInputPrimaryTheme } from '../InlineInput.themes'

const basePlaceholderText = 'InlineInput'

const renderInlineInput = (props: any = {}, attrs: any = {}) => {
  return render(InlineInput, {
    props: {
      theme: InlineInputPrimaryTheme,
      ...props,
    },
    attrs: {
      placeholder: basePlaceholderText,
      ...attrs,
    },
  })
}

describe('InlineInput', () => {
  it('should not accept input when disabled', async () => {
    renderInlineInput({ isDisabled: true })

    const element = screen.getByPlaceholderText(basePlaceholderText)
    await userEvent.type(element, 'hello')

    expect(element).toBeDisabled()
    expect(element).toHaveValue('')
  })

  it('should update value on type', async () => {
    renderInlineInput()
    const expectedValue = 'hello'

    const element = screen.getByPlaceholderText(basePlaceholderText) as HTMLInputElement
    await userEvent.type(element, expectedValue)

    expect(element).toHaveValue(expectedValue)
  })

  it('should pass type attribute', () => {
    renderInlineInput({}, { type: 'email' })

    const element = screen.getByPlaceholderText(basePlaceholderText)
    expect(element).toHaveAttribute('type', 'email')
  })
})
