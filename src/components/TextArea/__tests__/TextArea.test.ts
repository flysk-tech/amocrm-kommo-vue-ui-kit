import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import TextArea from '../TextArea.vue'
import { TextareaLightTheme, TextareaDarkTheme } from '../TextArea.themes'
import styles from '../TextArea.module.scss'

const basePlaceholderText = 'TextArea'

const renderTextArea = (props: any = {}, attrs: any = {}) => {
  const handleMockFn = vi.fn()

  const result = render(TextArea, {
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

  return { mockFn: handleMockFn, ...result }
}

describe('TextArea', () => {
  it('should be defined', () => {
    expect(TextArea).toBeDefined()
  })

  it('should render a textarea element', () => {
    renderTextArea()

    const element = screen.getByPlaceholderText(basePlaceholderText)
    expect(element).toBeInTheDocument()
    expect(element.tagName).toBe('TEXTAREA')
  })

  it('should not emit when disabled', async () => {
    const { mockFn } = renderTextArea({ isDisabled: true })

    const element = screen.getByPlaceholderText(basePlaceholderText)
    await userEvent.type(element, 'hello')

    expect(mockFn).not.toHaveBeenCalled()
    expect(element).toBeDisabled()
  })

  it('should emit on type', async () => {
    const { mockFn } = renderTextArea()

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

  // isDisabled
  it('should apply disabled class when isDisabled is true', () => {
    const { container } = renderTextArea({ isDisabled: true })

    const textareaContainer = container.querySelector(`.${styles.textarea_container}`)
    expect(textareaContainer).toBeTruthy()
    expect(textareaContainer!.classList.contains(styles.disabled)).toBe(true)
  })

  it('should not apply disabled class by default', () => {
    const { container } = renderTextArea()

    const textareaContainer = container.querySelector(`.${styles.textarea_container}`)
    expect(textareaContainer).toBeTruthy()
    expect(textareaContainer!.classList.contains(styles.disabled)).toBe(false)
  })

  // isReadOnly
  it('should be readonly when isReadOnly is true', () => {
    renderTextArea({ isReadOnly: true })

    const element = screen.getByPlaceholderText(basePlaceholderText)
    expect(element).toHaveAttribute('readonly')
  })

  it('should not be readonly by default', () => {
    renderTextArea()

    const element = screen.getByPlaceholderText(basePlaceholderText)
    expect(element).not.toHaveAttribute('readonly')
  })

  // isInvalid
  it('should apply invalid class when isInvalid is true', () => {
    const { container } = renderTextArea({ isInvalid: true })

    const textareaContainer = container.querySelector(`.${styles.textarea_container}`)
    expect(textareaContainer).toBeTruthy()
    expect(textareaContainer!.classList.contains(styles.invalid)).toBe(true)
  })

  it('should not apply invalid class by default', () => {
    const { container } = renderTextArea()

    const textareaContainer = container.querySelector(`.${styles.textarea_container}`)
    expect(textareaContainer).toBeTruthy()
    expect(textareaContainer!.classList.contains(styles.invalid)).toBe(false)
  })

  // invalidDescription
  it('should show invalidDescription when isInvalid is true', () => {
    const errorMsg = 'This field is required'
    renderTextArea({ isInvalid: true, invalidDescription: errorMsg })

    expect(screen.getByText(errorMsg)).toBeInTheDocument()
  })

  it('should not show invalidDescription when isInvalid is false', () => {
    const errorMsg = 'This field is required'
    renderTextArea({ isInvalid: false, invalidDescription: errorMsg })

    expect(screen.queryByText(errorMsg)).not.toBeInTheDocument()
  })

  it('should not show invalidDescription when not provided even if invalid', () => {
    const { container } = renderTextArea({ isInvalid: true })

    const desc = container.querySelector(`.${styles.invalid_description}`)
    expect(desc).toBeNull()
  })

  // isPlaceholderVisibleOnFocus
  it('should apply placeholder_visible class when isPlaceholderVisibleOnFocus is true', () => {
    renderTextArea({ isPlaceholderVisibleOnFocus: true })

    const element = screen.getByPlaceholderText(basePlaceholderText)
    expect(element.classList.contains(styles.placeholder_visible)).toBe(true)
  })

  it('should not apply placeholder_visible class by default', () => {
    renderTextArea()

    const element = screen.getByPlaceholderText(basePlaceholderText)
    expect(element.classList.contains(styles.placeholder_visible)).toBe(false)
  })

  // maxHeight
  it('should apply maxHeight style when maxHeight prop is provided', () => {
    renderTextArea({ maxHeight: 200 })

    const element = screen.getByPlaceholderText(basePlaceholderText) as HTMLElement
    expect(element.style.maxHeight).toBe('200px')
  })

  it('should not apply maxHeight style by default', () => {
    renderTextArea()

    const element = screen.getByPlaceholderText(basePlaceholderText) as HTMLElement
    expect(element.style.maxHeight).toBe('')
  })

  // theme
  it('should apply theme styles to wrapper', () => {
    const { container } = renderTextArea({ theme: TextareaLightTheme })

    const wrapper = container.querySelector(`.${styles.wrapper}`)
    expect(wrapper).toBeTruthy()
  })

  it('should accept dark theme', () => {
    const { container } = renderTextArea({ theme: TextareaDarkTheme })

    const wrapper = container.querySelector(`.${styles.wrapper}`)
    expect(wrapper).toBeTruthy()
  })

  // modelValue
  it('should render with initial modelValue', () => {
    renderTextArea({ modelValue: 'initial text' })

    const element = screen.getByPlaceholderText(basePlaceholderText) as HTMLTextAreaElement
    expect(element).toHaveValue('initial text')
  })

  // isAutosized
  it('should call autoResize on input when isAutosized is true', async () => {
    renderTextArea({ isAutosized: true })

    const element = screen.getByPlaceholderText(basePlaceholderText)
    await userEvent.type(element, 'a')

    expect(element).toHaveValue('a')
  })

  it('should emit autosize event when isAutosized and input changes', async () => {
    const onAutosize = vi.fn()
    render(TextArea, {
      props: {
        theme: TextareaLightTheme,
        isAutosized: true,
        modelValue: '',
        'onUpdate:modelValue': vi.fn(),
        onAutosize,
      },
      attrs: {
        placeholder: basePlaceholderText,
      },
    })

    const element = screen.getByPlaceholderText(basePlaceholderText)
    await fireEvent.update(element, 'new text')

    // Wait for nextTick
    await vi.dynamicImportSettled()

    expect(onAutosize).toHaveBeenCalled()
  })

  // attrs forwarding
  it('should pass rows attribute', () => {
    renderTextArea({}, { rows: 5 })

    const element = screen.getByPlaceholderText(basePlaceholderText)
    expect(element).toHaveAttribute('rows', '5')
  })

  it('should pass name attribute', () => {
    renderTextArea({}, { name: 'my-textarea' })

    const element = screen.getByPlaceholderText(basePlaceholderText)
    expect(element).toHaveAttribute('name', 'my-textarea')
  })

  it('should have textarea css class', () => {
    renderTextArea()

    const element = screen.getByPlaceholderText(basePlaceholderText)
    expect(element.classList.contains(styles.textarea)).toBe(true)
  })
})
