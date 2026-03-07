type MultiSelectSearchThemeKey =
  | '--crm-ui-kit-multiselect-search-padding'
  | '--crm-ui-kit-multiselect-search-input-padding'
  | '--crm-ui-kit-multiselect-search-font-size'
  | '--crm-ui-kit-multiselect-search-color'
  | '--crm-ui-kit-multiselect-search-background-color'
  | '--crm-ui-kit-multiselect-search-border-bottom'

export type MultiSelectSearchThemeType = {
  [K in MultiSelectSearchThemeKey]: string
}

export const MultiSelectSearchTheme: MultiSelectSearchThemeType = {
  '--crm-ui-kit-multiselect-search-padding': '4px 8px',
  '--crm-ui-kit-multiselect-search-input-padding': '6px 4px',
  '--crm-ui-kit-multiselect-search-font-size': 'var(--crm-ui-kit-base-font-size)',
  '--crm-ui-kit-multiselect-search-color': 'var(--crm-ui-kit-palette-text-primary)',
  '--crm-ui-kit-multiselect-search-background-color': 'var(--crm-ui-kit-palette-background-primary)',
  '--crm-ui-kit-multiselect-search-border-bottom': '1px solid var(--crm-ui-kit-palette-border-primary)',
}
