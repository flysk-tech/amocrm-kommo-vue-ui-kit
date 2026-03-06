import type { LinkTheme } from './Link.themes'

export interface LinkProps {
  /**
   * Object with CSS properties of the theme
   */
  theme: LinkTheme
  /**
   * URL to navigate to
   */
  href?: string
  /**
   * Target attribute for the link
   */
  target?: string
  /**
   * Rel attribute for the link
   */
  rel?: string
}
