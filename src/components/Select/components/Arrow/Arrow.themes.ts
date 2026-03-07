type SelectArrowThemeKey =
  | '--crm-ui-kit-select-arrow-width'
  | '--crm-ui-kit-select-arrow-height'
  | '--crm-ui-kit-select-margin'

export type SelectArrowThemeType = {
  [K in SelectArrowThemeKey]: string
}

export const SelectArrowTheme: SelectArrowThemeType = {
  '--crm-ui-kit-select-arrow-width': '20px',
  '--crm-ui-kit-select-arrow-height': '20px',
  '--crm-ui-kit-select-margin': '0 0 0 auto',
}
