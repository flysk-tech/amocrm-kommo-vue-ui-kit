import { describe, it, expect } from 'vitest'

describe('CheckboxGroup barrel exports', () => {
  it('exports all subcomponents', async () => {
    const exports = await import('@/components/CheckboxGroup')

    expect(exports.CheckboxGroup).toBeDefined()
    expect(exports.ItemRoot).toBeDefined()
    expect(exports.Checkbox).toBeDefined()
    expect(exports.CheckboxSelectAll).toBeDefined()
    expect(exports.ItemRootSelectAll).toBeDefined()
  })
})
