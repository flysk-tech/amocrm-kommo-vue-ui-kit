import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import Label from '../Label.vue'
import { LabelTheme } from '../Label.themes'

describe('Label', () => {
  it('applies external class via Vue class binding', () => {
    const { container } = render(Label, {
      props: { theme: LabelTheme },
      attrs: { class: 'custom-class' },
      slots: { default: '<input />' },
    })

    const label = container.querySelector('label')
    expect(label?.classList.contains('custom-class')).toBe(true)
  })

  it('renders with theme and slot content', () => {
    const { getByText } = render(Label, {
      props: { theme: LabelTheme, text: 'Field Label', description: 'Helper text' },
      slots: { default: '<input placeholder="test" />' },
    })

    expect(getByText('Field Label')).toBeInTheDocument()
    expect(getByText('Helper text')).toBeInTheDocument()
  })
})
