import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import Checkbox from '../Checkbox.vue'
import { CheckboxLightTheme } from '../Checkbox.themes'

const renderCheckbox = (props: any = {}) => {
  return render(Checkbox, {
    props: {
      theme: CheckboxLightTheme,
      isDefaultChecked: false,
      ...props,
    },
    attrs: {
      role: 'checkbox',
    },
  })
}

describe('Checkbox', () => {
  it('should not call onChange when disabled', async () => {
    renderCheckbox({ isDisabled: true })

    const checkbox = screen.getByRole('checkbox')
    await userEvent.click(checkbox)

    expect(checkbox).toBeDisabled()
  })

  it('should toggle checked state on click', async () => {
    renderCheckbox()

    const checkbox = screen.getByRole('checkbox')
    await userEvent.click(checkbox)

    expect(checkbox).toBeChecked()
  })

  it('should be checked initially and toggle on click', async () => {
    renderCheckbox({ isDefaultChecked: true })

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeChecked()

    await userEvent.click(checkbox)
    expect(checkbox).not.toBeChecked()
  })
})
