import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/vue'
import SelectButton from '../SelectButton.vue'
import { SelectButtonLightTheme, SelectButtonDarkTheme } from '../SelectButton.themes'
import styles from '../SelectButton.module.scss'

const renderSelectButton = (props: any = {}, options: any = {}) => {
  return render(SelectButton, {
    props: {
      theme: SelectButtonLightTheme,
      ...props,
    },
    attrs: {
      ...options.attrs,
    },
    slots: {
      default: options.slotContent ?? 'Select',
    },
  })
}

describe('SelectButton', () => {
  it('should render as a button element', () => {
    renderSelectButton()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('should render slot content', () => {
    renderSelectButton({}, { slotContent: 'Choose option' })
    expect(screen.getByRole('button')).toHaveTextContent('Choose option')
  })

  it('should have type="button"', () => {
    renderSelectButton()
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
  })

  it('should emit toggle on click', async () => {
    const { emitted } = renderSelectButton()

    const button = screen.getByRole('button')
    await fireEvent.click(button)
    expect(emitted()).toHaveProperty('toggle')
    expect(emitted().toggle).toHaveLength(1)

    await fireEvent.click(button)
    expect(emitted().toggle).toHaveLength(2)
  })

  it('should handle Enter key', async () => {
    const { emitted } = renderSelectButton()

    const button = screen.getByRole('button')
    await fireEvent.keyDown(button, { code: 'Enter' })
    expect(emitted().toggle).toHaveLength(1)
  })

  it('should handle Space key', async () => {
    const { emitted } = renderSelectButton()

    const button = screen.getByRole('button')
    await fireEvent.keyDown(button, { code: 'Space' })
    expect(emitted().toggle).toHaveLength(1)
  })

  it('should not toggle on other keys', async () => {
    const { emitted } = renderSelectButton()

    const button = screen.getByRole('button')
    await fireEvent.keyDown(button, { code: 'ArrowDown' })
    await fireEvent.keyDown(button, { code: 'Escape' })
    await fireEvent.keyDown(button, { code: 'Tab' })

    expect(emitted()).not.toHaveProperty('toggle')
  })

  it('should prevent default on Enter/Space', async () => {
    renderSelectButton()
    const button = screen.getByRole('button')

    const enterEvent = new KeyboardEvent('keydown', { code: 'Enter', bubbles: true, cancelable: true })
    const preventSpy = vi.spyOn(enterEvent, 'preventDefault')
    button.dispatchEvent(enterEvent)
    expect(preventSpy).toHaveBeenCalled()
  })

  it('should apply disabled state', () => {
    renderSelectButton({ isDisabled: true })
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })

  it('should apply disabled CSS class', () => {
    renderSelectButton({ isDisabled: true })
    const button = screen.getByRole('button')
    expect(button).toHaveClass(styles.disabled)
  })

  it('should apply invalid CSS class when isInvalid is true', () => {
    renderSelectButton({ isInvalid: true })
    const button = screen.getByRole('button')
    expect(button).toHaveClass(styles.invalid)
  })

  it('should not apply invalid CSS class by default', () => {
    renderSelectButton()
    const button = screen.getByRole('button')
    expect(button).not.toHaveClass(styles.invalid)
  })

  it('should not apply disabled CSS class by default', () => {
    renderSelectButton()
    const button = screen.getByRole('button')
    expect(button).not.toHaveClass(styles.disabled)
  })

  it('should apply theme CSS variables', () => {
    renderSelectButton({ theme: SelectButtonLightTheme })
    const button = screen.getByRole('button')
    expect(button).toHaveStyle({
      '--crm-ui-kit-select-button-height': '36px',
    })
  })

  it('should apply dark theme CSS variables', () => {
    renderSelectButton({ theme: SelectButtonDarkTheme })
    const button = screen.getByRole('button')
    expect(button).toHaveStyle({
      '--crm-ui-kit-select-button-height': '36px',
    })
  })

  it('should pass through additional HTML attributes', () => {
    renderSelectButton({}, {
      attrs: {
        'data-testid': 'my-select-btn',
        'aria-label': 'Open dropdown',
      },
    })
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('data-testid', 'my-select-btn')
    expect(button).toHaveAttribute('aria-label', 'Open dropdown')
  })

  it('should apply button base CSS class', () => {
    renderSelectButton()
    const button = screen.getByRole('button')
    expect(button).toHaveClass(styles.button)
  })
})
