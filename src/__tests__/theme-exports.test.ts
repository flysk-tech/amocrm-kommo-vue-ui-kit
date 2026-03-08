import { describe, it, expect } from 'vitest'
import * as rootExports from '@/index'

/**
 * Auto-discovery test: scans all *.themes.ts files and verifies
 * every exported constant is re-exported from the root index.ts.
 * Catches missing barrel re-exports that tree-shaking would drop from the build.
 */

// Internal helpers that are intentionally NOT part of the public API.
// Add entries here only for non-Theme constants (e.g. BaseValues, helpers).
const INTERNAL_EXPORTS = new Set([
  'CheckboxBaseValues', // partial base object (Omit<>), not a complete theme
])

describe('Theme exports completeness', () => {
  it('all theme constants from *.themes.ts are re-exported from root', async () => {
    const themeModules = import.meta.glob<Record<string, unknown>>(
      '@/components/**/*.themes.ts',
      { eager: true },
    )

    const missing: string[] = []

    for (const [path, mod] of Object.entries(themeModules)) {
      for (const exportName of Object.keys(mod)) {
        if (INTERNAL_EXPORTS.has(exportName)) continue
        if (!(exportName in rootExports)) {
          missing.push(`${exportName} (from ${path.replace(/^.*src\//, 'src/')})`)
        }
      }
    }

    expect(missing, `Missing theme re-exports:\n${missing.join('\n')}`).toEqual([])
  })
})
