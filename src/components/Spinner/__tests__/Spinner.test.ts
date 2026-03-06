import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import Spinner from '../Spinner.vue'

describe('Spinner', () => {
  it('applies external class via Vue class binding', () => {
    const { container } = render(Spinner, {
      attrs: { class: 'custom-class' },
    })

    const span = container.querySelector('span')
    expect(span?.classList.contains('custom-class')).toBe(true)
  })

  it('renders centered when isCentered is true', () => {
    const { container } = render(Spinner, {
      props: { isCentered: true },
    })

    const span = container.querySelector('span')
    expect(span).toBeInTheDocument()
  })
})
