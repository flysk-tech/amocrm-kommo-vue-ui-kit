type MultiSelectItemThemeKey =
  | '--crm-ui-kit-multiselect-item-padding'
  | '--crm-ui-kit-multiselect-item-font-size'
  | '--crm-ui-kit-multiselect-item-font-weight'
  | '--crm-ui-kit-multiselect-item-selected-background-color'
  | '--crm-ui-kit-multiselect-item-hovered-background-color'
  | '--crm-ui-kit-multiselect-item-hover-background-color'
  | '--crm-ui-kit-multiselect-item-checkbox-gap'

export type MultiSelectItemThemeType = {
  [K in MultiSelectItemThemeKey]: string
}

export const MultiSelectItemTheme: MultiSelectItemThemeType = {
  '--crm-ui-kit-multiselect-item-padding': '7px 6px 7px 12px',
  '--crm-ui-kit-multiselect-item-font-size': 'var(--crm-ui-kit-base-font-size)',
  '--crm-ui-kit-multiselect-item-font-weight': '400',
  '--crm-ui-kit-multiselect-item-selected-background-color':
    'var(--crm-ui-kit-palette-background-default)',
  '--crm-ui-kit-multiselect-item-hovered-background-color':
    'var(--crm-ui-kit-palette-background-default)',
  '--crm-ui-kit-multiselect-item-hover-background-color':
    'var(--crm-ui-kit-palette-background-default)',
  '--crm-ui-kit-multiselect-item-checkbox-gap': '8px',
}
