import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import Text from '../Text.vue'
import {
  TextPrimaryTheme,
  TextSecondaryLightTheme,
  TextSecondaryDarkTheme,
  TextErrorTheme,
} from '../Text.themes'

const hasClass = (el: Element | null, name: string) =>
  Array.from(el?.classList ?? []).some((c) => c.includes(name))

const renderText = (props: any = {}, slots: any = {}, attrs: any = {}) => {
  return render(Text, {
    props: { size: 'm', theme: TextPrimaryTheme, ...props },
    slots: { default: 'Hello World', ...slots },
    attrs,
  })
}

describe('Text', () => {
  it('renders slot content', () => {
    const { getByText } = renderText()
    expect(getByText('Hello World')).toBeInTheDocument()
  })

  it('applies external class via Vue class binding', () => {
    const { container } = renderText({}, {}, { class: 'custom-class' })
    const span = container.querySelector('span')
    expect(span?.classList.contains('custom-class')).toBe(true)
  })

  describe('size prop', () => {
    it.each(['s', 'm', 'ms', 'l', 'xl'] as const)('applies size class "%s"', (size) => {
      const { container } = renderText({ size })
      const span = container.querySelector('span')
      expect(hasClass(span, size)).toBe(true)
    })

    it('throws error for unknown size', () => {
      expect(() => {
        renderText({ size: 'unknown' })
      }).toThrow('Unknown size was presented')
    })
  })

  describe('isEllipsis prop', () => {
    it('does not apply ellipsis class by default', () => {
      const { container } = renderText()
      const span = container.querySelector('span')
      expect(hasClass(span, 'ellipsis')).toBe(false)
    })

    it('applies ellipsis class when isEllipsis is true', () => {
      const { container } = renderText({ isEllipsis: true })
      const span = container.querySelector('span')
      expect(hasClass(span, 'ellipsis')).toBe(true)
    })
  })

  describe('maxRows prop', () => {
    it('does not apply line_clamp class when maxRows is 1 (default)', () => {
      const { container } = renderText()
      const span = container.querySelector('span')
      expect(hasClass(span, 'line_clamp')).toBe(false)
    })

    it('applies line_clamp class when maxRows > 1', () => {
      const { container } = renderText({ maxRows: 3 })
      const span = container.querySelector('span')
      expect(hasClass(span, 'line_clamp')).toBe(true)
    })

    it('sets WebkitLineClamp style when maxRows > 1', () => {
      const { container } = renderText({ maxRows: 3 })
      const span = container.querySelector('span')
      expect(span?.style.webkitLineClamp).toBe('3')
    })

    it('does not set WebkitLineClamp style when maxRows is 1', () => {
      const { container } = renderText({ maxRows: 1 })
      const span = container.querySelector('span')
      expect(span?.style.webkitLineClamp).toBe('')
    })
  })

  describe('theme prop', () => {
    it('applies TextPrimaryTheme CSS variables', () => {
      const { container } = renderText({ theme: TextPrimaryTheme })
      const span = container.querySelector('span')
      expect(span?.getAttribute('style')).toContain('--crm-ui-kit-text-color')
    })

    it('applies TextSecondaryLightTheme', () => {
      const { container } = renderText({ theme: TextSecondaryLightTheme })
      const span = container.querySelector('span')
      expect(span).toHaveStyle({
        '--crm-ui-kit-text-color': 'var(--crm-ui-kit-palette-text-secondary-light)',
      })
    })

    it('applies TextSecondaryDarkTheme', () => {
      const { container } = renderText({ theme: TextSecondaryDarkTheme })
      const span = container.querySelector('span')
      expect(span).toHaveStyle({
        '--crm-ui-kit-text-color': 'var(--crm-ui-kit-palette-text-secondary-dark)',
      })
    })

    it('applies TextErrorTheme', () => {
      const { container } = renderText({ theme: TextErrorTheme })
      const span = container.querySelector('span')
      expect(span).toHaveStyle({
        '--crm-ui-kit-text-color': 'var(--crm-ui-kit-color-error)',
      })
    })
  })

  describe('style prop', () => {
    it('applies additional inline styles', () => {
      const { container } = renderText({ style: { color: 'red' } })
      const span = container.querySelector('span')
      expect(span?.style.color).toBe('red')
    })

    it('merges style with theme', () => {
      const { container } = renderText({
        theme: TextPrimaryTheme,
        style: { 'font-weight': 'bold' },
      })
      const span = container.querySelector('span')
      const styleAttr = span?.getAttribute('style') || ''
      expect(styleAttr).toContain('--crm-ui-kit-text-color')
      expect(styleAttr).toContain('font-weight')
    })
  })

  it('renders as a span element', () => {
    const { container } = renderText()
    const span = container.querySelector('span')
    expect(span).toBeInTheDocument()
    expect(span?.tagName).toBe('SPAN')
  })

  it('applies text base class', () => {
    const { container } = renderText()
    const span = container.querySelector('span')
    expect(hasClass(span, 'text')).toBe(true)
  })

  it('forwards additional attributes via $attrs', () => {
    const { container } = renderText({}, {}, { 'data-testid': 'my-text', id: 'text-1' })
    const span = container.querySelector('span')
    expect(span?.getAttribute('data-testid')).toBe('my-text')
    expect(span?.getAttribute('id')).toBe('text-1')
  })

  it('renders HTML slot content', () => {
    const { container } = renderText({}, { default: '<strong>Bold</strong>' })
    expect(container.querySelector('strong')).toBeInTheDocument()
  })
})
