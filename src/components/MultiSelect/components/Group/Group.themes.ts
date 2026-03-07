type MultiSelectGroupThemeKey =
  | '--crm-ui-kit-multiselect-group-padding'
  | '--crm-ui-kit-multiselect-group-font-size'
  | '--crm-ui-kit-multiselect-group-font-weight'
  | '--crm-ui-kit-multiselect-group-color'
  | '--crm-ui-kit-multiselect-group-background-color'

export type MultiSelectGroupThemeType = {
  [K in MultiSelectGroupThemeKey]: string
}

export const MultiSelectGroupTheme: MultiSelectGroupThemeType = {
  '--crm-ui-kit-multiselect-group-padding': '6px 12px',
  '--crm-ui-kit-multiselect-group-font-size': '11px',
  '--crm-ui-kit-multiselect-group-font-weight': '700',
  '--crm-ui-kit-multiselect-group-color': 'var(--crm-ui-kit-palette-text-secondary)',
  '--crm-ui-kit-multiselect-group-background-color': 'var(--crm-ui-kit-palette-background-primary)',
}
