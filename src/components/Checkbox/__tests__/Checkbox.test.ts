import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import Checkbox from '../Checkbox.vue'
import { CheckboxLightTheme, CheckboxDarkTheme } from '../Checkbox.themes'
import styles from '../Checkbox.module.scss'

const renderCheckbox = (props: any = {}, attrs: any = {}) => {
  return render(Checkbox, {
    props: {
      theme: CheckboxLightTheme,
      ...props,
    },
    attrs: {
      role: 'checkbox',
      ...attrs,
    },
  })
}

describe('Checkbox', () => {
  it('should render a checkbox input', () => {
    renderCheckbox()
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeInTheDocument()
    expect(checkbox.tagName).toBe('INPUT')
  })

  it('should render as unchecked by default', () => {
    renderCheckbox()
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()
  })

  it('should toggle checked state on click', async () => {
    renderCheckbox()

    const checkbox = screen.getByRole('checkbox')
    await userEvent.click(checkbox)

    expect(checkbox).toBeChecked()
  })

  it('should be checked initially when isDefaultChecked is true', () => {
    renderCheckbox({ isDefaultChecked: true })

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeChecked()
  })

  it('should toggle from checked to unchecked on click', async () => {
    renderCheckbox({ isDefaultChecked: true })

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeChecked()

    await userEvent.click(checkbox)
    expect(checkbox).not.toBeChecked()
  })

  it('should not toggle when disabled', async () => {
    renderCheckbox({ isDisabled: true })

    const checkbox = screen.getByRole('checkbox')
    await userEvent.click(checkbox)

    expect(checkbox).toBeDisabled()
    expect(checkbox).not.toBeChecked()
  })

  it('should apply disabled attribute', () => {
    renderCheckbox({ isDisabled: true })
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeDisabled()
  })

  it('should not be disabled by default', () => {
    renderCheckbox()
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeDisabled()
  })

  it('should apply readonly attribute', () => {
    renderCheckbox({ isReadonly: true })
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toHaveAttribute('readonly')
  })

  it('should render with controlled isChecked prop', () => {
    renderCheckbox({ isChecked: true })
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeChecked()
  })

  it('should render unchecked with controlled isChecked=false', () => {
    renderCheckbox({ isChecked: false })
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()
  })

  it('should apply wrapper CSS class', () => {
    const { container } = renderCheckbox()
    const wrapper = container.firstElementChild as HTMLElement
    expect(wrapper).toHaveClass(styles.wrapper)
  })

  it('should apply input CSS class to the input', () => {
    renderCheckbox()
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toHaveClass(styles.input)
  })

  it('should render the checkbox span element', () => {
    const { container } = renderCheckbox()
    const checkboxSpan = container.querySelector(`.${styles.checkbox}`)
    expect(checkboxSpan).toBeInTheDocument()
  })

  it('should apply invalid CSS class when isInvalid is true', () => {
    const { container } = renderCheckbox({ isInvalid: true })
    const checkboxSpan = container.querySelector(`.${styles.checkbox}`)
    expect(checkboxSpan).toHaveClass(styles.invalid)
  })

  it('should not apply invalid CSS class by default', () => {
    const { container } = renderCheckbox()
    const checkboxSpan = container.querySelector(`.${styles.checkbox}`)
    expect(checkboxSpan).not.toHaveClass(styles.invalid)
  })

  it('should apply indeterminate CSS class when checkedStyle is indeterminate', () => {
    const { container } = renderCheckbox({ checkedStyle: 'indeterminate' })
    const checkboxSpan = container.querySelector(`.${styles.checkbox}`)
    expect(checkboxSpan).toHaveClass(styles.indeterminate)
  })

  it('should not apply indeterminate CSS class with default checkedStyle', () => {
    const { container } = renderCheckbox()
    const checkboxSpan = container.querySelector(`.${styles.checkbox}`)
    expect(checkboxSpan).not.toHaveClass(styles.indeterminate)
  })

  it('should not apply indeterminate CSS class when checkedStyle is mark', () => {
    const { container } = renderCheckbox({ checkedStyle: 'mark' })
    const checkboxSpan = container.querySelector(`.${styles.checkbox}`)
    expect(checkboxSpan).not.toHaveClass(styles.indeterminate)
  })

  it('should apply theme CSS variables to wrapper', () => {
    const { container } = renderCheckbox()
    const wrapper = container.firstElementChild as HTMLElement
    expect(wrapper).toHaveStyle({
      '--crm-ui-kit-checkbox-size': '20px',
    })
  })

  it('should apply dark theme CSS variables', () => {
    const { container } = renderCheckbox({ theme: CheckboxDarkTheme })
    const wrapper = container.firstElementChild as HTMLElement
    expect(wrapper).toHaveStyle({
      '--crm-ui-kit-checkbox-size': '20px',
    })
  })

  it('should pass name prop to input', () => {
    renderCheckbox({ name: 'terms' })
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toHaveAttribute('name', 'terms')
  })

  it('should pass value prop to input', () => {
    renderCheckbox({ value: 'accepted' })
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toHaveAttribute('value', 'accepted')
  })

  it('should pass id prop to input', () => {
    renderCheckbox({ id: 'my-checkbox' })
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toHaveAttribute('id', 'my-checkbox')
  })

  it('should pass additional attributes to input', () => {
    renderCheckbox({}, { 'aria-label': 'Accept terms' })
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toHaveAttribute('aria-label', 'Accept terms')
  })
})
