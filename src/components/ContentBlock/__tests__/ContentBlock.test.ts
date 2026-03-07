import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/vue'
import ContentBlock from '../ContentBlock.vue'
import { ContentBlockTheme } from '../ContentBlock.themes'

const hasClass = (el: Element | null, name: string) =>
  Array.from(el?.classList ?? []).some((c) => c.includes(name))

const renderContentBlock = (props: any = {}, attrs: any = {}, slots: any = {}) => {
  return render(ContentBlock, {
    props: {
      theme: ContentBlockTheme,
      ...props,
    },
    attrs: {
      'data-testid': 'content-block',
      ...attrs,
    },
    slots: {
      default: '<p data-testid="children">Content</p>',
      ...slots,
    },
  })
}

describe('ContentBlock', () => {
  it('should render with children', () => {
    renderContentBlock()

    expect(screen.getByTestId('content-block')).toBeInTheDocument()
    expect(screen.getByTestId('children')).toBeInTheDocument()
  })

  it('should apply external class via Vue class binding', () => {
    renderContentBlock({}, { class: 'my-class' })

    const element = screen.getByTestId('content-block')
    expect(element.className).toContain('my-class')
  })

  it('should apply theme CSS variables', () => {
    renderContentBlock()

    const element = screen.getByTestId('content-block')
    expect(element.getAttribute('style')).toContain('--crm-ui-kit-content-block')
  })

  it('renders as a div element', () => {
    renderContentBlock()
    const element = screen.getByTestId('content-block')
    expect(element.tagName).toBe('DIV')
  })

  it('applies block base class', () => {
    renderContentBlock()
    const element = screen.getByTestId('content-block')
    expect(hasClass(element, 'block')).toBe(true)
  })

  it('applies all theme CSS variables correctly', () => {
    renderContentBlock()
    const element = screen.getByTestId('content-block')
    expect(element).toHaveStyle({
      '--crm-ui-kit-content-block-box-sizing': 'border-box',
      '--crm-ui-kit-content-block-padding': '18px 18px 29px',
      '--crm-ui-kit-content-block-border-radius': '3px',
    })
  })

  it('applies custom theme values', () => {
    const customTheme = {
      '--crm-ui-kit-content-block-box-shadow': 'none',
      '--crm-ui-kit-content-block-background': '#fff',
      '--crm-ui-kit-content-block-box-sizing': 'content-box',
      '--crm-ui-kit-content-block-padding': '10px',
      '--crm-ui-kit-content-block-border-radius': '8px',
    }
    renderContentBlock({ theme: customTheme })
    const element = screen.getByTestId('content-block')
    expect(element).toHaveStyle({
      '--crm-ui-kit-content-block-padding': '10px',
      '--crm-ui-kit-content-block-border-radius': '8px',
      '--crm-ui-kit-content-block-background': '#fff',
    })
  })

  it('forwards additional attributes via $attrs', () => {
    renderContentBlock({}, { id: 'block-1', role: 'region' })
    const element = screen.getByTestId('content-block')
    expect(element.getAttribute('id')).toBe('block-1')
    expect(element.getAttribute('role')).toBe('region')
  })

  it('renders slot text content', () => {
    renderContentBlock({}, {}, { default: 'Simple text content' })
    expect(screen.getByText('Simple text content')).toBeInTheDocument()
  })

  it('renders complex slot content', () => {
    renderContentBlock({}, {}, {
      default: '<div data-testid="nested"><span>Nested content</span></div>',
    })
    expect(screen.getByTestId('nested')).toBeInTheDocument()
    expect(screen.getByText('Nested content')).toBeInTheDocument()
  })
})
