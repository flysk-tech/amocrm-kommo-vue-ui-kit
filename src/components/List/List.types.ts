import type { ListThemeType } from './List.themes'

export interface ListProps {
  /**
   * Object with CSS theme properties.
   */
  theme: ListThemeType
  /**
   * Flag indicates whether the component is in the open state.
   */
  isOpened?: boolean
  /**
   * Index of the hovered element.
   * @default 0
   */
  hoveredIndex?: number
}
