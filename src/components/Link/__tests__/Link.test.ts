import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/vue'
import { Link, LinkPrimaryTheme } from '..'

describe('Link', () => {
  it('renders as an anchor element', () => {
    render(Link, {
      props: { theme: LinkPrimaryTheme },
      attrs: { role: 'link' },
      slots: { default: 'Go to Dashboard' },
    })

    expect(screen.getByRole('link')).toBeInTheDocument()
  })

  it('renders children via default slot', () => {
    render(Link, {
      props: { theme: LinkPrimaryTheme },
      slots: { default: 'Go to Dashboard' },
    })

    expect(screen.getByText('Go to Dashboard')).toBeInTheDocument()
  })

  it('applies external class via Vue class binding', () => {
    const { container } = render(Link, {
      props: { theme: LinkPrimaryTheme },
      attrs: { class: 'custom-class' },
      slots: { default: 'Click me' },
    })

    const a = container.querySelector('a')
    expect(a?.classList.contains('custom-class')).toBe(true)
  })

  it('passes href and target attributes', () => {
    const { container } = render(Link, {
      props: { theme: LinkPrimaryTheme },
      attrs: { href: 'https://example.com', target: '_blank' },
      slots: { default: 'Visit Site' },
    })

    const a = container.querySelector('a')
    expect(a?.getAttribute('href')).toBe('https://example.com')
    expect(a?.getAttribute('target')).toBe('_blank')
  })
})
