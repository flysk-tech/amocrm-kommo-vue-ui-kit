import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/vue'
import { Link, LinkPrimaryTheme } from '..'

const hasClass = (el: Element | null, name: string) =>
  Array.from(el?.classList ?? []).some((c) => c.includes(name))

const renderLink = (props: any = {}, slots: any = {}, attrs: any = {}) => {
  return render(Link, {
    props: { theme: LinkPrimaryTheme, ...props },
    slots: { default: 'Go to Dashboard', ...slots },
    attrs,
  })
}

describe('Link', () => {
  it('renders as an anchor element', () => {
    renderLink({}, {}, { role: 'link' })
    expect(screen.getByRole('link')).toBeInTheDocument()
  })

  it('renders children via default slot', () => {
    renderLink()
    expect(screen.getByText('Go to Dashboard')).toBeInTheDocument()
  })

  it('applies external class via Vue class binding', () => {
    const { container } = renderLink({}, {}, { class: 'custom-class' })
    const a = container.querySelector('a')
    expect(a?.classList.contains('custom-class')).toBe(true)
  })

  it('passes href and target attributes', () => {
    const { container } = renderLink(
      {},
      {},
      { href: 'https://example.com', target: '_blank' },
    )
    const a = container.querySelector('a')
    expect(a?.getAttribute('href')).toBe('https://example.com')
    expect(a?.getAttribute('target')).toBe('_blank')
  })

  it('applies link base class', () => {
    const { container } = renderLink()
    const a = container.querySelector('a')
    expect(hasClass(a, 'link')).toBe(true)
  })

  describe('theme prop', () => {
    it('applies theme CSS variables as inline style', () => {
      const { container } = renderLink()
      const a = container.querySelector('a')
      expect(a).toHaveStyle({
        '--crm-ui-kit-link-color': 'var(--crm-ui-kit-palette-link-primary)',
        '--crm-ui-kit-link-text-decoration': 'underline',
      })
    })

    it('applies custom theme', () => {
      const customTheme = {
        '--crm-ui-kit-link-color': 'red',
        '--crm-ui-kit-link-hover-color': 'darkred',
        '--crm-ui-kit-link-text-decoration': 'none',
        '--crm-ui-kit-link-focus-visible-outline-color': 'blue',
        '--crm-ui-kit-link-focus-visible-outline-width': '2px',
        '--crm-ui-kit-link-focus-visible-outline-style': 'solid',
        '--crm-ui-kit-link-focus-visible-outline-offset': '2px',
        '--crm-ui-kit-link-focus-visible-border-radius': '4px',
      }
      const { container } = renderLink({ theme: customTheme })
      const a = container.querySelector('a')
      expect(a).toHaveStyle({
        '--crm-ui-kit-link-color': 'red',
        '--crm-ui-kit-link-text-decoration': 'none',
      })
    })
  })

  it('renders HTML slot content', () => {
    const { container } = renderLink({}, { default: '<span class="icon">→</span> Link' })
    expect(container.querySelector('.icon')).toBeInTheDocument()
  })

  it('forwards additional attributes via $attrs', () => {
    const { container } = renderLink({}, {}, { 'data-testid': 'my-link', id: 'link-1' })
    const a = container.querySelector('a')
    expect(a?.getAttribute('data-testid')).toBe('my-link')
    expect(a?.getAttribute('id')).toBe('link-1')
  })

  it('handles click events', async () => {
    let clicked = false
    const { container } = render(Link, {
      props: { theme: LinkPrimaryTheme },
      attrs: { onClick: () => { clicked = true } },
      slots: { default: 'Click me' },
    })
    const a = container.querySelector('a')!
    await fireEvent.click(a)
    expect(clicked).toBe(true)
  })
})
