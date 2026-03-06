import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/vue'
import ContentBlock from '../ContentBlock.vue'
import { ContentBlockTheme } from '../ContentBlock.themes'

const renderContentBlock = (props: any = {}, attrs: any = {}) => {
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
})
