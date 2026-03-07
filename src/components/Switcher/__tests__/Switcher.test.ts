import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import Switcher from '../Switcher.vue'
import { SwitcherPrimaryTheme } from '../Switcher.themes'
import styles from '../Switcher.module.scss'

const renderSwitcher = (props: any = {}, attrs: any = {}) => {
  return render(Switcher, {
    props: {
      theme: SwitcherPrimaryTheme,
      ...props,
    },
    attrs: {
      role: 'switch',
      ...attrs,
    },
  })
}

describe('Switcher', () => {
  it('should render a checkbox input', () => {
    renderSwitcher()
    const switchEl = screen.getByRole('switch')
    expect(switchEl).toBeInTheDocument()
    expect(switchEl.tagName).toBe('INPUT')
  })

  it('should render as unchecked by default', () => {
    renderSwitcher()
    const switchEl = screen.getByRole('switch')
    expect(switchEl).not.toBeChecked()
  })

  it('should toggle on click', async () => {
    renderSwitcher()

    const switchEl = screen.getByRole('switch')
    await userEvent.click(switchEl)

    expect(switchEl).toBeChecked()
  })

  it('should be checked initially when isDefaultChecked is true', () => {
    renderSwitcher({ isDefaultChecked: true })

    const switchEl = screen.getByRole('switch')
    expect(switchEl).toBeChecked()
  })

  it('should toggle from checked to unchecked on click', async () => {
    renderSwitcher({ isDefaultChecked: true })

    const switchEl = screen.getByRole('switch')
    expect(switchEl).toBeChecked()

    await userEvent.click(switchEl)
    expect(switchEl).not.toBeChecked()
  })

  it('should not toggle when disabled', async () => {
    renderSwitcher({ isDisabled: true })

    const switchEl = screen.getByRole('switch')
    await userEvent.click(switchEl)

    expect(switchEl).toBeDisabled()
    expect(switchEl).not.toBeChecked()
  })

  it('should apply disabled attribute', () => {
    renderSwitcher({ isDisabled: true })
    const switchEl = screen.getByRole('switch')
    expect(switchEl).toBeDisabled()
  })

  it('should not be disabled by default', () => {
    renderSwitcher()
    const switchEl = screen.getByRole('switch')
    expect(switchEl).not.toBeDisabled()
  })

  it('should apply readonly attribute', () => {
    renderSwitcher({ isReadonly: true })
    const switchEl = screen.getByRole('switch')
    expect(switchEl).toHaveAttribute('readonly')
  })

  it('should render with controlled isChecked prop', () => {
    renderSwitcher({ isChecked: true })
    const switchEl = screen.getByRole('switch')
    expect(switchEl).toBeChecked()
  })

  it('should render unchecked with controlled isChecked=false', () => {
    renderSwitcher({ isChecked: false })
    const switchEl = screen.getByRole('switch')
    expect(switchEl).not.toBeChecked()
  })

  it('should apply theme CSS variables to wrapper', () => {
    const { container } = renderSwitcher()
    const wrapper = container.firstElementChild as HTMLElement
    expect(wrapper).toHaveStyle({
      '--crm-ui-kit-switcher-circle-size': '14px',
    })
  })

  it('should apply wrapper CSS class', () => {
    const { container } = renderSwitcher()
    const wrapper = container.firstElementChild as HTMLElement
    expect(wrapper).toHaveClass(styles.wrapper)
  })

  it('should apply input CSS class to the input', () => {
    renderSwitcher()
    const switchEl = screen.getByRole('switch')
    expect(switchEl).toHaveClass(styles.input)
  })

  it('should render the switcher span element', () => {
    const { container } = renderSwitcher()
    const switcherSpan = container.querySelector(`.${styles.switcher}`)
    expect(switcherSpan).toBeInTheDocument()
  })

  it('should pass name prop to input', () => {
    renderSwitcher({ name: 'notifications' })
    const switchEl = screen.getByRole('switch')
    expect(switchEl).toHaveAttribute('name', 'notifications')
  })

  it('should pass value prop to input', () => {
    renderSwitcher({ value: 'on' })
    const switchEl = screen.getByRole('switch')
    expect(switchEl).toHaveAttribute('value', 'on')
  })

  it('should pass id prop to input', () => {
    renderSwitcher({ id: 'my-switcher' })
    const switchEl = screen.getByRole('switch')
    expect(switchEl).toHaveAttribute('id', 'my-switcher')
  })

  it('should pass additional attributes to input', () => {
    renderSwitcher({}, { 'aria-label': 'Toggle notifications' })
    const switchEl = screen.getByRole('switch')
    expect(switchEl).toHaveAttribute('aria-label', 'Toggle notifications')
  })
})
