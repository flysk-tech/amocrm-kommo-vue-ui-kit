import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/vue'
import Spinner from '../Spinner.vue'
import { SpinnerPrimaryTheme } from '../Spinner.themes'

const dataTestId = 'spinner'

const renderSpinner = (props: any = {}) => {
  return render(Spinner, {
    props: {
      'data-testid': dataTestId,
      theme: SpinnerPrimaryTheme,
      ...props,
    },
  })
}

describe('Spinner', () => {
  it('should be defined', () => {
    expect(Spinner).toBeDefined()
  })

  it('should apply custom span properties', async () => {
    const className = 'my-class'

    renderSpinner({ className })

    const element = screen.getByTestId(dataTestId)

    expect(element.classList.contains(className)).toBe(true)
    /**
     * Should have at least:
     * 1. Module className
     * 2. Additional class `my-class`
     */
    expect(element.classList.length).toBeGreaterThanOrEqual(2)
  })
})
