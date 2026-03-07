type MultiSelectComboboxThemeKey =
  | '--crm-ui-kit-multiselect-combobox-width'
  | '--crm-ui-kit-multiselect-combobox-height'
  | '--crm-ui-kit-multiselect-combobox-padding'
  | '--crm-ui-kit-multiselect-combobox-font-size'
  | '--crm-ui-kit-multiselect-combobox-color'
  | '--crm-ui-kit-multiselect-combobox-placeholder-color'
  | '--crm-ui-kit-multiselect-combobox-background-color'
  | '--crm-ui-kit-multiselect-combobox-border'
  | '--crm-ui-kit-multiselect-combobox-border-radius'
  | '--crm-ui-kit-multiselect-combobox-hover-border-color'
  | '--crm-ui-kit-multiselect-combobox-focus-border-color'
  | '--crm-ui-kit-multiselect-combobox-error-border-color'

export type MultiSelectComboboxThemeType = {
  [K in MultiSelectComboboxThemeKey]: string
}

export const MultiSelectComboboxTheme: MultiSelectComboboxThemeType = {
  '--crm-ui-kit-multiselect-combobox-width': '100%',
  '--crm-ui-kit-multiselect-combobox-height': '36px',
  '--crm-ui-kit-multiselect-combobox-padding': '0 7px 0 9px',
  '--crm-ui-kit-multiselect-combobox-font-size': 'var(--crm-ui-kit-base-font-size)',
  '--crm-ui-kit-multiselect-combobox-color': 'var(--crm-ui-kit-palette-text-primary)',
  '--crm-ui-kit-multiselect-combobox-placeholder-color': 'var(--crm-ui-kit-palette-placeholder-primary)',
  '--crm-ui-kit-multiselect-combobox-background-color': 'var(--crm-ui-kit-palette-background-primary)',
  '--crm-ui-kit-multiselect-combobox-border': '1px solid var(--crm-ui-kit-palette-border-default)',
  '--crm-ui-kit-multiselect-combobox-border-radius': '3px',
  '--crm-ui-kit-multiselect-combobox-hover-border-color': 'var(--crm-ui-kit-palette-border-default)',
  '--crm-ui-kit-multiselect-combobox-focus-border-color': 'var(--crm-ui-kit-palette-border-active)',
  '--crm-ui-kit-multiselect-combobox-error-border-color': 'var(--crm-ui-kit-color-error)',
}

export const MultiSelectComboboxInlineTheme: MultiSelectComboboxThemeType = {
  '--crm-ui-kit-multiselect-combobox-width': '100%',
  '--crm-ui-kit-multiselect-combobox-height': '24px',
  '--crm-ui-kit-multiselect-combobox-padding': '0 2px',
  '--crm-ui-kit-multiselect-combobox-font-size': 'var(--crm-ui-kit-base-font-size)',
  '--crm-ui-kit-multiselect-combobox-color': 'var(--crm-ui-kit-palette-text-primary)',
  '--crm-ui-kit-multiselect-combobox-placeholder-color': 'var(--crm-ui-kit-palette-placeholder-primary)',
  '--crm-ui-kit-multiselect-combobox-background-color': 'transparent',
  '--crm-ui-kit-multiselect-combobox-border': '1px solid transparent',
  '--crm-ui-kit-multiselect-combobox-border-radius': '0',
  '--crm-ui-kit-multiselect-combobox-hover-border-color': 'transparent',
  '--crm-ui-kit-multiselect-combobox-focus-border-color': 'transparent',
  '--crm-ui-kit-multiselect-combobox-error-border-color': 'var(--crm-ui-kit-color-error)',
}
