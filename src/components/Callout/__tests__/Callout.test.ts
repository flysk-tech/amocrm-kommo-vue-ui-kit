import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/vue'
import Callout from '../Callout.vue'
import { CalloutErrorTheme } from '../Callout.themes'

const renderCallout = (props: any = {}, attrs: any = {}) => {
  return render(Callout, {
    props: {
      theme: CalloutErrorTheme,
      ...props,
    },
    attrs: {
      'data-testid': 'callout',
      ...attrs,
    },
    slots: {
      default: '<p data-testid="callout-children">Content</p>',
    },
  })
}

describe('Callout', () => {
  it('should render with children', () => {
    renderCallout()

    expect(screen.getByTestId('callout')).toBeInTheDocument()
    expect(screen.getByTestId('callout-children')).toBeInTheDocument()
  })

  it('should apply external class via Vue class binding', () => {
    renderCallout({}, { class: 'my-class' })

    const element = screen.getByTestId('callout')
    expect(element.className).toContain('my-class')
  })

  it('should apply theme CSS variables', () => {
    renderCallout()

    const element = screen.getByTestId('callout')
    expect(element.getAttribute('style')).toContain('--crm-ui-kit-callout')
  })

  it('should hide icon when isIconAvailable is false', () => {
    renderCallout({ isIconAvailable: false })

    const element = screen.getByTestId('callout')
    // Only the slot content should be inside, no icon
    expect(element.children).toHaveLength(1)
  })
})
