import type { CalloutThemeType } from './Callout.themes'

export interface CalloutProps {
  /**
   * Object with CSS theme properties
   */
  theme: CalloutThemeType
  /**
   * Flag determining whether an icon should be present.
   * @default true
   */
  isIconAvailable?: boolean
}
