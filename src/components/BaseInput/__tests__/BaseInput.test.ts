import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import BaseInput from '../BaseInput.vue'

const renderBaseInput = (props: any = {}, attrs: any = {}) => {
  return render(BaseInput, {
    props: {
      ...props,
    },
    attrs: {
      placeholder: 'BaseInput',
      ...attrs,
    },
  })
}

describe('BaseInput', () => {
  it('should render an input element', () => {
    renderBaseInput()

    const element = screen.getByPlaceholderText('BaseInput')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toBe('INPUT')
  })

  it('should be disabled when isDisabled is true', () => {
    renderBaseInput({ isDisabled: true })

    const element = screen.getByPlaceholderText('BaseInput')
    expect(element).toBeDisabled()
  })

  it('should be readonly when isReadonly is true', () => {
    renderBaseInput({ isReadonly: true })

    const element = screen.getByPlaceholderText('BaseInput')
    expect(element).toHaveAttribute('readonly')
  })

  it('should pass through HTML attributes via $attrs', async () => {
    renderBaseInput({}, { type: 'email', name: 'test-input' })

    const element = screen.getByPlaceholderText('BaseInput')
    expect(element).toHaveAttribute('type', 'email')
    expect(element).toHaveAttribute('name', 'test-input')
  })

  it('should accept user input', async () => {
    renderBaseInput()

    const element = screen.getByPlaceholderText('BaseInput')
    await userEvent.type(element, 'hello')

    expect(element).toHaveValue('hello')
  })
})
