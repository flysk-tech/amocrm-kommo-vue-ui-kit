import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import Input from '../Input.vue'
import { InputLightTheme, InputDarkTheme } from '../Input.themes'
import styles from '../Input.module.scss'

const basePlaceholderText = 'Input'

const renderInput = (props: any = {}, attrs: any = {}, slots: any = {}) => {
  const handleMockFn = vi.fn()

  const result = render(Input, {
    props: {
      placeholder: basePlaceholderText,
      theme: InputLightTheme,
      'onUpdate:modelValue': handleMockFn,
      ...props,
    },
    attrs,
    slots,
  })

  return { mockFn: handleMockFn, ...result }
}

describe('Input', () => {
  it('should be defined', () => {
    expect(Input).toBeDefined()
  })

  it('should render an input element', () => {
    renderInput()

    const element = screen.getByPlaceholderText(basePlaceholderText)
    expect(element).toBeInTheDocument()
    expect(element.tagName).toBe('INPUT')
  })

  it('should not call onChange function if disabled', async () => {
    const { mockFn } = renderInput({ isDisabled: true })

    const element = screen.getByPlaceholderText(basePlaceholderText) as HTMLInputElement

    await userEvent.type(element, 'hello')

    expect(mockFn).not.toHaveBeenCalled()
    expect(element).toBeDisabled()
  })

  it('should call update:modelValue on type', async () => {
    const { mockFn } = renderInput({})

    const element = screen.getByPlaceholderText(basePlaceholderText) as HTMLInputElement

    await userEvent.type(element, 'hello')

    expect(mockFn).toHaveBeenCalledTimes(5)
  })

  it('should update value on type', async () => {
    const { mockFn } = renderInput({})
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

  // isReadonly
  it('should be readonly when isReadonly is true', () => {
    renderInput({ isReadonly: true })

    const element = screen.getByPlaceholderText(basePlaceholderText)
    expect(element).toHaveAttribute('readonly')
  })

  it('should not be readonly by default', () => {
    renderInput()

    const element = screen.getByPlaceholderText(basePlaceholderText)
    expect(element).not.toHaveAttribute('readonly')
  })

  // isInvalid
  it('should apply invalid class when isInvalid is true', () => {
    const { container } = renderInput({ isInvalid: true })

    const inputContainer = container.querySelector(`.${styles.input_container}`)
    expect(inputContainer).toBeTruthy()
    expect(inputContainer!.classList.contains(styles.invalid)).toBe(true)
  })

  it('should not apply invalid class by default', () => {
    const { container } = renderInput()

    const inputContainer = container.querySelector(`.${styles.input_container}`)
    expect(inputContainer).toBeTruthy()
    expect(inputContainer!.classList.contains(styles.invalid)).toBe(false)
  })

  // disabled class
  it('should apply disabled class when isDisabled is true', () => {
    const { container } = renderInput({ isDisabled: true })

    const inputContainer = container.querySelector(`.${styles.input_container}`)
    expect(inputContainer).toBeTruthy()
    expect(inputContainer!.classList.contains(styles.disabled)).toBe(true)
  })

  // invalidDescription
  it('should show invalidDescription when isInvalid is true', () => {
    const errorMsg = 'This field is required'
    renderInput({ isInvalid: true, invalidDescription: errorMsg })

    expect(screen.getByText(errorMsg)).toBeInTheDocument()
  })

  it('should not show invalidDescription when isInvalid is false', () => {
    const errorMsg = 'This field is required'
    renderInput({ isInvalid: false, invalidDescription: errorMsg })

    expect(screen.queryByText(errorMsg)).not.toBeInTheDocument()
  })

  it('should not show invalidDescription when not provided', () => {
    const { container } = renderInput({ isInvalid: true })

    const desc = container.querySelector(`.${styles.invalid_description}`)
    expect(desc).toBeNull()
  })

  // invalidDescriptionPlacement
  it('should apply right placement class when invalidDescriptionPlacement is right', () => {
    const { container } = renderInput({
      isInvalid: true,
      invalidDescription: 'Error',
      invalidDescriptionPlacement: 'right',
    })

    const inputWrapper = container.querySelector(`.${styles.input_wrapper}`)
    expect(inputWrapper).toBeTruthy()
    expect(inputWrapper!.classList.contains(styles.invalid_description_right)).toBe(true)
  })

  it('should not apply right placement class when invalidDescriptionPlacement is bottom', () => {
    const { container } = renderInput({
      isInvalid: true,
      invalidDescription: 'Error',
      invalidDescriptionPlacement: 'bottom',
    })

    const inputWrapper = container.querySelector(`.${styles.input_wrapper}`)
    expect(inputWrapper).toBeTruthy()
    expect(inputWrapper!.classList.contains(styles.invalid_description_right)).toBe(false)
  })

  // after prop
  it('should render after content when after prop is provided', () => {
    renderInput({ after: 'suffix' })

    expect(screen.getByText('suffix')).toBeInTheDocument()
  })

  it('should not render after container when after prop is not provided', () => {
    const { container } = renderInput()

    const afterContainer = container.querySelector(`.${styles.after}`)
    expect(afterContainer).toBeNull()
  })

  // after slot
  it('should render after slot content', () => {
    renderInput({}, {}, { after: '<span>slot-content</span>' })

    expect(screen.getByText('slot-content')).toBeInTheDocument()
  })

  // theme
  it('should use InputLightTheme by default when no theme is passed', () => {
    const { container } = render(Input, {
      props: {
        placeholder: basePlaceholderText,
      },
    })

    const wrapper = container.querySelector(`.${styles.wrapper}`)
    expect(wrapper).toBeTruthy()
  })

  it('should apply custom theme', () => {
    const { container } = renderInput({ theme: InputDarkTheme })

    const wrapper = container.querySelector(`.${styles.wrapper}`)
    expect(wrapper).toBeTruthy()
  })

  // events
  it('should emit focus event', async () => {
    const onFocus = vi.fn()
    renderInput({ onFocus })

    const element = screen.getByPlaceholderText(basePlaceholderText)
    await fireEvent.focus(element)

    expect(onFocus).toHaveBeenCalledTimes(1)
  })

  it('should emit blur event', async () => {
    const onBlur = vi.fn()
    renderInput({ onBlur })

    const element = screen.getByPlaceholderText(basePlaceholderText)
    await fireEvent.focus(element)
    await fireEvent.blur(element)

    expect(onBlur).toHaveBeenCalledTimes(1)
  })

  it('should emit change event', async () => {
    const onChange = vi.fn()
    renderInput({ onChange })

    const element = screen.getByPlaceholderText(basePlaceholderText)
    await fireEvent.change(element, { target: { value: 'new' } })

    expect(onChange).toHaveBeenCalledTimes(1)
  })

  it('should emit input event alongside update:modelValue', async () => {
    const onInput = vi.fn()
    const { mockFn } = renderInput({ onInput })

    const element = screen.getByPlaceholderText(basePlaceholderText)
    await userEvent.type(element, 'a')

    expect(onInput).toHaveBeenCalledTimes(1)
    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  // isPlaceholderVisibleOnFocus
  it('should pass isPlaceholderVisibleOnFocus to BaseInput', () => {
    renderInput({ isPlaceholderVisibleOnFocus: true })

    const element = screen.getByPlaceholderText(basePlaceholderText)
    // BaseInput applies its own styles.placeholder_visible class
    expect(element.className).toContain('placeholder_visible')
  })

  // modelValue - Input passes modelValue via v-bind on BaseInput attrs
  it('should emit update:modelValue with typed value', async () => {
    const { mockFn } = renderInput({ modelValue: '' })

    const element = screen.getByPlaceholderText(basePlaceholderText)
    await userEvent.type(element, 'x')

    expect(mockFn).toHaveBeenCalledWith('x')
  })

  // v-model / programmatic modelValue
  it('should reflect modelValue prop as input value', () => {
    renderInput({ modelValue: 'programmatic' })

    const element = screen.getByPlaceholderText(basePlaceholderText)
    expect(element).toHaveValue('programmatic')
  })

  it('should update DOM input when modelValue prop changes', async () => {
    const { rerender } = renderInput({ modelValue: 'initial' })

    const element = screen.getByPlaceholderText(basePlaceholderText)
    expect(element).toHaveValue('initial')

    await rerender({ modelValue: 'updated', theme: InputLightTheme, placeholder: basePlaceholderText })
    expect(element).toHaveValue('updated')
  })

  it('should show empty input when modelValue is empty string', () => {
    renderInput({ modelValue: '' })

    const element = screen.getByPlaceholderText(basePlaceholderText)
    expect(element).toHaveValue('')
  })

  it('should support numeric modelValue', () => {
    renderInput({ modelValue: 42 })

    const element = screen.getByPlaceholderText(basePlaceholderText)
    expect(element).toHaveValue('42')
  })

  // attrs forwarding (class should stay on wrapper, not on input)
  it('should apply class attr to wrapper, not to input', () => {
    const { container } = render(Input, {
      props: {
        placeholder: basePlaceholderText,
        theme: InputLightTheme,
      },
      attrs: {
        class: 'custom-class',
      },
    })

    const wrapper = container.querySelector(`.${styles.wrapper}`)
    expect(wrapper).toBeTruthy()
    expect(wrapper!.classList.contains('custom-class')).toBe(true)

    const input = screen.getByPlaceholderText(basePlaceholderText)
    expect(input.classList.contains('custom-class')).toBe(false)
  })
})
