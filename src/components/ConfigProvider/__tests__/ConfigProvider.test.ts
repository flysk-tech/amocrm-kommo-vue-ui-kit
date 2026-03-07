import { describe, it, expect, afterEach } from 'vitest'
import { render } from '@testing-library/vue'
import { defineComponent, ref } from 'vue'
import ConfigProvider from '../ConfigProvider.vue'
import { Appearance, APPEARANCE_ATTRIBUTE_NAME } from '@/lib/appearance'

afterEach(() => {
  document.documentElement.removeAttribute(APPEARANCE_ATTRIBUTE_NAME)
})

describe('ConfigProvider', () => {
  it('should set appearance attribute on document element', () => {
    render(ConfigProvider, {
      props: {
        appearance: Appearance.DEFAULT,
      },
      slots: {
        default: '<div>Test Child</div>',
      },
    })

    expect(
      document.documentElement.getAttribute(APPEARANCE_ATTRIBUTE_NAME)
    ).toBe(Appearance.DEFAULT)
  })

  it('should render children correctly', () => {
    const { getByText } = render(ConfigProvider, {
      props: {
        appearance: Appearance.DEFAULT,
      },
      slots: {
        default: '<div>Test Child</div>',
      },
    })

    expect(getByText('Test Child')).toBeInTheDocument()
  })

  it('should update appearance attribute when prop changes', async () => {
    const { rerender } = render(ConfigProvider, {
      props: {
        appearance: Appearance.DEFAULT,
      },
      slots: {
        default: '<div>Child</div>',
      },
    })

    expect(
      document.documentElement.getAttribute(APPEARANCE_ATTRIBUTE_NAME)
    ).toBe(Appearance.DEFAULT)

    await rerender({ appearance: Appearance.ALTERNATIVE })

    expect(
      document.documentElement.getAttribute(APPEARANCE_ATTRIBUTE_NAME)
    ).toBe(Appearance.ALTERNATIVE)
  })

  it('should set alternative appearance', () => {
    render(ConfigProvider, {
      props: {
        appearance: Appearance.ALTERNATIVE,
      },
      slots: {
        default: '<div>Dark Theme</div>',
      },
    })

    expect(
      document.documentElement.getAttribute(APPEARANCE_ATTRIBUTE_NAME)
    ).toBe(Appearance.ALTERNATIVE)
  })

  it('should render multiple children via slot', () => {
    const { getByText } = render(ConfigProvider, {
      props: {
        appearance: Appearance.DEFAULT,
      },
      slots: {
        default: '<div>Child 1</div><div>Child 2</div>',
      },
    })

    expect(getByText('Child 1')).toBeInTheDocument()
    expect(getByText('Child 2')).toBeInTheDocument()
  })

  it('should work with nested components', () => {
    const Child = defineComponent({
      template: '<span>Nested Child</span>',
    })

    const Wrapper = defineComponent({
      components: { ConfigProvider, Child },
      template: `
        <ConfigProvider :appearance="'default'">
          <Child />
        </ConfigProvider>
      `,
    })

    const { getByText } = render(Wrapper)
    expect(getByText('Nested Child')).toBeInTheDocument()
    expect(
      document.documentElement.getAttribute(APPEARANCE_ATTRIBUTE_NAME)
    ).toBe('default')
  })

  it('should handle rapid appearance changes', async () => {
    const { rerender } = render(ConfigProvider, {
      props: {
        appearance: Appearance.DEFAULT,
      },
      slots: {
        default: '<div>Content</div>',
      },
    })

    await rerender({ appearance: Appearance.ALTERNATIVE })
    await rerender({ appearance: Appearance.DEFAULT })
    await rerender({ appearance: Appearance.ALTERNATIVE })

    expect(
      document.documentElement.getAttribute(APPEARANCE_ATTRIBUTE_NAME)
    ).toBe(Appearance.ALTERNATIVE)
  })

  it('should use correct attribute name', () => {
    render(ConfigProvider, {
      props: {
        appearance: Appearance.DEFAULT,
      },
      slots: {
        default: '<div>Content</div>',
      },
    })

    expect(APPEARANCE_ATTRIBUTE_NAME).toBe('data-crm-ui-kit-theme')
    expect(document.documentElement.hasAttribute('data-crm-ui-kit-theme')).toBe(true)
  })
})
