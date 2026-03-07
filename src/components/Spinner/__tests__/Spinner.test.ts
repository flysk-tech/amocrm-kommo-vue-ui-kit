import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import Spinner from '../Spinner.vue'
import { SpinnerTheme } from '../Spinner.themes'

const hasClass = (el: Element | null, name: string) =>
  Array.from(el?.classList ?? []).some((c) => c.includes(name))

const renderSpinner = (props: any = {}, attrs: any = {}) => {
  return render(Spinner, {
    props,
    attrs,
  })
}

describe('Spinner', () => {
  it('renders as a span element', () => {
    const { container } = renderSpinner()
    const span = container.querySelector('span')
    expect(span).toBeInTheDocument()
    expect(span?.tagName).toBe('SPAN')
  })

  it('applies spinner base class', () => {
    const { container } = renderSpinner()
    const span = container.querySelector('span')
    expect(hasClass(span, 'spinner')).toBe(true)
  })

  it('applies external class via Vue class binding', () => {
    const { container } = renderSpinner({}, { class: 'custom-class' })
    const span = container.querySelector('span')
    expect(span?.classList.contains('custom-class')).toBe(true)
  })

  describe('isCentered prop', () => {
    it('does not apply centered class by default', () => {
      const { container } = renderSpinner()
      const span = container.querySelector('span')
      expect(hasClass(span, 'centered')).toBe(false)
    })

    it('applies centered class when isCentered is true', () => {
      const { container } = renderSpinner({ isCentered: true })
      const span = container.querySelector('span')
      expect(hasClass(span, 'centered')).toBe(true)
    })

    it('does not apply centered class when isCentered is false', () => {
      const { container } = renderSpinner({ isCentered: false })
      const span = container.querySelector('span')
      expect(hasClass(span, 'centered')).toBe(false)
    })
  })

  describe('theme prop', () => {
    it('applies theme CSS variables as inline style', () => {
      const { container } = renderSpinner({ theme: SpinnerTheme })
      const span = container.querySelector('span')
      expect(span).toHaveStyle({
        '--crm-ui-kit-spinner-border-color': '#158fd2',
        '--crm-ui-kit-spinner-border-width': '2px',
        '--crm-ui-kit-spinner-circle-size': '16px',
        '--crm-ui-kit-spinner-border-style': 'solid',
      })
    })

    it('renders without theme (no inline style)', () => {
      const { container } = renderSpinner()
      const span = container.querySelector('span')
      expect(span?.getAttribute('style')).toBeFalsy()
    })

    it('applies custom theme values', () => {
      const customTheme = {
        '--crm-ui-kit-spinner-border-color': 'red',
        '--crm-ui-kit-spinner-circle-size': '32px',
      }
      const { container } = renderSpinner({ theme: customTheme })
      const span = container.querySelector('span')
      expect(span).toHaveStyle({
        '--crm-ui-kit-spinner-border-color': 'red',
        '--crm-ui-kit-spinner-circle-size': '32px',
      })
    })
  })

  it('forwards additional attributes via $attrs', () => {
    const { container } = renderSpinner({}, { 'data-testid': 'my-spinner', id: 'spinner-1' })
    const span = container.querySelector('span')
    expect(span?.getAttribute('data-testid')).toBe('my-spinner')
    expect(span?.getAttribute('id')).toBe('spinner-1')
  })

  it('does not render any slot content', () => {
    const { container } = renderSpinner()
    const span = container.querySelector('span')
    expect(span?.innerHTML).toBe('')
  })
})
