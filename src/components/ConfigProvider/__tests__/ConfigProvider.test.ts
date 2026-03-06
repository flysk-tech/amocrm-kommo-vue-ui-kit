import { describe, it, expect, afterEach } from 'vitest'
import { render } from '@testing-library/vue'
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
})
