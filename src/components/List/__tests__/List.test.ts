import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/vue'
import List from '../List.vue'
import { ListTheme } from '../List.themes'

const renderList = (props: any = {}) => {
  const onSelect = vi.fn()
  const onToggle = vi.fn()
  const onHoveredIndexChange = vi.fn()

  const result = render(List, {
    props: {
      theme: ListTheme,
      isOpened: true,
      'onSelect': onSelect,
      'onToggle': onToggle,
      'onHoveredIndexChange': onHoveredIndexChange,
      ...props,
    },
    slots: {
      default: '<li>Item 1</li><li>Item 2</li><li>Item 3</li>',
    },
  })

  return { ...result, onSelect, onToggle, onHoveredIndexChange }
}

describe('List', () => {
  it('should render as a list element', () => {
    renderList()

    expect(screen.getByRole('list')).toBeInTheDocument()
  })

  it('should render children correctly', () => {
    renderList()

    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
    expect(screen.getByText('Item 3')).toBeInTheDocument()
  })

  it('should not render when isOpened is false', () => {
    renderList({ isOpened: false })

    expect(screen.queryByRole('list')).not.toBeInTheDocument()
  })

  it('should handle keyboard navigation', () => {
    const { onSelect, onToggle } = renderList()

    const element = screen.getByRole('list')

    fireEvent.keyDown(element, { code: 'Enter' })
    expect(onSelect).toHaveBeenCalledTimes(1)

    fireEvent.keyDown(element, { code: 'Escape' })
    expect(onToggle).toHaveBeenCalledTimes(1)
  })

  it('should emit hoveredIndexChange on arrow keys', () => {
    const { onHoveredIndexChange } = renderList()

    const element = screen.getByRole('list')

    fireEvent.keyDown(element, { code: 'ArrowDown' })
    expect(onHoveredIndexChange).toHaveBeenCalledWith(1)
  })

  it('should apply external class via Vue class binding', () => {
    render(List, {
      props: {
        theme: ListTheme,
        isOpened: true,
      },
      attrs: {
        class: 'my-class',
      },
      slots: {
        default: '<li>Item</li>',
      },
    })

    const element = screen.getByRole('list')
    expect(element.className).toContain('my-class')
  })
})
