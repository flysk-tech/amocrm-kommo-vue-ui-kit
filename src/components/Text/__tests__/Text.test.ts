import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/vue'
import Text from '../Text.vue'
import { TextPrimaryTheme } from '../Text.themes'

const renderText = (props: any = {}, slots: any = {}) => {
  return render(Text, {
    props: {
      size: 'l',
      theme: TextPrimaryTheme,
      ...props,
    },
    slots,
  })
}

describe('Text', () => {
  it('should be defined', () => {
    expect(Text).toBeDefined()
  })

  it('should render text correctly', async () => {
    const text = 'Text'

    renderText({}, { default: text })

    const elements = screen.getAllByText(text)

    expect(elements).toHaveLength(1)
  })
})
