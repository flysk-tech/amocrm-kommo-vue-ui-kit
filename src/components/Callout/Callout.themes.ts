import type { Component } from 'vue'
import WarningIcon from '@/icons/warning.svg'
import ErrorIcon from '@/icons/error.svg'
import SuccessIcon from '@/icons/success.svg'
import InfoIcon from '@/icons/info.svg'

type CalloutKey =
  | '--crm-ui-kit-callout-background-color'
  | '--crm-ui-kit-callout-padding'
  | '--crm-ui-kit-callout-border-radius'
  | '--crm-ui-kit-callout-icon-color'

export type CalloutThemeType = {
  Icon: Component
} & {
  [K in CalloutKey]: string
}

export const CalloutBaseValues: Omit<
  CalloutThemeType,
  'Icon' | '--crm-ui-kit-callout-background-color'
> = {
  '--crm-ui-kit-callout-padding': '12px',
  '--crm-ui-kit-callout-border-radius':
    'var(--crm-ui-kit-palette-focus-visible-border-radius)',
  '--crm-ui-kit-callout-icon-color': 'var(--crm-ui-kit-palette-text-primary)',
}

export const CalloutWarningTheme: CalloutThemeType = {
  ...CalloutBaseValues,
  Icon: WarningIcon,
  '--crm-ui-kit-callout-background-color':
    'var(--crm-ui-kit-palette-callout-warning-background-color)',
}

export const CalloutErrorTheme: CalloutThemeType = {
  ...CalloutBaseValues,
  Icon: ErrorIcon,
  '--crm-ui-kit-callout-background-color':
    'var(--crm-ui-kit-palette-callout-error-background-color)',
}

export const CalloutSuccessTheme: CalloutThemeType = {
  ...CalloutBaseValues,
  Icon: SuccessIcon,
  '--crm-ui-kit-callout-background-color':
    'var(--crm-ui-kit-palette-callout-success-background-color)',
}

export const CalloutInfoTheme: CalloutThemeType = {
  ...CalloutBaseValues,
  Icon: InfoIcon,
  '--crm-ui-kit-callout-background-color':
    'var(--crm-ui-kit-palette-callout-info-background-color)',
}
