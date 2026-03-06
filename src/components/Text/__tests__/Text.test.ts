import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import Text from '../Text.vue'
import { TextPrimaryTheme } from '../Text.themes'

describe('Text', () => {
  it('applies external class via Vue class binding', () => {
    const { container } = render(Text, {
      props: { size: 'm', theme: TextPrimaryTheme },
      attrs: { class: 'custom-class' },
      slots: { default: 'Hello' },
    })

    const span = container.querySelector('span')
    expect(span?.classList.contains('custom-class')).toBe(true)
  })

  it('renders slot content', () => {
    const { getByText } = render(Text, {
      props: { size: 'm', theme: TextPrimaryTheme },
      slots: { default: 'Hello World' },
    })

    expect(getByText('Hello World')).toBeInTheDocument()
  })
})
