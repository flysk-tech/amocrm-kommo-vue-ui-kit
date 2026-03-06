import type { TextTheme } from './Text.themes'

export type TextSizes = 's' | 'm' | 'ms' | 'l' | 'xl'

export interface TextProps {
  /**
   * Text size.
   *
   * - `s - 11/15`
   * - `m - 13/20`
   * - `ms - 13/15`
   * - `l - 15/20`
   * - `xl - 18/24`
   */
  size: TextSizes
  /**
   * Trim text when it overflows the container.
   *
   * Note: The element must have a defined width for overflow to occur.
   */
  isEllipsis?: boolean
  /**
   * Number of lines after which the text should be truncated.
   */
  maxRows?: number
  /**
   * Object with CSS theme properties.
   * If not provided, uses default CSS variables.
   */
  theme?: TextTheme
  /**
   * Additional CSS class name.
   */
  className?: string
  /**
   * Additional CSS styles.
   */
  style?: Record<string, any>
}