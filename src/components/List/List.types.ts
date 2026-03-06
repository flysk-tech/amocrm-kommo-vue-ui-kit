import type { ListThemeType } from './List.themes'

export interface ListProps {
  /**
   * Object with CSS theme properties.
   */
  theme: ListThemeType
  /**
   * Custom CSS class for component.
   */
  className?: string
  /**
   * Custom CSS class for a list item.
   */
  itemClassName?: string
  /**
   * Flag indicates whether the component is in the open state.
   */
  isOpened?: boolean
  /**
   * A callback that works on selecting a list item.
   */
  onSelect?: (index: number) => void
  /**
   * A callback that works on opening/closing a component.
   */
  onToggle?: (toggle: boolean) => void
  /**
   * A callback that works on changing the active element in the list.
   */
  onHoveredIndexChange?: (index: number) => void
  /**
   * Index of the hovered element.
   * @default 0
   */
  hoveredIndex?: number
  // Common HTML attributes
  id?: string
}
