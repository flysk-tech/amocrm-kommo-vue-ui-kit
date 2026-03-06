import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/vue'
import SelectButton from '../SelectButton.vue'
import { SelectButtonLightTheme } from '../SelectButton.themes'

const renderSelectButton = (props: any = {}) => {
  return render(SelectButton, {
    props: {
      theme: SelectButtonLightTheme,
      ...props,
    },
    attrs: {
      role: 'selectButton',
    },
    slots: {
      default: 'Select',
    },
  })
}

describe('SelectButton', () => {
  it('should render as a button element', () => {
    renderSelectButton()
    expect(screen.getByRole('selectButton')).toBeInTheDocument()
  })

  it('should emit toggle on click', async () => {
    const { emitted } = renderSelectButton()

    const button = screen.getByRole('selectButton')
    await fireEvent.click(button)
    expect(emitted()).toHaveProperty('toggle')
    expect(emitted().toggle).toHaveLength(1)

    await fireEvent.click(button)
    expect(emitted().toggle).toHaveLength(2)
  })

  it('should handle Enter and Space keys', async () => {
    const { emitted } = renderSelectButton()

    const button = screen.getByRole('selectButton')

    await fireEvent.keyDown(button, { code: 'Enter' })
    expect(emitted().toggle).toHaveLength(1)

    await fireEvent.keyDown(button, { code: 'Space' })
    expect(emitted().toggle).toHaveLength(2)
  })

  it('should not toggle on other keys', async () => {
    const { emitted } = renderSelectButton()

    const button = screen.getByRole('selectButton')
    await fireEvent.keyDown(button, { code: 'ArrowDown' })

    expect(emitted()).not.toHaveProperty('toggle')
  })
})
