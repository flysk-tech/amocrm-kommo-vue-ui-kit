import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/vue'
import Callout from '../Callout.vue'
import {
  CalloutErrorTheme,
  CalloutWarningTheme,
  CalloutSuccessTheme,
  CalloutInfoTheme,
} from '../Callout.themes'

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

  it('should show icon by default (isIconAvailable defaults to true)', () => {
    renderCallout()

    const element = screen.getByTestId('callout')
    // Icon + slot content = 2 children
    expect(element.children.length).toBeGreaterThanOrEqual(2)
  })

  it('should render with error theme', () => {
    renderCallout({ theme: CalloutErrorTheme })

    const element = screen.getByTestId('callout')
    const style = element.getAttribute('style')!
    expect(style).toContain('--crm-ui-kit-callout-background-color')
  })

  it('should render with warning theme', () => {
    renderCallout({ theme: CalloutWarningTheme })

    const element = screen.getByTestId('callout')
    const style = element.getAttribute('style')!
    expect(style).toContain('--crm-ui-kit-callout-background-color')
    expect(style).toContain('--crm-ui-kit-callout-padding')
  })

  it('should render with success theme', () => {
    renderCallout({ theme: CalloutSuccessTheme })

    const element = screen.getByTestId('callout')
    expect(element.getAttribute('style')).toContain('--crm-ui-kit-callout-border-radius')
  })

  it('should render with info theme', () => {
    renderCallout({ theme: CalloutInfoTheme })

    const element = screen.getByTestId('callout')
    expect(element.getAttribute('style')).toContain('--crm-ui-kit-callout-icon-color')
  })

  it('should not include Icon key in style attributes', () => {
    renderCallout({ theme: CalloutErrorTheme })

    const element = screen.getByTestId('callout')
    const style = element.getAttribute('style')!
    // The Icon property should be stripped from theme before applying as style
    expect(style).not.toContain('Icon')
  })

  it('should render slot content as-is', () => {
    render(Callout, {
      props: { theme: CalloutErrorTheme },
      slots: {
        default: '<span>Custom content</span>',
      },
      attrs: { 'data-testid': 'callout' },
    })

    expect(screen.getByText('Custom content')).toBeInTheDocument()
  })

  it('should apply padding from theme', () => {
    renderCallout()

    const element = screen.getByTestId('callout')
    const style = element.getAttribute('style')!
    expect(style).toContain('--crm-ui-kit-callout-padding: 12px')
  })

  it('should render wrapper with correct class', () => {
    renderCallout()

    const element = screen.getByTestId('callout')
    expect(element.className).toContain('wrapper')
  })

  it('should pass through additional attributes', () => {
    renderCallout({}, { id: 'my-callout', role: 'alert' })

    const element = screen.getByTestId('callout')
    expect(element.getAttribute('id')).toBe('my-callout')
    expect(element.getAttribute('role')).toBe('alert')
  })
})
