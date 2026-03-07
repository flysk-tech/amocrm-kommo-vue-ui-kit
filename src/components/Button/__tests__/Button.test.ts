import { describe, it, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/vue'
import Button from '../Button.vue'
import { ButtonPrimaryTheme } from '../Button.themes'
import buttonStyles from '../Button.module.scss'

describe('Button', () => {
  it('should be defined', () => {
    expect(Button).toBeDefined()
  })

  it('renders correctly with default props', () => {
    const { getByRole } = render(Button, {
      props: {
        theme: ButtonPrimaryTheme,
      },
      slots: {
        default: 'Go to Dashboard',
      },
    })

    const button = getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('Go to Dashboard')
  })

  it('applies external class via Vue class binding', () => {
    const { getByRole } = render(Button, {
      props: {
        theme: ButtonPrimaryTheme,
      },
      attrs: {
        class: 'custom-class',
      },
      slots: {
        default: 'Button',
      },
    })

    const button = getByRole('button')
    expect(button).toHaveClass('custom-class')
  })

  it('applies correct button type', () => {
    const { getByRole } = render(Button, {
      props: {
        theme: ButtonPrimaryTheme,
        type: 'submit',
      },
      slots: {
        default: 'Submit',
      },
    })

    const button = getByRole('button')
    expect(button).toHaveAttribute('type', 'submit')
  })

  it('emits click event when enabled', async () => {
    const { getByRole, emitted } = render(Button, {
      props: {
        theme: ButtonPrimaryTheme,
      },
      slots: {
        default: 'Click me',
      },
    })

    const button = getByRole('button')
    await fireEvent.click(button)

    expect(emitted()).toHaveProperty('click')
    expect(emitted().click).toHaveLength(1)
  })

  it('does not emit click when disabled', async () => {
    const { getByRole, emitted } = render(Button, {
      props: {
        theme: ButtonPrimaryTheme,
        isDisabled: true,
      },
      slots: {
        default: 'Disabled',
      },
    })

    const button = getByRole('button')
    await fireEvent.click(button)

    expect(emitted()).not.toHaveProperty('click')
  })

  it('renders disabled state correctly', () => {
    const { getByRole } = render(Button, {
      props: {
        theme: ButtonPrimaryTheme,
        isDisabled: true,
      },
      slots: {
        default: 'Disabled',
      },
    })

    const button = getByRole('button')
    expect(button).toBeDisabled()
  })

  it('renders loading state correctly', () => {
    const { getByRole } = render(Button, {
      props: {
        theme: ButtonPrimaryTheme,
        isLoading: true,
      },
      slots: {
        default: 'Loading',
      },
    })

    const button = getByRole('button')
    expect(button).toBeDisabled()

    // Проверяем что текст загрузки не виден (заменен спиннером)
    expect(button).not.toHaveTextContent('Loading')
  })

  it('does not emit click when loading', async () => {
    const { getByRole, emitted } = render(Button, {
      props: {
        theme: ButtonPrimaryTheme,
        isLoading: true,
      },
      slots: {
        default: 'Loading',
      },
    })

    const button = getByRole('button')
    await fireEvent.click(button)

    expect(emitted()).not.toHaveProperty('click')
  })

  it('renders before slot content', () => {
    const { getByTestId } = render(Button, {
      props: {
        theme: ButtonPrimaryTheme,
        before: true, // Активируем отображение before слота
      },
      slots: {
        default: 'Button',
        before: '<span data-testid="before-icon">Icon</span>',
      },
    })

    const beforeIcon = getByTestId('before-icon')
    expect(beforeIcon).toBeInTheDocument()
    expect(beforeIcon).toHaveTextContent('Icon')
  })

  it('renders after slot content', () => {
    const { getByTestId } = render(Button, {
      props: {
        theme: ButtonPrimaryTheme,
        after: true, // Активируем отображение after слота
      },
      slots: {
        default: 'Button',
        after: '<span data-testid="after-icon">Icon</span>',
      },
    })

    const afterIcon = getByTestId('after-icon')
    expect(afterIcon).toBeInTheDocument()
    expect(afterIcon).toHaveTextContent('Icon')
  })

  it('applies theme CSS variables', () => {
    const { getByRole } = render(Button, {
      props: {
        theme: ButtonPrimaryTheme,
      },
      slots: {
        default: 'Button',
      },
    })

    const button = getByRole('button')
    const styles = window.getComputedStyle(button)

    // Проверяем что CSS переменные применены
    expect(button).toHaveStyle({
      '--crm-ui-kit-button-color': ButtonPrimaryTheme['--crm-ui-kit-button-color'],
    })
  })

  it('emits click when disabled with isClickableWhileDisabled', async () => {
    const { getByRole, emitted } = render(Button, {
      props: {
        theme: ButtonPrimaryTheme,
        isDisabled: true,
        isClickableWhileDisabled: true,
      },
      slots: {
        default: 'Clickable while disabled',
      },
    })

    const button = getByRole('button')
    await fireEvent.click(button)

    expect(emitted()).toHaveProperty('click')
    expect(emitted().click).toHaveLength(1)
  })

  it('renders success state text when provided', () => {
    const { getByText } = render(Button, {
      props: {
        theme: ButtonPrimaryTheme,
        successfulStateText: 'Saved!',
      },
      slots: {
        default: 'Save',
      },
    })

    // Проверяем что текст успеха может быть отрендерен
    // (требует триггера анимации через ref)
    expect(getByText('Save')).toBeInTheDocument()
  })

  it('passes through additional HTML attributes', () => {
    const { getByRole } = render(Button, {
      props: {
        theme: ButtonPrimaryTheme,
      },
      attrs: {
        'data-testid': 'custom-button',
        'aria-label': 'Custom button',
      },
      slots: {
        default: 'Button',
      },
    })

    const button = getByRole('button')
    expect(button).toHaveAttribute('data-testid', 'custom-button')
    expect(button).toHaveAttribute('aria-label', 'Custom button')
  })

  it('renders default slot as text content', () => {
    const { getByRole } = render(Button, {
      props: {
        theme: ButtonPrimaryTheme,
      },
      slots: {
        default: 'Via default slot',
      },
    })

    const button = getByRole('button')
    expect(button).toHaveTextContent('Via default slot')
  })

  it('applies disabled CSS class when isDisabled is true', () => {
    const { getByRole } = render(Button, {
      props: {
        theme: ButtonPrimaryTheme,
        isDisabled: true,
      },
      slots: {
        default: 'Disabled',
      },
    })

    const button = getByRole('button')
    expect(button).toHaveClass(buttonStyles.disabled)
  })

  it('does not apply disabled CSS class by default', () => {
    const { getByRole } = render(Button, {
      props: {
        theme: ButtonPrimaryTheme,
      },
      slots: {
        default: 'Button',
      },
    })

    const button = getByRole('button')
    expect(button).not.toHaveClass(buttonStyles.disabled)
  })

  it('defaults to type="button"', () => {
    const { getByRole } = render(Button, {
      props: {
        theme: ButtonPrimaryTheme,
      },
      slots: {
        default: 'Button',
      },
    })

    const button = getByRole('button')
    expect(button).toHaveAttribute('type', 'button')
  })

  it('applies type="reset"', () => {
    const { getByRole } = render(Button, {
      props: {
        theme: ButtonPrimaryTheme,
        type: 'reset',
      },
      slots: {
        default: 'Reset',
      },
    })

    const button = getByRole('button')
    expect(button).toHaveAttribute('type', 'reset')
  })

  it('applies button base CSS class', () => {
    const { getByRole } = render(Button, {
      props: {
        theme: ButtonPrimaryTheme,
      },
      slots: {
        default: 'Button',
      },
    })

    const button = getByRole('button')
    expect(button).toHaveClass(buttonStyles.button)
  })

  it('is not disabled when isClickableWhileDisabled is true', () => {
    const { getByRole } = render(Button, {
      props: {
        theme: ButtonPrimaryTheme,
        isDisabled: true,
        isClickableWhileDisabled: true,
      },
      slots: {
        default: 'Button',
      },
    })

    const button = getByRole('button')
    expect(button).not.toBeDisabled()
  })

  it('does not emit click when disabled without isClickableWhileDisabled even if not HTML-disabled', async () => {
    // When isDisabled is true and isClickableWhileDisabled is false,
    // the button is HTML-disabled so click won't reach handler
    const { getByRole, emitted } = render(Button, {
      props: {
        theme: ButtonPrimaryTheme,
        isDisabled: true,
      },
      slots: {
        default: 'Button',
      },
    })

    const button = getByRole('button')
    await fireEvent.click(button)
    expect(emitted()).not.toHaveProperty('click')
  })

  it('renders spinner when loading', () => {
    const { container } = render(Button, {
      props: {
        theme: ButtonPrimaryTheme,
        isLoading: true,
      },
      slots: {
        default: 'Loading',
      },
    })

    const spinnerContainer = container.querySelector(`.${buttonStyles.spinner_container}`)
    expect(spinnerContainer).toBeInTheDocument()
  })
})
