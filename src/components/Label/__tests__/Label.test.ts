import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/vue'
import { Label, LabelGroup, LabelTheme, LabelGroupTheme } from '..'

const DEFAULT_TEXT = 'Test Label'
const DEFAULT_CHILD_TEXT = 'Test Child'

describe('Label', () => {
  it('renders label with text prop', () => {
    render(Label, {
      props: { theme: LabelTheme, text: DEFAULT_TEXT },
      slots: { default: DEFAULT_CHILD_TEXT },
    })

    expect(screen.getByText(DEFAULT_TEXT)).toBeInTheDocument()
  })

  it('renders children via default slot', () => {
    render(Label, {
      props: { theme: LabelTheme, text: DEFAULT_TEXT },
      slots: { default: DEFAULT_CHILD_TEXT },
    })

    expect(screen.getByText(DEFAULT_CHILD_TEXT)).toBeInTheDocument()
  })

  it('applies theme CSS variables', () => {
    const { container } = render(Label, {
      props: { theme: LabelTheme, text: DEFAULT_TEXT },
      slots: { default: DEFAULT_CHILD_TEXT },
    })

    const label = container.querySelector('label')
    expect(label).toHaveStyle({
      '--crm-ui-kit-label-spacing': '4px',
    })
  })

  it('applies external class via Vue class binding', () => {
    const { container } = render(Label, {
      props: { theme: LabelTheme, text: DEFAULT_TEXT },
      attrs: { class: 'custom-class' },
      slots: { default: DEFAULT_CHILD_TEXT },
    })

    const label = container.querySelector('label')
    expect(label?.classList.contains('custom-class')).toBe(true)
  })

  it('renders with description', () => {
    render(Label, {
      props: { theme: LabelTheme, text: DEFAULT_TEXT, description: 'Helper text' },
      slots: { default: DEFAULT_CHILD_TEXT },
    })

    expect(screen.getByText('Helper text')).toBeInTheDocument()
  })

  it('renders with textPlacement left', () => {
    const { container } = render(Label, {
      props: { theme: LabelTheme, text: DEFAULT_TEXT, textPlacement: 'left' },
      slots: { default: DEFAULT_CHILD_TEXT },
    })

    const label = container.querySelector('label')
    expect(label).toBeInTheDocument()
  })
})

describe('LabelGroup', () => {
  it('renders children in group', () => {
    render({
      components: { LabelGroup, Label },
      template: `
        <LabelGroup :theme="theme">
          <Label :theme="labelTheme" text="Label 1">Child 1</Label>
          <Label :theme="labelTheme" text="Label 2">Child 2</Label>
        </LabelGroup>
      `,
      setup() {
        return { theme: LabelGroupTheme, labelTheme: LabelTheme }
      },
    })

    expect(screen.getByText('Label 1')).toBeInTheDocument()
    expect(screen.getByText('Label 2')).toBeInTheDocument()
    expect(screen.getByText('Child 1')).toBeInTheDocument()
    expect(screen.getByText('Child 2')).toBeInTheDocument()
  })
})
