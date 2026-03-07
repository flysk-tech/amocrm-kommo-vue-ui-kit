type MultiSelectRootThemeKey =
  | '--crm-ui-kit-multiselect-z-index'
  | '--crm-ui-kit-multiselect-opened-z-index'

export type MultiSelectRootThemeType = {
  [K in MultiSelectRootThemeKey]: string
}

export const MultiSelectRootTheme: MultiSelectRootThemeType = {
  '--crm-ui-kit-multiselect-z-index': 'auto',
  '--crm-ui-kit-multiselect-opened-z-index': '60',
}
