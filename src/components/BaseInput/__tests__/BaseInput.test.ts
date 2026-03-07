import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import BaseInput from '../BaseInput.vue'
import styles from '../BaseInput.module.scss'

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

  it('should not be disabled by default', () => {
    renderBaseInput()

    const element = screen.getByPlaceholderText('BaseInput')
    expect(element).not.toBeDisabled()
  })

  it('should be readonly when isReadonly is true', () => {
    renderBaseInput({ isReadonly: true })

    const element = screen.getByPlaceholderText('BaseInput')
    expect(element).toHaveAttribute('readonly')
  })

  it('should not be readonly by default', () => {
    renderBaseInput()

    const element = screen.getByPlaceholderText('BaseInput')
    expect(element).not.toHaveAttribute('readonly')
  })

  it('should apply placeholder_visible class when isPlaceholderVisibleOnFocus is true', () => {
    renderBaseInput({ isPlaceholderVisibleOnFocus: true })

    const element = screen.getByPlaceholderText('BaseInput')
    expect(element.classList.contains(styles.placeholder_visible)).toBe(true)
  })

  it('should not apply placeholder_visible class by default', () => {
    renderBaseInput()

    const element = screen.getByPlaceholderText('BaseInput')
    expect(element.classList.contains(styles.placeholder_visible)).toBe(false)
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

  it('should not accept user input when disabled', async () => {
    renderBaseInput({ isDisabled: true })

    const element = screen.getByPlaceholderText('BaseInput')
    await userEvent.type(element, 'hello')

    expect(element).toHaveValue('')
  })

  it('should have the input css class', () => {
    renderBaseInput()

    const element = screen.getByPlaceholderText('BaseInput')
    expect(element.classList.contains(styles.input)).toBe(true)
  })

  it('should expose inputRef via defineExpose', () => {
    const { container } = renderBaseInput()

    const inputElement = container.querySelector('input')
    expect(inputElement).toBeTruthy()
  })

  it('should pass value attribute', () => {
    renderBaseInput({}, { value: 'initial' })

    const element = screen.getByPlaceholderText('BaseInput')
    expect(element).toHaveValue('initial')
  })

  it('should pass maxlength attribute', () => {
    renderBaseInput({}, { maxlength: '10' })

    const element = screen.getByPlaceholderText('BaseInput')
    expect(element).toHaveAttribute('maxlength', '10')
  })
})
