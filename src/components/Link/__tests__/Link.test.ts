import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import Link from '../Link.vue'
import { LinkPrimaryTheme } from '../Link.themes'

describe('Link', () => {
  it('applies external class via Vue class binding', () => {
    const { container } = render(Link, {
      props: { theme: LinkPrimaryTheme },
      attrs: { class: 'custom-class', href: 'https://example.com' },
      slots: { default: 'Click me' },
    })

    const a = container.querySelector('a')
    expect(a?.classList.contains('custom-class')).toBe(true)
  })

  it('renders with theme and slot content', () => {
    const { getByText, container } = render(Link, {
      props: { theme: LinkPrimaryTheme, href: 'https://example.com' },
      slots: { default: 'Visit Site' },
    })

    expect(getByText('Visit Site')).toBeInTheDocument()
    const a = container.querySelector('a')
    expect(a?.getAttribute('href')).toBe('https://example.com')
  })
})
