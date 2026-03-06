import { describe, it, expect } from 'vitest'

describe('composables barrel exports', () => {
  it('exports all composables', async () => {
    const composables = await import('@/composables')

    expect(composables.useTheme).toBeDefined()
    expect(composables.useComponentTheme).toBeDefined()
    expect(composables.usePortal).toBeDefined()
    expect(composables.useFormValidation).toBeDefined()
    expect(composables.useThemeClassName).toBeDefined()
  })
})
