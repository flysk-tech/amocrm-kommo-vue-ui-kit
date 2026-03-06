export const isTouchableDevice = () => Boolean('ontouchstart' in window)

export const isValidRenderValue = (value: any) => {
  return (
    value !== null &&
    value !== undefined &&
    (typeof value === 'string' || typeof value === 'number')
  )
}
