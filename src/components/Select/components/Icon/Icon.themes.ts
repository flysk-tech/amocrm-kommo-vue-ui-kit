type SelectIconThemeKey =
  | '--crm-ui-kit-select-icon-width'
  | '--crm-ui-kit-select-icon-height'
  | '--crm-ui-kit-select-icon-margin'

export type SelectIconThemeType = {
  [K in SelectIconThemeKey]: string
}

export const SelectIconTheme: SelectIconThemeType = {
  '--crm-ui-kit-select-icon-width': '20px',
  '--crm-ui-kit-select-icon-height': '20px',
  '--crm-ui-kit-select-icon-margin': '0 6px 0 0',
}
