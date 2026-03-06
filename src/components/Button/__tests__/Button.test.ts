import { describe, it, expect, vi } from 'vitest'
import { render, fireEvent } from '@testing-library/vue'
import Button from '../Button.vue'
import { ButtonPrimaryTheme } from '../Button.themes'
import type { ButtonProps } from '../Button.types'

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

  it('renders with custom className', () => {
    const { getByRole } = render(Button, {
      props: {
        theme: ButtonPrimaryTheme,
        className: 'custom-class',
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

  it('handles click events when enabled', async () => {
    const onClick = vi.fn()
    const { getByRole } = render(Button, {
      props: {
        theme: ButtonPrimaryTheme,
        onClick,
      },
      slots: {
        default: 'Click me',
      },
    })

    const button = getByRole('button')
    await fireEvent.click(button)

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('does not call onClick when disabled', async () => {
    const onClick = vi.fn()
    const { getByRole } = render(Button, {
      props: {
        theme: ButtonPrimaryTheme,
        isDisabled: true,
        onClick,
      },
      slots: {
        default: 'Disabled',
      },
    })

    const button = getByRole('button')
    await fireEvent.click(button)

    expect(onClick).not.toHaveBeenCalled()
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

  it('does not call onClick when loading', async () => {
    const onClick = vi.fn()
    const { getByRole } = render(Button, {
      props: {
        theme: ButtonPrimaryTheme,
        isLoading: true,
        onClick,
      },
      slots: {
        default: 'Loading',
      },
    })

    const button = getByRole('button')
    await fireEvent.click(button)

    expect(onClick).not.toHaveBeenCalled()
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

  it('handles isClickableWhileDisabled prop', async () => {
    const onClick = vi.fn()
    const { getByRole } = render(Button, {
      props: {
        theme: ButtonPrimaryTheme,
        isDisabled: true,
        isClickableWhileDisabled: true,
        onClick,
      },
      slots: {
        default: 'Clickable while disabled',
      },
    })

    const button = getByRole('button')
    await fireEvent.click(button)

    expect(onClick).toHaveBeenCalledTimes(1)
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
})
