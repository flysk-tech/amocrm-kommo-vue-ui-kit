import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/vue'
import List from '../List.vue'
import { ListTheme } from '../List.themes'

const renderList = (props: any = {}, slotContent?: string) => {
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
      default: slotContent ?? '<li>Item 1</li><li>Item 2</li><li>Item 3</li>',
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

  it('should emit select on Enter key', () => {
    const { onSelect } = renderList({ hoveredIndex: 2 })

    const element = screen.getByRole('list')
    fireEvent.keyDown(element, { code: 'Enter' })

    expect(onSelect).toHaveBeenCalledWith(2)
  })

  it('should emit select on Space key', () => {
    const { onSelect } = renderList({ hoveredIndex: 1 })

    const element = screen.getByRole('list')
    fireEvent.keyDown(element, { code: 'Space' })

    expect(onSelect).toHaveBeenCalledWith(1)
  })

  it('should emit toggle false on Escape key', () => {
    const { onToggle } = renderList()

    const element = screen.getByRole('list')
    fireEvent.keyDown(element, { code: 'Escape' })

    expect(onToggle).toHaveBeenCalledWith(false)
  })

  it('should not go below 0 on ArrowUp when hoveredIndex is 0', () => {
    const { onHoveredIndexChange } = renderList({ hoveredIndex: 0 })

    const element = screen.getByRole('list')
    fireEvent.keyDown(element, { code: 'ArrowUp' })

    expect(onHoveredIndexChange).not.toHaveBeenCalled()
  })

  it('should decrement hoveredIndex on ArrowUp', () => {
    const { onHoveredIndexChange } = renderList({ hoveredIndex: 2 })

    const element = screen.getByRole('list')
    fireEvent.keyDown(element, { code: 'ArrowUp' })

    expect(onHoveredIndexChange).toHaveBeenCalledWith(1)
  })

  it('should not go past last item on ArrowDown', () => {
    // 3 items (indices 0, 1, 2), hoveredIndex at 2
    const { onHoveredIndexChange } = renderList({ hoveredIndex: 2 })

    const element = screen.getByRole('list')
    fireEvent.keyDown(element, { code: 'ArrowDown' })

    // Should not emit because we are at the last item
    expect(onHoveredIndexChange).not.toHaveBeenCalled()
  })

  it('should have tabindex=0 for focus', () => {
    renderList()

    const element = screen.getByRole('list')
    expect(element.getAttribute('tabindex')).toBe('0')
  })

  it('should apply theme CSS variables as style', () => {
    renderList()

    const element = screen.getByRole('list')
    const style = element.getAttribute('style')!
    expect(style).toContain('--crm-ui-kit-list-top')
    expect(style).toContain('--crm-ui-kit-list-max-height')
    expect(style).toContain('--crm-ui-kit-list-background-color')
  })

  it('should apply opened class when isOpened is true', () => {
    renderList()

    const element = screen.getByRole('list')
    expect(element.className).toContain('opened')
  })

  it('should apply list class', () => {
    renderList()

    const element = screen.getByRole('list')
    expect(element.className).toContain('list')
  })

  it('should use default hoveredIndex of 0', () => {
    const { onSelect } = renderList()

    const element = screen.getByRole('list')
    fireEvent.keyDown(element, { code: 'Enter' })

    expect(onSelect).toHaveBeenCalledWith(0)
  })

  it('should ignore unrelated key presses', () => {
    const { onSelect, onToggle, onHoveredIndexChange } = renderList()

    const element = screen.getByRole('list')
    fireEvent.keyDown(element, { code: 'KeyA' })
    fireEvent.keyDown(element, { code: 'Tab' })

    expect(onSelect).not.toHaveBeenCalled()
    expect(onToggle).not.toHaveBeenCalled()
    expect(onHoveredIndexChange).not.toHaveBeenCalled()
  })

  it('should handle ArrowDown from middle index', () => {
    const { onHoveredIndexChange } = renderList({ hoveredIndex: 1 })

    const element = screen.getByRole('list')
    fireEvent.keyDown(element, { code: 'ArrowDown' })

    expect(onHoveredIndexChange).toHaveBeenCalledWith(2)
  })
})
