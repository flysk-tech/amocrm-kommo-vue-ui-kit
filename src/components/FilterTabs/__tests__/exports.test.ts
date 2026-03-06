import { describe, it, expect } from 'vitest'

describe('FilterTabs barrel exports', () => {
  it('exports all subcomponents', async () => {
    const exports = await import('@/components/FilterTabs')

    expect(exports.FilterTabs).toBeDefined()
    expect(exports.ItemRoot).toBeDefined()
    expect(exports.Tab).toBeDefined()
  })
})
