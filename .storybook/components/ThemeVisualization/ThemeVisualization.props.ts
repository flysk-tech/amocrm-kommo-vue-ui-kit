import type { CrmUiKitCSSProperties } from '@storybook-utils/types/theme';

export interface ThemeVisualizationProps {
  /**
   * An object with CSS theme properties.
   */
  theme: CrmUiKitCSSProperties;
  /**
   * Component story
   */
  of?: any;
}
