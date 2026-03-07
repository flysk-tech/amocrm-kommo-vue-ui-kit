import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import InlineInput from '../InlineInput.vue'
import { InlineInputPrimaryTheme, InlineInputPrimaryFocusedTheme } from '../InlineInput.themes'
import styles from '../InlineInput.module.scss'

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
  it('should be defined', () => {
    expect(InlineInput).toBeDefined()
  })

  it('should render an input element', () => {
    renderInlineInput()

    const element = screen.getByPlaceholderText(basePlaceholderText)
    expect(element).toBeInTheDocument()
    expect(element.tagName).toBe('INPUT')
  })

  it('should not accept input when disabled', async () => {
    renderInlineInput({ isDisabled: true })

    const element = screen.getByPlaceholderText(basePlaceholderText)
    await userEvent.type(element, 'hello')

    expect(element).toBeDisabled()
    expect(element).toHaveValue('')
  })

  it('should apply disabled class when isDisabled is true', () => {
    const { container } = renderInlineInput({ isDisabled: true })

    const inputContainer = container.querySelector(`.${styles.input_container}`)
    expect(inputContainer).toBeTruthy()
    expect(inputContainer!.classList.contains(styles.disabled)).toBe(true)
  })

  it('should not apply disabled class by default', () => {
    const { container } = renderInlineInput()

    const inputContainer = container.querySelector(`.${styles.input_container}`)
    expect(inputContainer).toBeTruthy()
    expect(inputContainer!.classList.contains(styles.disabled)).toBe(false)
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

  // after prop
  it('should render after content when after prop is provided', () => {
    renderInlineInput({ after: 'suffix' })

    expect(screen.getByText('suffix')).toBeInTheDocument()
  })

  it('should not render after container when after is not provided', () => {
    const { container } = renderInlineInput()

    const afterContainer = container.querySelector(`.${styles.after_container}`)
    expect(afterContainer).toBeNull()
  })

  it('should apply has_after class to input when after is provided', () => {
    renderInlineInput({ after: 'suffix' })

    const element = screen.getByPlaceholderText(basePlaceholderText)
    expect(element.className).toContain('has_after')
  })

  // isInvalid + invalidDescription
  it('should show invalidDescription when isInvalid is true', () => {
    const errorMsg = 'Field is required'
    renderInlineInput({ isInvalid: true, invalidDescription: errorMsg })

    expect(screen.getByText(errorMsg)).toBeInTheDocument()
  })

  it('should not show invalidDescription container when isInvalid is false', () => {
    const errorMsg = 'Field is required'
    const { container } = renderInlineInput({ isInvalid: false, invalidDescription: errorMsg })

    const desc = container.querySelector(`.${styles.invalid_description_container}`)
    expect(desc).toBeNull()
  })

  it('should render invalid description container when isInvalid is true even without description text', () => {
    const { container } = renderInlineInput({ isInvalid: true })

    const desc = container.querySelector(`.${styles.invalid_description_container}`)
    expect(desc).toBeTruthy()
  })

  // theme
  it('should apply theme styles to wrapper', () => {
    const { container } = renderInlineInput({ theme: InlineInputPrimaryTheme })

    const wrapper = container.querySelector(`.${styles.wrapper}`)
    expect(wrapper).toBeTruthy()
  })

  it('should accept alternative theme', () => {
    const { container } = renderInlineInput({ theme: InlineInputPrimaryFocusedTheme })

    const wrapper = container.querySelector(`.${styles.wrapper}`)
    expect(wrapper).toBeTruthy()
  })

  // attrs forwarding
  it('should pass name attribute to input', () => {
    renderInlineInput({}, { name: 'my-input' })

    const element = screen.getByPlaceholderText(basePlaceholderText)
    expect(element).toHaveAttribute('name', 'my-input')
  })

  it('should pass value attribute', () => {
    renderInlineInput({}, { value: 'initial' })

    const element = screen.getByPlaceholderText(basePlaceholderText)
    expect(element).toHaveValue('initial')
  })

  it('should pass maxlength attribute', () => {
    renderInlineInput({}, { maxlength: '5' })

    const element = screen.getByPlaceholderText(basePlaceholderText)
    expect(element).toHaveAttribute('maxlength', '5')
  })
})
