import { describe, it, expect } from 'vitest'
import { Appearance, APPEARANCE_ATTRIBUTE_NAME, DEFAULT_APPEARANCE } from '@/lib/appearance'

describe('Appearance enum', () => {
  it('has DEFAULT and ALTERNATIVE values', () => {
    expect(Appearance.DEFAULT).toBe('default')
    expect(Appearance.ALTERNATIVE).toBe('alternative')
  })

  it('exports APPEARANCE_ATTRIBUTE_NAME', () => {
    expect(APPEARANCE_ATTRIBUTE_NAME).toBe('data-crm-ui-kit-theme')
  })

  it('exports DEFAULT_APPEARANCE', () => {
    expect(DEFAULT_APPEARANCE).toBe(Appearance.DEFAULT)
  })

  it('is not exported from types/theme', async () => {
    const themeExports = await import('@/types/theme')
    expect((themeExports as any).Appearance).toBeUndefined()
  })
})
