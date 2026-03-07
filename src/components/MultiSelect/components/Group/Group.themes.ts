type MultiSelectGroupThemeKey =
  | '--crm-ui-kit-multiselect-group-padding'
  | '--crm-ui-kit-multiselect-group-font-size'
  | '--crm-ui-kit-multiselect-group-font-weight'
  | '--crm-ui-kit-multiselect-group-color'
  | '--crm-ui-kit-multiselect-group-background-color'
  | '--crm-ui-kit-multiselect-group-text-transform'

export type MultiSelectGroupThemeType = {
  [K in MultiSelectGroupThemeKey]: string
}

export const MultiSelectGroupTheme: MultiSelectGroupThemeType = {
  '--crm-ui-kit-multiselect-group-padding': '8px 12px',
  '--crm-ui-kit-multiselect-group-font-size': '13px',
  '--crm-ui-kit-multiselect-group-font-weight': '700',
  '--crm-ui-kit-multiselect-group-color': '#363b44',
  '--crm-ui-kit-multiselect-group-background-color': 'var(--crm-ui-kit-palette-background-primary)',
  '--crm-ui-kit-multiselect-group-text-transform': 'uppercase',
}
