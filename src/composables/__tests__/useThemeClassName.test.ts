import { describe, it, expect, vi, beforeEach } from 'vitest'
import { defineComponent, h } from 'vue'
import { render, cleanup } from '@testing-library/vue'
import { SwitcherPrimaryTheme } from '@/components/Switcher'
import { useThemeClassName } from '../useThemeClassName'

let nanoidCounter = 0
vi.mock('nanoid', () => ({
  nanoid: vi.fn(() => `id${nanoidCounter++}`),
}))

const createThemeComponent = <T extends Record<string, string>>(theme: T) => {
  let result: string | undefined

  const Comp = defineComponent({
    setup() {
      const className = useThemeClassName(theme)
      result = className.value
      return () => h('div', { class: className.value })
    },
  })

  return { Comp, getResult: () => result! }
}

describe('useThemeClassName', () => {
  beforeEach(() => {
    nanoidCounter = 0
    cleanup()
    document.head.querySelectorAll('style').forEach((el) => el.remove())
  })

  it('returns correct class name', () => {
    const { Comp, getResult } = createThemeComponent(SwitcherPrimaryTheme)
    render(Comp)
    expect(getResult()).toBe('crm-ui-kit-theme-id0')
  })

  it('creates a style element with correct styles', () => {
    const { Comp } = createThemeComponent(SwitcherPrimaryTheme)
    render(Comp)

    const styleElement = document.head.querySelector('style')
    expect(styleElement).not.toBeNull()

    const styleContent = styleElement!.textContent || ''
    const styleRules = styleContent.match(/{([^}]+)}/)?.[1] || ''

    const styleProperties = styleRules
      .split(';')
      .map((prop) => prop.trim())
      .filter((prop) => prop !== '')

    expect(styleProperties.length).toBe(
      Object.keys(SwitcherPrimaryTheme).length
    )

    Object.entries(SwitcherPrimaryTheme).forEach(([key, value]) => {
      const expectedProperty = `${key}: ${value}`
      expect(styleProperties).toContainEqual(expectedProperty)
    })
  })

  it('reuses existing className for the same theme object', () => {
    // Render two components using the same theme — both must be alive simultaneously
    const { Comp: Comp1, getResult: getResult1 } = createThemeComponent(SwitcherPrimaryTheme)
    const { Comp: Comp2, getResult: getResult2 } = createThemeComponent(SwitcherPrimaryTheme)

    const Parent = defineComponent({
      setup() {
        return () => h('div', [h(Comp1), h(Comp2)])
      },
    })

    render(Parent)

    const styleElements = document.head.querySelectorAll('style')
    expect(styleElements.length).toEqual(1)
    expect(getResult1()).toEqual(getResult2())
  })

  it('creates a new className for a different theme object', () => {
    const anotherTheme = {
      '--crm-ui-kit-switcher-active-element': 'yellow',
      '--crm-ui-kit-switcher-background': 'black',
    } as const

    const { Comp: Comp1, getResult: getResult1 } = createThemeComponent(SwitcherPrimaryTheme)
    const { Comp: Comp2, getResult: getResult2 } = createThemeComponent(anotherTheme)

    const Parent = defineComponent({
      setup() {
        return () => h('div', [h(Comp1), h(Comp2)])
      },
    })

    render(Parent)

    const styleElements = document.head.querySelectorAll('style')
    expect(styleElements.length).toEqual(2)
    expect(getResult1()).not.toEqual(getResult2())
  })
})
