import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import Switcher from '../Switcher.vue'
import { SwitcherPrimaryTheme } from '../Switcher.themes'

const renderSwitcher = (props: any = {}) => {
  return render(Switcher, {
    props: {
      theme: SwitcherPrimaryTheme,
      isDefaultChecked: false,
      ...props,
    },
    attrs: {
      role: 'switch',
    },
  })
}

describe('Switcher', () => {
  it('should not call onChange when disabled', async () => {
    renderSwitcher({ isDisabled: true })

    const switchEl = screen.getByRole('switch')
    await userEvent.click(switchEl)

    expect(switchEl).toBeDisabled()
  })

  it('should toggle on click', async () => {
    renderSwitcher()

    const switchEl = screen.getByRole('switch')
    await userEvent.click(switchEl)

    expect(switchEl).toBeChecked()
  })

  it('should be checked initially and toggle on click', async () => {
    renderSwitcher({ isDefaultChecked: true })

    const switchEl = screen.getByRole('switch')
    expect(switchEl).toBeChecked()

    await userEvent.click(switchEl)
    expect(switchEl).not.toBeChecked()
  })
})
